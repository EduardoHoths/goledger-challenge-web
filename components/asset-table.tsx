"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Pencil, Trash2 } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

import {
  Album,
  Artist,
  AssetType,
  Playlist,
  searchAsset,
  Song,
} from "@/service/api";
import { useQuery } from "@tanstack/react-query";

async function getAssets(query: string = "", assetType: AssetType) {
  try {
    const response = await searchAsset({
      selector: {
        "@assetType": assetType,
        name: query
          ? {
              "$regex": `(?i).*${query}.*`
            }
          : undefined,
      },
    });
    const data = await response.data.result;

    return data as Artist[] | Album[] | Playlist[] | Song[];
  } catch (error) {
    console.log(error);
  }
}

interface AssetTableProps {
  translation: (name: string) => string;
  table?: "album" | "playlist";
  queryKey: string;
  assetType: AssetType;
}

const AssetTable = ({
  translation,
  table,
  queryKey,
  assetType,
}: AssetTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

  const { data } = useQuery({
    queryKey: [queryKey, debouncedSearchQuery],
    queryFn: () => getAssets(debouncedSearchQuery, assetType),
  });

  const { onOpen } = useModal();

  useEffect(() => {
    router.push(`?q=${debouncedSearchQuery}`);
  }, [debouncedSearchQuery, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder={translation("table.input-search")}
        value={searchQuery}
        onChange={handleSearchChange}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="capitalize">
              {translation("table.table-header.name")}
            </TableHead>
            {table === "album" && (
              <TableHead className="capitalize">
                {translation("table.table-header.year")}
              </TableHead>
            )}
            {table === "playlist" && (
              <TableHead className="capitalize">
                {translation("table.table-header.private")}
              </TableHead>
            )}
            <TableHead className="capitalize">
              {translation("table.table-header.actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((item) => (
              <TableRow key={item["@key"]}>
                <TableCell>{item.name}</TableCell>
                {"year" in item && <TableCell>{item.year}</TableCell>}
                {"private" in item && (
                  <TableCell>
                    {item.private
                      ? translation("table.private-true")
                      : translation("table.private-false")}
                  </TableCell>
                )}
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpen(`edit-${assetType}`, { asset: item })}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      onOpen(`delete-${assetType}`, { asset: item })
                    }
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

function useDebouncedValue(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default AssetTable;

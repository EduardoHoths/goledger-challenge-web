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

import { Artist, searchAsset } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

async function getArtists(query: string = "") {
  try {
    const response = await searchAsset({
      selector: { "@assetType": "artist", name: query ? query : undefined },
    });
    const data = await response.data.result;
    return data as Artist[];
  } catch (error) {
    console.log(error);
  }
}

const ArtistsTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

  const { data: artists } = useQuery({
    queryKey: ["artists", debouncedSearchQuery],
    queryFn: () => getArtists(debouncedSearchQuery),
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
        placeholder="Search artists..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artists &&
            artists.map((artist) => (
              <TableRow key={artist["@key"]}>
                <TableCell>{artist.name}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpen("editArtist", { asset: artist })}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpen("deleteArtist", { asset: artist })}
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

export default ArtistsTable;

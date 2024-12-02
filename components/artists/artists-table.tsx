"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";
import { Artist } from "@/service/api";
import { useModal } from "@/hooks/use-modal-store";

interface ArtistsTableProps {
  artists: Artist[];
}

const ArtistsTable = ({ artists }: ArtistsTableProps) => {
  const { onOpen } = useModal();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {artists.map((artist) => (
          <TableRow key={artist.name}>
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
  );
};

export default ArtistsTable;

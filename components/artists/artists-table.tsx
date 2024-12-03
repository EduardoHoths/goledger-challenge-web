"use client"

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

interface ArtistsTableProps {
  artists: Artist[];
}

const ArtistsTable = ({ artists }: ArtistsTableProps) => {
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
          <TableRow key={artist["@key"]}>
            <TableCell>{artist.name}</TableCell>

            <TableCell>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
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

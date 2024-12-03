"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([
    { id: 1, name: "Artist 1", genre: "Pop" },
    { id: 2, name: "Artist 2", genre: "Rock" },
    { id: 3, name: "Artist 3", genre: "Hip Hop" },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newArtist, setNewArtist] = useState({ name: "", genre: "" });

  const addArtist = () => {
    setArtists([...artists, { id: artists.length + 1, ...newArtist }]);
    setNewArtist({ name: "", genre: "" });
    setIsAddDialogOpen(false);
  };

  const removeArtist = (id: number) => {
    setArtists(artists.filter((artist) => artist.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Artists
        </h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Artist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Artist</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newArtist.name}
                  onChange={(e) =>
                    setNewArtist({ ...newArtist, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="genre" className="text-right">
                  Genre
                </Label>
                <Input
                  id="genre"
                  value={newArtist.genre}
                  onChange={(e) =>
                    setNewArtist({ ...newArtist, genre: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addArtist}>Add Artist</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artists.map((artist) => (
            <TableRow key={artist.id}>
              <TableCell>{artist.name}</TableCell>
              <TableCell>{artist.genre}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArtist(artist.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Album, Artist, searchAsset, Song } from "@/service/api";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { SongFormFields } from "./create-playlist-modal";

interface AddSongFormProps {
  songs: SongFormFields[];
  onAddSong: (song: SongFormFields) => void;
  onRemoveSong: (index: number) => void;
}

export const AddSongForm: React.FC<AddSongFormProps> = ({
  songs,
  onAddSong,
  onRemoveSong,
}) => {
  const [songName, setSongName] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");

  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);

  const translation = useTranslations("playlists");

  const [errors, setErrors] = useState({
    songName: "",
    album: "",
    artist: "",
  });

  const searchSongs = useCallback(async (search?: string) => {
    try {
      const response = await searchAsset({
        selector: {
          "@assetType": "song",
          name: search
            ? {
                $regex: `(?i).*${search}.*`,
              }
            : undefined,
        },
        limit: 5,
      });

      const data = response.data.result;

      setFilteredSongs(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const searchAlbums = useCallback(async (albumKey: string) => {
    try {
      const response = await searchAsset({
        selector: {
          "@assetType": "album",
          "@key": albumKey,
        },
        limit: 5,
      });

      const data = response.data.result;

      setFilteredAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const searchArtists = useCallback(async (artistKey: string) => {
    try {
      const response = await searchAsset({
        selector: {
          "@assetType": "artist",
          "@key": artistKey,
        },
        limit: 5,
      });

      const data = response.data.result;

      setFilteredArtists(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    searchSongs();
  }, [searchSongs]);

  const handleSelectSong = (song: Song) => {
    setSongName(song.name);
    searchAlbums(song.album["@key"]!);

    setArtist("");
    setAlbum("");
  };

  const handleSelectAlbum = (album: Album) => {
    setAlbum(album.name);
    searchArtists(album.artist["@key"]!);

    setArtist("");
  };

  const handleAddSong = () => {
    if (validateFields()) {
      onAddSong({
        song: {
          "@key": filteredSongs[0]["@key"]!,
          name: songName,
        },
        album: {
          "@key": filteredAlbums[0]["@key"]!,
          name: album,
        },
        artist: {
          "@key": filteredArtists[0]["@key"]!,
          name: artist,
        },
      });
      setSongName("");
      setAlbum("");
      setArtist("");
    }
  };

  const validateFields = () => {
    const newErrors = {
      songName: songName.trim()
        ? ""
        : translation("modals.create.song-name-error"),
      album: album.trim() ? "" : translation("modals.create.album-name-error"),
      artist: artist.trim()
        ? ""
        : translation("modals.create.artist-name-error"),
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg dark:text-white">Add Songs</h3>
      <div className="flex flex-col gap-2">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400",
                  !songName && "text-muted-foreground"
                )}
              >
                {songName || translation("modals.create.song-name-placeholder")}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 p-4 dark:bg-[#23262e] dark:border-[#2b2f3a] rounded-lg shadow-lg">
              <div className="space-y-4">
                <Input
                  placeholder={translation(
                    "modals.create.song-name-placeholder"
                  )}
                  value={songName}
                  onChange={(e) => {
                    searchSongs(e.target.value);
                    setSongName(e.target.value);
                  }}
                  className="w-full p-3 text-base dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400 rounded-md"
                />

                {filteredSongs.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-[#4a4f5e] dark:scrollbar-track-[#2b2f3a] overscroll-contain">
                    {filteredSongs.map((song) => (
                      <DropdownMenuItem
                        key={song["@key"]}
                        onClick={() => handleSelectSong(song)}
                        className="px-4 py-3 text-base cursor-pointer dark:bg-[#2b2f3a] dark:hover:bg-[#3f4451] rounded-md hover:bg-gray-100 transition"
                      >
                        {song.name}
                      </DropdownMenuItem>
                    ))}
                  </div>
                ) : (
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {translation("modals.create.song-name-not-found")}
                  </p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {errors.songName && (
            <p className="text-red-400 text-sm">{errors.songName}</p>
          )}
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                disabled={!songName}
                className={cn(
                  "w-full justify-between dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400",
                  !album && "text-muted-foreground"
                )}
              >
                {album || translation("modals.create.album-name-placeholder")}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 p-4 dark:bg-[#23262e] dark:border-[#2b2f3a] rounded-lg shadow-lg">
              <div className="space-y-4">
                <Input
                  placeholder={translation(
                    "modals.create.album-name-placeholder"
                  )}
                  className="w-full p-3 text-base dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400 rounded-md"
                />

                {filteredAlbums.length > 0 ? (
                  <ul className="max-h-60 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-[#4a4f5e] dark:scrollbar-track-[#2b2f3a] overscroll-contain">
                    {filteredAlbums.map((album) => (
                      <DropdownMenuItem
                        key={album["@key"]}
                        onClick={() => handleSelectAlbum(album)}
                        className="px-4 py-3 text-base cursor-pointer dark:bg-[#2b2f3a] dark:hover:bg-[#3f4451] rounded-md hover:bg-gray-100 transition"
                      >
                        {album.name}
                      </DropdownMenuItem>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {translation("modals.create.album-name-not-found")}
                  </p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {errors.album && (
            <p className="text-red-400 text-sm">{errors.album}</p>
          )}
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                disabled={!album}
                className={cn(
                  "w-full justify-between dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400",
                  !artist && "text-muted-foreground"
                )}
              >
                {artist || translation("modals.create.artist-name-placeholder")}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 p-4 dark:bg-[#23262e] dark:border-[#2b2f3a] rounded-lg shadow-lg">
              <div className="space-y-4">
                <Input
                  placeholder={translation(
                    "modals.create.artist-name-placeholder"
                  )}
                  className="w-full p-3 text-base dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400 rounded-md"
                />

                {filteredArtists.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-[#4a4f5e] dark:scrollbar-track-[#2b2f3a] overscroll-contain">
                    {filteredArtists.map((artist) => (
                      <DropdownMenuItem
                        key={artist["@key"]}
                        onClick={() => setArtist(artist.name)}
                        className="px-4 py-3 text-base cursor-pointer dark:bg-[#2b2f3a] dark:hover:bg-[#3f4451] rounded-md hover:bg-gray-100 transition"
                      >
                        {artist.name}
                      </DropdownMenuItem>
                    ))}
                  </div>
                ) : (
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {translation("modals.create.artist-name-not-found")}
                  </p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {errors.artist && (
            <p className="text-red-400 text-sm">{errors.artist}</p>
          )}
        </div>
      </div>

      <Button
        onClick={handleAddSong}
        className="dark:bg-[#4f46e5] dark:text-white dark:hover:bg-[#4338ca]"
        type="button"
      >
        {translation("modals.create.button-add-song")}
      </Button>

      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li
            key={index}
            className="flex items-center justify-between dark:text-gray-200"
          >
            <span>
              {song.song.name} - {song.album.name} ({song.artist.name})
            </span>
            <Button
              variant="ghost"
              onClick={() => onRemoveSong(index)}
              className="text-red-400"
            >
              <Trash className="h-5 w-5" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

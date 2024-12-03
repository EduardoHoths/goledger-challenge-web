import axios from "axios";

export const api = axios.create({
  baseURL: "http://ec2-54-91-215-149.compute-1.amazonaws.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: process.env.NEXT_PUBLIC_API_USER!,
    password: process.env.NEXT_PUBLIC_API_PASS!,
  },
});

export interface Artist {
  "@key"?: string;
  name: string;
  country: string;
}

export interface Album {
  "@key"?: string;
  name: string;
  year: number;
  artist: Artist;
}

export interface Song {
  "@key"?: string;
  name: string;
  album: Album;
}

export interface Playlist {
  "@key"?: string;
  name: string;
  songs: Song[];
  private: boolean;
}

export function createAsset(
  type: "artist" | "album" | "song" | "playlist",
  asset: Artist | Album | Song | Playlist
) {
  const payload = {
    asset: [
      {
        "@assetType": type,
        ...asset,
      },
    ],
  };

  return api.post("/invoke/createAsset", payload);
}

export function updateAsset(
  type: "artist" | "album" | "song" | "playlist",
  asset: Artist | Album | Song | Playlist
) {
  const payload = {
    update: {
      "@assetType": type,
      ...asset,
    },
  };
  return api.put("/invoke/updateAsset", payload);
}

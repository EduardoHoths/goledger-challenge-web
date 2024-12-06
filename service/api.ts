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
  country?: string;
}

export interface Album {
  "@key"?: string;
  name: string;
  year: number;
  artist: Partial<Artist>;
}

export interface Song {
  "@key"?: string;
  name: string;
  album: Partial<Album>;
}

export interface Playlist {
  "@key"?: string;
  name: string;
  songs: Partial<Song[]>;
  private: boolean;
}

export type AssetType = "artist" | "album" | "song" | "playlist";

interface AssetPayload {
  type: AssetType;
  asset: Artist | Album | Song | Playlist;
  query?: string;
}

interface SearchAssetProps {
  selector: {
    "@assetType": AssetType;
    name?: {
      $regex?: string;
    };
    "@key"?: string;
  };
  limit?: number;
}

export function searchAsset({ selector, limit }: SearchAssetProps) {
  const payload = {
    query: {
      selector: {
        ...selector,
      },
      limit,
    },
  };

  return api.post("/query/search", payload);
}

export function createAsset({ type, asset }: AssetPayload) {
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

export function updateAsset({ type, asset }: AssetPayload) {
  const payload = {
    update: {
      "@assetType": type,
      ...asset,
    },
  };
  return api.put("/invoke/updateAsset", payload);
}

export function deleteAsset({ type, asset }: AssetPayload) {
  const payload = {
    key: {
      "@assetType": type,
      ...asset,
    },
    cascade: true,
  };

  return api.put("/invoke/deleteAsset", payload);
}

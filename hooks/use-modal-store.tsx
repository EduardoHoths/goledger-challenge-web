import { Artist, Album, Song, Playlist } from "@/service/api";
import { create } from "zustand";

export type ModalType =
  | "create-artist"
  | "delete-artist"
  | "edit-artist"
  | "create-album"
  | "delete-album"
  | "edit-album"
  | "create-song"
  | "delete-song"
  | "edit-song"
  | "create-playlist"
  | "delete-playlist"
  | "edit-playlist";

interface ModalData {
  asset?: Artist | Album | Song | Playlist;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));

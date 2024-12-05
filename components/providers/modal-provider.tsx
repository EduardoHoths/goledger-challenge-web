"use client";

import { useEffect, useState } from "react";
import CreateArtistModal from "../modals/artist/create-artist-modal";
import DeleteArtistModal from "../modals/artist/delete-artist-modal";
import EditArtistModal from "../modals/artist/edit-artist-modal";
import CreateAlbumModal from "../modals/album/create-album-modal";
import DeleteAlbumModal from "../modals/album/delete-album-modal";
import EditAlbumModal from "../modals/album/edit-album-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateArtistModal />
      <DeleteArtistModal />
      <EditArtistModal />

      <CreateAlbumModal />
      <DeleteAlbumModal />
      <EditAlbumModal />
    </>
  );
};

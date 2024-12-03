"use client";

import { useEffect, useState } from "react";
import CreateArtistModal from "../modals/artist/create-artist-modal";
import DeleteArtistModal from "../modals/artist/delete-artist-modal";
import EditArtistModal from "../modals/artist/edit-artist-modal";

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
    </>
  );
};

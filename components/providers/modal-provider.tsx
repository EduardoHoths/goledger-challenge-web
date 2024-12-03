"use client";

import { useEffect, useState } from "react";
import CreateArtistModal from "../modals/create-artist-modal";
import DeleteArtistModal from "../modals/delete-artist-modal";

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
    </>
  );
};

"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const AddArtistButton = () => {
  const { onOpen } = useModal();
  const translation = useTranslations("artists");

  return (
    <Button onClick={() => onOpen("createArtist")}>
      {translation("add-artist-button")}
    </Button>
  );
};

export default AddArtistButton;

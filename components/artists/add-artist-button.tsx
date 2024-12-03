"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

const AddArtistButton = () => {
  const { onOpen } = useModal();

  return <Button onClick={() => onOpen("createArtist")}>Add artist</Button>;
};

export default AddArtistButton;

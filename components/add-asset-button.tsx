"use client";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "./ui/button";
import { AssetType } from "@/service/api";

interface AddAssetButtonProps {
  translation: string;
  assetType: AssetType;
}

const AddAssetButton = ({ translation, assetType }: AddAssetButtonProps) => {
  const { onOpen } = useModal();

  return <Button onClick={() => onOpen(`create-${assetType}`)}>{translation}</Button>;
};

export default AddAssetButton;

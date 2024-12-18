"use client"

import AddAssetButton from "@/components/add-asset-button";
import AssetTable from "@/components/asset-table";
import { useTranslations } from "next-intl";

export default function ArtistsPage() {
  const translation = useTranslations("artists");
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white capitalize">
          {translation("title")}
        </h1>

        <AddAssetButton translation={translation("add-button")} assetType="artist" />
      </div>
      <AssetTable
        assetType="artist"
        queryKey="artists"
        translation={translation}
      />
    </div>
  );
}

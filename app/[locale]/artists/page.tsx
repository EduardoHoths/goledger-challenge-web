import AddArtistButton from "@/components/artists/add-artist-button";
import ArtistsTable from "@/components/artists/artists-table";

export default function ArtistsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Artists
        </h1>

        <AddArtistButton />
      </div>
      <ArtistsTable />
    </div>
  );
}

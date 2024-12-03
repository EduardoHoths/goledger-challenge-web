import AddArtistButton from "@/components/artists/add-artist-button";
import ArtistsTable from "@/components/artists/artists-table";
import axios from "axios";

async function getArtists() {
  try {
    const response = await axios.post(
      "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search",
      {
        query: {
          selector: {
            "@assetType": "artist",
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: process.env.NEXT_PUBLIC_API_USER!,
          password: process.env.NEXT_PUBLIC_API_PASS!,
        },
      }
    );

    const data = await response.data.result;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Artists
        </h1>

        <AddArtistButton />
      </div>
      <ArtistsTable artists={artists} />
    </div>
  );
}

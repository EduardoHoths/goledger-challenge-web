"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Artist, deleteAsset } from "@/service/api";
import { handleApiError } from "@/service/handle-api-error";
import { AxiosError } from "axios";

const DeleteArtistModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModal();
  const { asset } = data as { asset: Artist };
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "deleteArtist";

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await deleteAsset({
        type: "artist",
        asset: {
          name: asset.name,
        },
      });

      if (response.status === 200) {
        toast({
          title: "Artist Deleted",
          description: `${asset?.name} has been permanently deleted.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = handleApiError(error);
        toast({
          title: message,
          variant: "destructive",
        });
      } else {
        console.error(error);

        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#1c1f26] dark:text-white dark:border-[#2b2f3a]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl dark:text-white">
            <Trash2 className="h-6 w-6 text-red-500" />
            Delete Artist
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-6">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
          <DialogDescription className="text-center">
            Are you sure you want to delete <br />
            <span className="font-semibold text-lg">{asset?.name}</span>?
            <span className="mt-4 text-sm text-gray-500 dark:text-gray-400 block">
              This action cannot be undone.
            </span>
          </DialogDescription>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            disabled={isLoading}
            onClick={onClose}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant="destructive"
            onClick={handleDelete}
            className={cn(
              "w-full sm:w-auto",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLoading ? "Deleting..." : "Delete Artist"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteArtistModal;

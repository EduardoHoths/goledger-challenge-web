"use client";

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
import { deleteAsset, Song } from "@/service/api";
import { handleApiError } from "@/service/handle-api-error";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const DeletePlaylistModal = () => {
  const translation = useTranslations("playlists");
  const errorTranslation = useTranslations("api-error");
  const { isOpen, onClose, type, data } = useModal();
  const { asset } = data as { asset: Song };
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "delete-playlist";

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteAsset,

    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast({
        title: translation("modals.delete.success"),
        variant: "destructive",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const message = handleApiError(error, errorTranslation);
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
    },
  });

  const isLoading = mutation.isPending;

  const handleDelete = async () => {
    mutation.mutate({
      type: "playlist",
      asset: {
        name: asset.name,
        "@key": asset["@key"],
      },
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#1c1f26] dark:text-white dark:border-[#2b2f3a]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl dark:text-white">
            <Trash2 className="h-6 w-6 text-red-500" />
            {translation("modals.delete.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-6">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
          <DialogDescription className="text-center">
            {translation("modals.delete.description")} <br />
            <span className="font-semibold text-lg">{asset?.name}</span>?
            <span className="mt-4 text-sm text-gray-500 dark:text-gray-400 block">
              {translation("modals.delete.warning")}
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
            {translation("modals.cancel")}
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
            {isLoading
              ? translation("modals.delete.submiting")
              : translation("modals.delete.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePlaylistModal;

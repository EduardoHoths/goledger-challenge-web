"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mic2 } from "lucide-react";
import { createAsset } from "@/service/api";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { handleApiError } from "@/service/handle-api-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddSongForm } from "./add-song-form";
import { Switch } from "@/components/ui/switch";

/* eslint-disable @typescript-eslint/no-explicit-any */
const formSchema = (translation: any) =>
  z.object({
    name: z.string().min(1, {
      message: translation("modals.create.name-error"),
    }),
    private: z.boolean(),
  });

export interface SongFormFields {
  song: {
    name: string;
    "@key": string;
  };
  album: {
    name: string;
    "@key": string;
  };
  artist: {
    name: string;
    "@key": string;
  };
}

const CreatePlaylistModal = () => {
  const [songs, setSongs] = useState<SongFormFields[]>([]);

  const translation = useTranslations("playlists");
  const errorTranslation = useTranslations("api-error");
  const { isOpen, onClose, type } = useModal();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "create-playlist";

  const schema = formSchema(translation);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      private: false,
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createAsset,

    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["playlist"] });
      toast({
        title: translation("modals.create.success"),
        variant: "success",
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

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const songsFormatted = songs.map((song) => ({
      name: song.song.name,
      album: {
        "@key": song.album["@key"],
        artist: {
          "@key": song.artist["@key"],
        },
      },
    }));

    mutation.mutate({
      type: "playlist",
      asset: {
        name: values.name,
        private: values.private,
        songs: songsFormatted,
      },
    });
  };

  const handleAddSong = (song: SongFormFields) => {
    setSongs((prev) => [...prev, song]);
  };

  const handleRemoveSong = (index: number) => {
    setSongs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#1c1f26] dark:text-white dark:border-[#2b2f3a]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl dark:text-white">
            <Mic2 className="h-6 w-6" />
            {translation("modals.create.title")}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">
                    {translation("modals.create.name")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={translation(
                        "modals.create.name-placeholder"
                      )}
                      {...field}
                      disabled={isLoading}
                      className="w-full dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="private"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="dark:text-gray-300">
                    {translation("modals.create.private")}
                  </FormLabel>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="!m-0"
                    />
                  </FormControl>

                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <AddSongForm
              onAddSong={handleAddSong}
              onRemoveSong={handleRemoveSong}
              songs={songs}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="dark:bg-[#2b2f3a] dark:text-white dark:border-[#3f4451] dark:hover:bg-[#3f4451]"
              >
                {translation("modals.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="dark:bg-[#4f46e5] dark:text-white dark:hover:bg-[#4338ca]"
              >
                {isLoading
                  ? translation("modals.create.submiting")
                  : translation("modals.create.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlaylistModal;

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
import { ChevronsUpDown, Mic2 } from "lucide-react";
import { Album, Artist, createAsset, searchAsset } from "@/service/api";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { handleApiError } from "@/service/handle-api-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
const formSchema = (translation: any) =>
  z.object({
    name: z.string().min(1, {
      message: translation("modals.create.name-error"),
    }),
    album: z.string().min(1, {
      message: translation("modals.create.album-name-error"),
    }),
    artist: z.string().min(1, {
      message: translation("modals.create.artist-name-error"),
    }),
  });

const CreateSongModal = () => {
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const translation = useTranslations("songs");
  const errorTranslation = useTranslations("api-error");
  const { isOpen, onClose, type } = useModal();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "create-song";

  const schema = formSchema(translation);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      album: "",
      artist: "",
    },
  });

  const albumValue = form.watch("album");

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createAsset,

    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["songs"] });
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

  const searchArtists = useCallback(async (search?: string) => {
    try {
      const response = await searchAsset({
        selector: {
          "@assetType": "artist",
          "@key": search,
        },
        limit: 5,
      });
      const data = await response.data.result;

      setFilteredArtists(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const searchAlbums = useCallback(
    async (search?: string) => {
      try {
        const response = await searchAsset({
          selector: {
            "@assetType": "album",
            name: search
              ? {
                  $regex: `(?i).*${search}.*`,
                }
              : undefined,
          },
          limit: 5,
        });
        const data: Album[] = await response.data.result;

        const artistKey = data.find(
          (album) => search && album.name.includes(search)
        )?.artist?.["@key"];

        setFilteredAlbums(data);

        searchArtists(artistKey);
      } catch (error) {
        console.log(error);
      }
    },
    [searchArtists]
  );

  const handleArtistSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;

    searchArtists(search);
  };

  const onSubmit = async (values: z.infer<typeof schema>) => {
    mutation.mutate({
      type: "song",
      asset: {
        name: values.name,
        album: {
          "@key": filteredAlbums[0]["@key"],
          artist: {
            "@key": filteredArtists[0]["@key"],
          },
        },
      },
    });
  };

  useEffect(() => {
    searchAlbums(albumValue);
  }, [albumValue, searchAlbums]);

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
              name="album"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">
                    {translation("modals.create.album-name")}
                  </FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            disabled={isLoading}
                            className={cn(
                              "w-full justify-between dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ||
                              translation(
                                "modals.create.album-name-placeholder"
                              )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-96 p-4 dark:bg-[#23262e] dark:border-[#2b2f3a] rounded-lg shadow-lg">
                        <div className="space-y-4">
                          <Input
                            placeholder={translation(
                              "modals.create.album-name-placeholder"
                            )}
                            value={albumValue}
                            onChange={(e) =>
                              form.setValue("album", e.target.value)
                            }
                            className="w-full p-3 text-base dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400 rounded-md"
                          />

                          {filteredAlbums.length > 0 ? (
                            <div className="max-h-60 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-[#4a4f5e] dark:scrollbar-track-[#2b2f3a] overscroll-contain">
                              {filteredAlbums.map((album) => (
                                <DropdownMenuItem
                                  key={album["@key"]}
                                  onClick={() =>
                                    form.setValue("album", album.name)
                                  }
                                  className="px-4 py-3 text-base cursor-pointer dark:bg-[#2b2f3a] dark:hover:bg-[#3f4451] rounded-md hover:bg-gray-100 transition"
                                >
                                  {album.name}
                                </DropdownMenuItem>
                              ))}
                            </div>
                          ) : (
                            <p className="text-base text-gray-600 dark:text-gray-400">
                              {translation(
                                "modals.create.album-name-not-found"
                              )}
                            </p>
                          )}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">
                    {translation("modals.create.artist-name")}
                  </FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            disabled={!albumValue || isLoading}
                            className={cn(
                              "w-full justify-between dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ||
                              translation(
                                "modals.create.artist-name-placeholder"
                              )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-96 p-4 dark:bg-[#23262e] dark:border-[#2b2f3a] rounded-lg shadow-lg">
                        <div className="space-y-4">
                          <Input
                            placeholder={translation(
                              "modals.create.artist-name-placeholder"
                            )}
                            onChange={handleArtistSearch}
                            className="w-full p-3 text-base dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400 rounded-md"
                          />

                          {filteredArtists.length > 0 ? (
                            <div className="max-h-60 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-[#4a4f5e] dark:scrollbar-track-[#2b2f3a] overscroll-contain">
                              {filteredArtists.map((artist) => (
                                <DropdownMenuItem
                                  key={artist["@key"]}
                                  onClick={() =>
                                    form.setValue("artist", artist.name)
                                  }
                                  className="px-4 py-3 text-base cursor-pointer dark:bg-[#2b2f3a] dark:hover:bg-[#3f4451] rounded-md hover:bg-gray-100 transition"
                                >
                                  {artist.name}
                                </DropdownMenuItem>
                              ))}
                            </div>
                          ) : (
                            <p className="text-base text-gray-600 dark:text-gray-400">
                              {translation(
                                "modals.create.artist-name-not-found"
                              )}
                            </p>
                          )}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
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

export default CreateSongModal;

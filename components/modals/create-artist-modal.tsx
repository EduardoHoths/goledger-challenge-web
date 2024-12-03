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

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
});

const CreateArtistModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "createArtist";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createAsset("artist", {
        name: values.name,
        country: values.country,
      });

      if (response.status === 200) {
        toast({
          title: "Artist created successfully",
          variant: "success",
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
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#1c1f26] dark:text-white dark:border-[#2b2f3a]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl dark:text-white">
            <Mic2 className="h-6 w-6" />
            Add New Artist
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter artist name"
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter artist's country"
                      {...field}
                      disabled={isLoading}
                      className="w-full dark:bg-[#2b2f3a] dark:border-[#3f4451] dark:text-white dark:placeholder-gray-400"
                    />
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
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="dark:bg-[#4f46e5] dark:text-white dark:hover:bg-[#4338ca]"
              >
                {isLoading ? "Adding..." : "Add Artist"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateArtistModal;

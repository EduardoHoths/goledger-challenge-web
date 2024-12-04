import * as z from "zod";

export const artistSchema = z.object({
  type: z.literal("artist"),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
});

export const contentSchema = z.discriminatedUnion("type", [artistSchema]);

export type ContentSchema = z.infer<typeof contentSchema>;

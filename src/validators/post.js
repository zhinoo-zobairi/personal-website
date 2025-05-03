import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  content: z.string().min(1, "Content is required").max(5000, "Content too long"),
  tags: z.string().optional(),
  image_url: z.string().url("Invalid URL").optional().or(z.literal("").transform(() => null)),
});
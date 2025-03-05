import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum(["软件", "电子书", "教程", "工具", "素材", "其他"]).optional(),
    tags: z.array(z.string()).optional(),
    downloadLink: z.string().optional(),
  }),
});

export const collections = { blog };
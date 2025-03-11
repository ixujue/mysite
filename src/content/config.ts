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
    categories: z.array(z.string()).optional(),
    downloadLink: z.string().optional(),
  }),
});

const digitalReading = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    format: z.enum(["电子书", "有声书", "文章", "论文"]).optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    downloadLink: z.string().optional(),
    readLink: z.string().optional(),
  }),
});

const education = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    subcategory: z.string().optional(),
    level: z.enum(["入门", "中级", "高级"]).optional(),
    duration: z.string().optional(),
    instructor: z.string().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    courseLink: z.string().optional(),
  }),
});

const creative = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    fileType: z.enum(["PSD", "AI", "SVG", "PNG", "JPG", "MP4", "其他"]).optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    downloadLink: z.string().optional(),
    previewLink: z.string().optional(),
  }),
});

const software = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    platform: z.enum(["Windows", "macOS", "Linux", "iOS", "Android", "Web", "跨平台"]).optional(),
    version: z.string().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    downloadLink: z.string().optional(),
    officialLink: z.string().optional(),
  }),
});

export const collections = { blog, digitalReading, education, creative, software };
import { defineCollection, z } from 'astro:content';

// 定义通用的内容模式
const baseSchema = {
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  downloadLink: z.string().optional(),
};

// 博客集合
const blog = defineCollection({
  schema: z.object({
    ...baseSchema,
    category: z.enum(["软件", "电子书", "教程", "工具", "素材", "其他"]).optional(),
    categories: z.array(z.string()).optional(),
    subcategory: z.string().optional(),
  }),
});

// 数字阅读集合
const digitalReading = defineCollection({
  schema: z.object({
    ...baseSchema,
    categories: z.array(z.string()).default(["digital-reading"]),
    subcategory: z.enum(["电子书", "有声读物", "知识付费", "杂志期刊", "学术论文", "科技前沿", "文学经典", "学术专著", "外语学习", "名著朗读"]).optional(),
  }),
});

// 教育赋能集合
const education = defineCollection({
  schema: z.object({
    ...baseSchema,
    categories: z.array(z.string()).default(["education"]),
    subcategory: z.enum(["编程开发", "设计创作", "职业技能", "考试认证", "语言学习", "名校公开课", "职业认证", "论文模板", "研究数据集", "学术工具"]).optional(),
  }),
});

// 创意素材集合
const creative = defineCollection({
  schema: z.object({
    ...baseSchema,
    categories: z.array(z.string()).default(["creative"]),
    subcategory: z.enum(["UI套件", "摄影图库", "矢量插画", "音效素材", "视频模板", "UI", "photo", "illustration", "audio", "video"]).optional(),
  }),
});

// 软件工具集合
const software = defineCollection({
  schema: z.object({
    ...baseSchema,
    categories: z.array(z.string()).default(["software"]),
    subcategory: z.enum(["开发工具", "设计软件", "办公应用", "系统工具", "多媒体", "dev-tools", "productivity", "alternatives", "android", "ios", "生产力工具"]).optional(),
  }),
});

export const collections = { blog, digitalReading, education, creative, software };
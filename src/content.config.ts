// 导入 glob 加载器（loader）
import { glob } from "astro/loaders";
// 从 `astro:content` 导入工具函数
import { defineCollection } from "astro:content";
// 导入 Zod
import { z } from "astro/zod";
// 为每个集合定义一个 `loader` 和 `schema`
const blog = defineCollection({
  // 这里的 loader 会递归查找该路径下所有的 md/mdx 文件
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog/" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    cover: z.string().default(''),
    categories: z.array(z.string()).nullable().optional().default([]),
    tags: z.array(z.string()).nullable().optional().default([]),
    draft: z.boolean().default(false),
    wp_id: z.number().nullable().optional().default(0),
  }),
});
// 导出一个单独的 `collections` 对象用以注册你的集合（们）
export const collections = { blog };
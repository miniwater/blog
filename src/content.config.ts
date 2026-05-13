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
  schema: ({ image }) => z.object({
    // int(): 期望这个值是一个整数。
    // number(): 期望这个值是一个数字。
    // nullable(): 允许 frontmatter 里显式写成 wp_id: null。
    // optional(): 允许 frontmatter 里完全不写 wp_id 这一行。
    // default(0): 如果该字段不存在（undefined），则默认值为 0（已经涵盖了optional功能）。
    // transform(val => val.toString()): 无论前端传入什么类型的值，都会被转换成字符串类型。
    // enum(["published", "draft", "archived"]): 期望这个值是 "published"、"draft" 或 "archived" 之一。
    title: z.string(),
    date: z.date(),
    updated: z.date(),
    cover: image().optional(),
    categories: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().default(false),
    wp_id: z.number().optional().default(0),
  }),
});

const docs = defineCollection({
  // 这里的 loader 会递归查找该路径下所有的 md/mdx 文件
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/docs/" }),
});
// 导出一个单独的 `collections` 对象用以注册你的集合（们）
export const collections = { blog, docs };
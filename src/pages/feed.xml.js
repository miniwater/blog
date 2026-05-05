import { config } from "@/config";
import rss from '@astrojs/rss';
import { getCollection } from "astro:content";


export async function GET(context) {
    const blog = await getCollection("blog");
    return rss({
        // 输出的 xml 中的`<title>`字段
        title: config.title,
        // 输出的 xml 中的`<description>`字段
        description: config.description,
        // 从端点上下文获取项目“site”
        // https://docs.astro.build/zh-cn/reference/api-reference/#site
        site: context.site,
        // 输出的 xml 中的`<item>`数组
        // 有关使用内容集合和 glob 导入的示例，请参阅“生成`items`”部分
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.published,
            description: post.data.description,
            // 从 `id` 属性计算出 RSS 链接
            // 这个例子假设所有的文章都被渲染为 `/blog/[id]` 路由
            link: `/${post.id}/`,
        })),
        // (可选) 注入自定义 xml
        customData: `<language>zh-CN</language>`,
    });
}
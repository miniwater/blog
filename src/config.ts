import logoImage from "@/assets/毛毛虫.avif";
import avatarImage from "@/assets/avatar.avif";

export const config = {
    url: import.meta.env.DEV
        ? new URL(import.meta.env.BASE_URL, "http://localhost:4321").href
        : new URL(import.meta.env.BASE_URL, import.meta.env.SITE).href,
    title: "手里有只毛毛虫",
    description: "号角声起 - 等你启航",
    logo: logoImage,

    author: "Miniwater",
    email: "admin@krjojo.com",
    avatar: avatarImage,
};

// 文章摘要
export function getSummary(body: string | undefined, length = 100) {
    const cleanBody = (body || "")
        // 1. 过滤图片: ![描述](链接)
        .replace(/!\[.*?\]\(.*?\)/g, "")
        // 2. 过滤常规链接，只保留文本内容: [文本](链接) -> 文本
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        // 3. 过滤标题、粗体、斜体、删除线、行内代码
        .replace(/[#*`~]/g, "")
        // 4. 过滤多余的换行符和空格，让摘要更紧凑
        .replace(/\s+/g, " ")
        .trim();
    return cleanBody.slice(0, length) + (cleanBody.length > length ? "..." : "");
}
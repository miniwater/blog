import logoImage from "@/assets/毛毛虫.avif";

export const config = {
    url: import.meta.env.DEV
        ? new URL(import.meta.env.BASE_URL, "http://localhost:4321").href
        : new URL(import.meta.env.BASE_URL, import.meta.env.SITE).href,
    title: "手里有只毛毛虫",
    description: "号角声起 - 等你启航",

    author: "Miniwater",
    email: "admin@krjojo.com",
    avatar: logoImage,
};
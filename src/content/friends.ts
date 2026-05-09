// src/data/friends.ts
export interface Friend {
    name: string;
    url: string;
    description: string;
    avatar: string;
}

export const friends: Friend[] = [
    {
        name: "Astro 官网",
        url: "https://astro.build",
        description: "全栈式 Web 框架",
        avatar: "https://astro.build/favicon.ico"
    },
    {
        name: "Shadcn UI",
        url: "https://ui.shadcn.com",
        description: "精美的组件库",
        avatar: "https://ui.shadcn.com/favicon.ico"
    },
];
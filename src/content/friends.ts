import obaby from '@/assets/friends/obaby.avif';

export interface Friend {
    name: string;
    url: string;
    description: string;
    avatar: string;
    rss?: string;
}

export const friends: Friend[] = [
    {
        name: "liangbm3's blog",
        url: "https://liangbm3.site/",
        description: "总有人间一两风，填我十万八千梦。",
        avatar: "https://liangbm3.site/avatar.png",
    },
    {
        name: "Obaby",
        url: "https://zhongxiaojie.com/",
        description: "黑客程序媛 / 逆向工程师 / 人工智能学徒 / 用爱发电的独立开发者",
        avatar: obaby.src,
        rss: "https://zhongxiaojie.com/feed/",
    },
];
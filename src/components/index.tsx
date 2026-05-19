import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount } from "./ui/avatar";
import { friends } from "@/content/friends";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { CircleQuestionMarkIcon } from "lucide-react"
import { config } from "@/config";
import { games } from "@/content/games";

const friendCount = Object.keys(friends).length;

export function CarouselDemo() {
    const list = [
        "https://www.krjojo.com/wp-content/uploads/2025/12/广州大道.avif",
        "https://www.krjojo.com/wp-content/themes/krjojo/assets/images/glide/chongqing.avif",
        "https://www.krjojo.com/wp-content/themes/krjojo/assets/images/glide/chengdu.avif",
        "https://www.krjojo.com/wp-content/themes/krjojo/assets/images/glide/changsha.avif",
        "https://www.krjojo.com/wp-content/themes/krjojo/assets/images/glide/tianhuan.avif"
    ];
    return (
        <Carousel>
            <div className="flex items-center justify-between w-full gap-2 mb-4">
                <div>
                    <h2 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">人生是场冒险</h2>
                    <p className="text-[1.05rem] text-muted-foreground sm:text-base sm:text-balance">请不要忘记旅途本身的意义</p>
                </div>

                {/* 按钮容器 */}
                <div className="flex items-center gap-2">
                    <CarouselPrevious
                        className="static translate-y-0"
                    />
                    <CarouselNext
                        className="static translate-y-0"
                    />
                </div>
            </div>
            <CarouselContent>
                {Array.from(list).map((src, index) => (
                    <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card className="pb-0">
                                <img
                                    src={src}
                                    className="rounded w-full aspect-square object-cover"
                                    alt="chongqing"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext className="" /> */}
        </Carousel>
    )
}


export function StatisticCard({ totalPosts, totalWords, latestUpdate, buildDate }: { totalPosts: number; totalWords: number; latestUpdate: string; buildDate: Date }) {
    // 1. 定义状态，默认为占位符
    const [timeAgo, setTimeAgo] = useState("计算中...");

    // 2. 在客户端挂载后计算时间差
    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const past = new Date(latestUpdate);
            const diffMs = now.getTime() - past.getTime();

            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const diffWeeks = Math.floor(diffDays / 7);
            const diffMonths = Math.floor(diffDays / 30);

            if (diffDays < 1) return "今天";
            if (diffDays < 7) return `${diffDays} 天前`;
            if (diffWeeks < 4) return `${diffWeeks} 周前`;
            if (diffMonths < 12) return `${diffMonths} 个月前`;
            return "很久以前";
        };

        setTimeAgo(calculateTime());
    }, [latestUpdate]);
    const data = [
        {
            title: "总文章数",
            desc: "仅包含博客文章",
            content: totalPosts
        },
        {
            title: "总字数",
            desc: "全站字数统计",
            content: totalWords
        },
        {
            title: "距离上次更新",
            desc: "",
            content: timeAgo
        },
        {
            title: "总访问量", desc: "", content: "敬请期待"
        }
    ];
    const color = [
        "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
        "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
        "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
        "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
        "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    ];
    return (
        <TooltipProvider>
            <div
                className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>
                            运行版本
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p>版本号：v{config.version}</p>
                        <p>构建时间：{buildDate.toLocaleString()}</p>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <a href={new URL("games", config.url).href} className="text-sm " >
                            更新日志
                        </a >
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            最近游戏
                            <Badge variant="secondary">{games.length}</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 justify-center gap-3 flex-wrap">
                        {games.slice(0, 6).map((game, index) => (
                            <Badge key={index} className={color[index]}>
                                {game.name}
                            </Badge>
                            // <span key={index}>{game.name}</span>
                        ))}
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <a href={new URL("games", config.url).href} className="text-sm" >
                            + {games.length} games
                        </a >
                    </CardFooter>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            友情链接
                            <Badge variant="secondary">{friendCount}</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <AvatarGroup className='justify-center'>
                            {friends.slice(0, 10).map((friend, index) => (
                                <Avatar key={index}>
                                    <AvatarImage src={friend.avatar.src} alt={friend.name} />
                                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            ))}
                            <AvatarGroupCount>+{friendCount - 10}</AvatarGroupCount>
                        </AvatarGroup>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <a href={new URL("links", config.url).href} className="text-sm" >
                            + {friendCount} friends
                        </a >
                    </CardFooter>
                </Card>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm">
                {data.map((item, index) => (
                    <Card className="w-full" key={index}>
                        <CardHeader>
                            <CardDescription className="flex items-center gap-1">
                                {item.title}
                                {item.desc && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <CircleQuestionMarkIcon className="h-4 w-4" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.desc}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </CardDescription>
                            <CardTitle>
                                {item.content}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </TooltipProvider>
    )
}
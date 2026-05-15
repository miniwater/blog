
import React, { useState, useEffect } from "react";
import { SidebarLeft } from "@/components/sidebar-left"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { TooltipProvider } from "./ui/tooltip"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { SearchIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import type { TreeNode } from "@/util/tree";
import { config } from "@/config";

export function Dashboard({ children, favoritePosts, title, docTree }:
    { children: React.ReactNode; favoritePosts: any[]; title?: string; docTree: TreeNode[]; }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        // 仅在客户端运行时检测
        setIsMac(navigator.userAgent.toUpperCase().indexOf('MAC') >= 0);
    }, []);
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []); // 仅挂载时执行

    // 1. 监听搜索输入
    useEffect(() => {
        const searchPage = async () => {
            if (query.trim() === "") {
                setResults([]);
                return;
            }

            try {
                const customWindow = window as any;

                if (customWindow.pagefind) {
                    // 执行搜索
                    const search = await customWindow.pagefind.search(query);
                    // ...
                    // 获取前 5 条结果的数据内容
                    const dataResults = await Promise.all(
                        search.results.slice(0, 5).map((r: any) => r.data())
                    );
                    setResults(dataResults);

                }


            } catch (e) {
                console.error("Pagefind search error:", e);
            }
        };

        const debounceTimer = setTimeout(searchPage, 200); // 防抖，避免频繁触发
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const menu = {
        featured: [
            { name: "最新文章", description: "查看我的最新文章", href: new URL("post", config.url).href },
            { name: "分类", description: "查看我的分类", href: new URL("category", config.url).href },
            { name: "标签云", description: "查看我的标签云", href: new URL("tag", config.url).href },
            { name: "游戏库", description: "什么都玩 什么都爱 什么都懂", href: new URL("games", config.url).href },
        ],
        about: [
            { name: "关于我", description: "我的足迹", href: new URL("about", config.url).href },
            { name: "隐私政策", description: "我的隐私政策", href: new URL("privacy", config.url).href },
            { name: "友情链接", description: "我的友情链接", href: new URL("links", config.url).href },
        ]
    }
    return (
        <TooltipProvider delayDuration={0}> {/* 包裹在最外层 */}
            <SidebarProvider>
                <SidebarLeft favoritePosts={favoritePosts} docTree={docTree} />
                <SidebarInset>
                    <header className="sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 bg-background z-10 border-b px-4">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger />
                            <Separator
                                orientation="vertical"
                                className="mr-2"
                            />
                            <NavigationMenu className="hidden lg:flex">
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>专区</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                                                {menu.featured.map((item) => (
                                                    <ListItem key={item.href} href={item.href} title={item.name}>
                                                        {item.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>关于</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="w-96">
                                                {menu.about.map((item) => (
                                                    <ListItem key={item.href} href={item.href} title={item.name}>
                                                        {item.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            Docs
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                        <div className="flex flex-1 max-w-md min-w-0 items-center justify-center gap-2">
                            <ButtonGroup className="hidden lg:flex">
                                <Button variant="ghost" size="icon" aria-label="Go Back">
                                    <ArrowLeftIcon />
                                </Button>
                                <Button variant="ghost" size="icon" aria-label="Go Forward">
                                    <ArrowRightIcon />
                                </Button>
                            </ButtonGroup>
                            <Button onClick={() => setOpen(true)} variant="outline" className="flex flex-1 min-w-0 items-center justify-between text-muted-foreground">
                                <SearchIcon className="shrink-0 mr-2" />
                                <span className="flex-1 text-left truncate mx-2">
                                    {title || "搜索文章"}
                                </span>
                                <KbdGroup className="hidden sm:flex shrink-0">
                                    <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
                                    <Kbd>K</Kbd>
                                </KbdGroup>
                            </Button>
                            <CommandDialog open={open} onOpenChange={setOpen}>
                                <Command shouldFilter={false}>
                                    <CommandInput placeholder="搜索文章" value={query} onValueChange={setQuery} />
                                    <CommandList>
                                        {query && results.length === 0 && <CommandEmpty>没有找到相关文章。</CommandEmpty>}
                                        {/* <CommandEmpty>没有找到结果。</CommandEmpty> */}
                                        {results.length > 0 && (
                                            <CommandGroup heading="文章结果">
                                                {results.map((result) => (
                                                    <CommandItem
                                                        key={result.url}
                                                        onSelect={() => window.location.href = result.url}
                                                        className="cursor-pointer"
                                                    >
                                                        <div className="flex flex-col gap-1">
                                                            <div className="font-medium">{result.meta.title}</div>
                                                            {/* 渲染搜索摘要，dangerouslySetInnerHTML 用于显示 Pagefind 的高亮标签 */}
                                                            <div
                                                                className="text-xs text-muted-foreground line-clamp-1"
                                                                dangerouslySetInnerHTML={{ __html: result.excerpt }}
                                                            />
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        )}
                                        {!query && (
                                            <CommandGroup heading="建议">
                                                <CommandItem>文章列表</CommandItem>
                                                <CommandItem>文档</CommandItem>
                                                <CommandItem>Calculator</CommandItem>
                                            </CommandGroup>
                                        )}
                                    </CommandList>
                                </Command>
                            </CommandDialog>
                        </div>
                        <div>
                            <div className="hidden lg:flex items-center justify-end gap-2">
                                <ButtonGroup>
                                    <Button variant="outline">Archive</Button>
                                    <Button variant="outline">Report</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </header>
                    {/* <div className="flex flex-1 flex-col"> */}
                    {children}
                    {/* </div> */}
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    )
}


function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <a href={href}>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{title}</div>
                        <div className="line-clamp-2 text-muted-foreground">{children}</div>
                    </div>
                </a>
            </NavigationMenuLink>
        </li>
    )
}
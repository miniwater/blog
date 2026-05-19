
import React, { useState, useEffect } from "react";
import { SidebarLeft } from "@/components/sidebar-left"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
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
import { SearchIcon, SettingsIcon } from "lucide-react"
import type { TreeNode } from "@/util/tree";
import { config } from "@/config";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"

export function Dashboard({ children }:
    { children: React.ReactNode; }) {
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    )
}

export function SidebarInset1({ favoritePosts, docTree, currentPath }: { favoritePosts: any[]; docTree: TreeNode[]; currentPath: string }) {
    return (
        <TooltipProvider delayDuration={0}>
            <SidebarLeft favoritePosts={favoritePosts} docTree={docTree} currentPath={currentPath} />
        </TooltipProvider>
    )
}

export function SidebarInset2({ children, title }: { children: React.ReactNode; title?: string }) {
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
    return (
        <SidebarInset>
            <header className="sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 bg-background z-10 border-b px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <Separator
                        orientation="vertical"
                        className="mr-2"
                    />
                    <Menubar className="hidden lg:flex border-0">
                        <MenubarMenu>
                            <MenubarTrigger>文件</MenubarTrigger>
                            <MenubarContent>
                                <MenubarGroup>
                                    <MenubarItem asChild>
                                        <a href={config.url} target="_blank" className="cursor-pointer">
                                            新建窗口
                                        </a>
                                    </MenubarItem>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarItem asChild>
                                        <a href={new URL("post", config.url).href} className="cursor-pointer">
                                            文章列表
                                        </a>
                                    </MenubarItem>
                                    <MenubarSub>
                                        <MenubarSubTrigger>分类</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarGroup>
                                                <MenubarItem asChild>
                                                    <a href={new URL("category", config.url).href} className="cursor-pointer">
                                                        文章分类
                                                    </a>
                                                </MenubarItem>
                                                <MenubarItem asChild>
                                                    <a href={new URL("tag", config.url).href} className="cursor-pointer">
                                                        文章标签
                                                    </a>
                                                </MenubarItem>
                                            </MenubarGroup>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarItem asChild>
                                        <a href={new URL("docs", config.url).href} className="cursor-pointer">
                                            文档列表
                                        </a>
                                    </MenubarItem>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarItem disabled>
                                        退出
                                    </MenubarItem>
                                </MenubarGroup>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>导航</MenubarTrigger>
                            <MenubarContent>
                                <MenubarGroup>
                                    <MenubarItem asChild>
                                        <a href={config.url} className="cursor-pointer">
                                            首页
                                        </a>
                                    </MenubarItem>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarItem asChild>
                                        <a href={new URL("links", config.url).href} className="cursor-pointer">
                                            友情链接
                                        </a>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <a href={new URL("games", config.url).href} className="cursor-pointer">
                                            游戏库
                                        </a>
                                    </MenubarItem>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarSub>
                                        <MenubarSubTrigger>Find</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarGroup>
                                                <MenubarItem>Search the web</MenubarItem>
                                            </MenubarGroup>
                                            <MenubarSeparator />
                                            <MenubarGroup>
                                                <MenubarItem>Find...</MenubarItem>
                                                <MenubarItem>Find Next</MenubarItem>
                                                <MenubarItem>Find Previous</MenubarItem>
                                            </MenubarGroup>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                </MenubarGroup>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>帮助</MenubarTrigger>
                            <MenubarContent className="w-44">
                                <MenubarGroup>
                                    <MenubarItem asChild>
                                        <a href={new URL("privacy", config.url).href} className="cursor-pointer">
                                            隐私政策
                                        </a>
                                    </MenubarItem>
                                    <MenubarItem disabled>
                                        报告问题 <MenubarShortcut>⌘R</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem asChild>
                                        <a href={new URL("contact", config.url).href} className="cursor-pointer">
                                            联系我
                                        </a>
                                    </MenubarItem>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarItem disabled>检查更新</MenubarItem>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarItem asChild>
                                        <a href={new URL("about", config.url).href} className="cursor-pointer">
                                            关于
                                        </a>
                                    </MenubarItem>
                                </MenubarGroup>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>设置</MenubarTrigger>
                            <MenubarContent>
                                <MenubarRadioGroup value="system">
                                    <MenubarRadioItem value="light">白天</MenubarRadioItem>
                                    <MenubarRadioItem value="dark">夜间</MenubarRadioItem>
                                    <MenubarRadioItem value="system">跟随系统</MenubarRadioItem>
                                </MenubarRadioGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarItem asChild>
                                        <a href={new URL("settings", config.url).href} className="cursor-pointer">
                                            首选项
                                        </a>
                                    </MenubarItem>
                                </MenubarGroup>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
                <div className="flex flex-1 max-w-md min-w-0 items-center justify-center gap-2">
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
                        <Button variant="ghost" size="icon" aria-label="Submit">
                            <SettingsIcon />
                        </Button>
                    </div>
                </div>
            </header>
            {children}
        </SidebarInset>
    )
}

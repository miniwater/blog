
import React, { useState, useEffect } from "react";
import { SidebarLeft } from "@/components/sidebar-left"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
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

export function Dashboard({ children, favoritePosts, title }: { children: React.ReactNode; favoritePosts: any[]; title?: string; }) {
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
        <TooltipProvider delayDuration={0}> {/* 包裹在最外层 */}
            <SidebarProvider>
                <SidebarLeft favoritePosts={favoritePosts} />
                <SidebarInset>
                    <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background z-10">
                        <div className="flex flex-1 items-center gap-2 px-3">
                            <SidebarTrigger />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            {/* <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="line-clamp-1">
                                            {title}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb> */}
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>足迹</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="w-96">
                                                <li>Re-usable components built with Tailwind CSS.</li>
                                                <li>How to install dependencies and structure your app.</li>
                                                <li>Styles for headings, paragraphs, lists...etc</li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hidden md:flex">
                                        <NavigationMenuTrigger>专区</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                                                <li>Re-usable components built with Tailwind CSS.</li>
                                                <li>How to install dependencies and structure your app.</li>
                                                <li>Styles for headings, paragraphs, lists...etc</li>
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
                        <div className="flex flex-1 items-center justify-center gap-2">
                            <Button variant="outline" size="icon" aria-label="Go Back">
                                <ArrowLeftIcon />
                            </Button>
                            <Button variant="outline" size="icon" aria-label="Go Forward">
                                <ArrowRightIcon />
                            </Button>
                            <Button onClick={() => setOpen(true)} variant="outline" className="w-full flex items-center justify-between px-3 text-muted-foreground">
                                <SearchIcon />
                                {title || "搜索文章"}
                                <KbdGroup>
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
                                        <CommandGroup heading="建议">
                                            <CommandItem>文章列表</CommandItem>
                                            <CommandItem>文档</CommandItem>
                                            <CommandItem>Calculator</CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </CommandDialog>
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-2 px-3">
                            <ButtonGroup>
                                <Button variant="outline">Archive</Button>
                                <Button variant="outline">Report</Button>
                            </ButtonGroup>
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

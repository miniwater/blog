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

export function Dashboard({ children, favoritePosts }: { children: React.ReactNode; favoritePosts: any[]; }) {
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
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="line-clamp-1">
                                            Project Management & Task Tracking
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
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
                        <pagefind-modal-trigger></pagefind-modal-trigger>
                        <pagefind-modal></pagefind-modal>
                    </header>
                    {/* <div className="flex flex-1 flex-col"> */}
                    {children}
                    {/* </div> */}
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    )
}

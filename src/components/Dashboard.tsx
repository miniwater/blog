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

export function Dashboard({ children, favoritePosts, url }: { children: React.ReactNode; favoritePosts: any[]; url: URL }) {
    return (
        <TooltipProvider delayDuration={0}> {/* 包裹在最外层 */}
            <SidebarProvider>
                <SidebarLeft favoritePosts={favoritePosts} url={url} />
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
                                        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="w-96">
                                                
                                                    Re-usable components built with Tailwind CSS.
                                                  How to install dependencies and structure your app.
                                            
                                                    Styles for headings, paragraphs, lists...etc
                                                
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hidden md:flex">
                                        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                
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
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        {/* <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" /> */}
                        {children}
                        {/* <div className="mx-auto w-full max-w-3xl rounded-xl" > */}

                        {/* </div> */}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    )
}

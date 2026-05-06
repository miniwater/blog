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
import { TooltipProvider } from "./ui/tooltip"

export function Dashboard({ children, favoritePosts, url }: { children: React.ReactNode; favoritePosts: any[]; url: URL }) {
    return (
        <TooltipProvider delayDuration={0}> {/* 包裹在最外层 */}
            <SidebarProvider>
                <SidebarLeft favoritePosts={favoritePosts} url={url} />
                <SidebarInset>
                    <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
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
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        {/* <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" /> */}
                        <div className="mx-auto w-full max-w-3xl rounded-xl" >
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    )
}

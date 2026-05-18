"use client"

import React, { useEffect } from "react";

import { config } from "@/config";
import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavWorkspaces } from "@/components/nav-workspaces"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { BookIcon, HomeIcon, Settings2Icon, MapIcon, RssIcon, MessageCircleQuestionIcon, UsersIcon } from "lucide-react"
import { NavUser } from "./nav-user"
import type { TreeNode } from "@/util/tree";
import { setMobileSidebarOpen } from "@/stores/sidebarStore";

// This is sample data.
const data = {
  user: {
    name: config.title,
    email: config.email,
    avatar: config.avatar.src,
  },
  navMain: [
    {
      title: "主页",
      url: config.url,
      icon: (
        <HomeIcon
        />
      ),
    },
    {
      title: "文档",
      url: new URL("docs/", config.url).href,
      icon: (
        <BookIcon
        />
      ),
    },
  ],
  navSecondary: [
    {
      title: "设置",
      url: new URL("settings/", config.url).href,
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "网站地图",
      url: new URL("sitemap-index.xml", config.url).href,
      icon: (
        <MapIcon
        />
      ),
    },
    {
      title: "RSS订阅",
      url: new URL("feed.xml", config.url).href,
      icon: (
        <RssIcon
        />
      ),
    },
    {
      title: "友情链接",
      url: new URL("links/", config.url).href,
      icon: (
        <UsersIcon
        />
      ),
    },
    {
      title: "关于我们",
      url: new URL("about/", config.url).href,
      icon: (
        <MessageCircleQuestionIcon
        />
      ),
    },
  ],
}

export function SidebarLeft({
  favoritePosts,
  docTree,
  currentPath,
  ...props
}: React.ComponentProps<typeof Sidebar> & { favoritePosts: any[]; docTree: TreeNode[]; currentPath: string }) {
  const { isMobile, openMobile } = useSidebar();

  // 监听浏览器路由变化（适用于 Astro View Transitions）
  useEffect(() => {
    // 定义一个关闭抽屉的函数
    const handleRouteChange = () => {
      if (isMobile) {
        setMobileSidebarOpen(false); // 核心：路由一变，立马关闭移动端抽屉
      }
    };

    // 监听 Astro 特有的视图过渡完成事件
    document.addEventListener("astro:after-swap", handleRouteChange);
    document.addEventListener("astro:page-load", handleRouteChange);

    return () => {
      document.removeEventListener("astro:after-swap", handleRouteChange);
      document.removeEventListener("astro:page-load", handleRouteChange);
    };
  }, [isMobile]);
  return (
    <Sidebar className="border-r-0"  {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={config.url}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <img src={config.logo.src} alt={config.title} />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">{config.title}</span>
                  {/* <span className="">{config.description}</span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="mx-0" />
        <NavMain items={data.navMain} currentPath={currentPath} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={favoritePosts} currentPath={currentPath} />
        <NavWorkspaces docTree={docTree} />
        <NavSecondary items={data.navSecondary} className="mt-auto" currentPath={currentPath} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

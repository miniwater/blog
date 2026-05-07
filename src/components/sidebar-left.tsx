"use client"

import * as React from "react"

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
} from "@/components/ui/sidebar"
import { SearchIcon, BookIcon, HomeIcon, Settings2Icon, MapIcon, RssIcon, MessageCircleQuestionIcon } from "lucide-react"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  user: {
    name: config.title,
    email: config.email,
    avatar: config.avatar.src,
  },
  navMain: [
    {
      title: "搜索",
      url: new URL("/search/", config.url).href,
      icon: (
        <SearchIcon
        />
      ),
    },
    {
      title: "Ask AI",
      url: "#",
      icon: (
        <BookIcon
        />
      ),
    },
    {
      title: "主页",
      url: config.url,
      icon: (
        <HomeIcon
        />
      ),
      isActive: false,
    },
  ],
  navSecondary: [
    {
      title: "设置",
      url: new URL("/settings/", config.url).href,
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "网站地图",
      url: new URL("/sitemap-index.xml", config.url).href,
      icon: (
        <MapIcon
        />
      ),
    },
    {
      title: "RSS订阅",
      url: new URL("/feed.xml", config.url).href,
      icon: (
        <RssIcon
        />
      ),
    },
    {
      title: "关于我们",
      url: new URL("/about/", config.url).href,
      icon: (
        <MessageCircleQuestionIcon
        />
      ),
    },
  ],
  favorites: [],
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
        {
          name: "Health & Wellness Tracker",
          url: "#",
          emoji: "🍏",
        },
        {
          name: "Personal Growth & Learning Goals",
          url: "#",
          emoji: "🌟",
        },
      ],
    },
    {
      name: "Professional Development",
      emoji: "💼",
      pages: [
        {
          name: "Career Objectives & Milestones",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Skill Acquisition & Training Log",
          url: "#",
          emoji: "🧠",
        },
        {
          name: "Networking Contacts & Events",
          url: "#",
          emoji: "🤝",
        },
      ],
    },
  ],
}

export function SidebarLeft({
  favoritePosts,
  url,
  ...props
}: React.ComponentProps<typeof Sidebar> & { favoritePosts: any[]; url: URL }) {
  const navMain = [
    {
      title: "搜索",
      url: new URL("/search/", config.url).href,
      icon: (
        <SearchIcon
        />
      ),
    },
    {
      title: "主页",
      url: config.url,
      icon: (
        <HomeIcon
        />
      ),
      isActive: config.url === url.href,
    },
    {
      title: "文档",
      url: new URL("/docs/", config.url).href,
      icon: (
        <BookIcon
        />
      ),
    },
  ];
  return (
    <Sidebar className="border-r-0" {...props}>
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
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={favoritePosts} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

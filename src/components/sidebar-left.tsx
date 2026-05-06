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
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { TerminalIcon, AudioLinesIcon, SearchIcon, SparklesIcon, HomeIcon, InboxIcon, CalendarIcon, Settings2Icon, MapIcon, RssIcon, MessageCircleQuestionIcon } from "lucide-react"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  user: {
    name: config.title,
    email: config.email,
    avatar: config.avatar.src,
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "搜索",
      url: "#",
      icon: (
        <SearchIcon
        />
      ),
    },
    {
      title: "Ask AI",
      url: "#",
      icon: (
        <SparklesIcon
        />
      ),
    },
    {
      title: "主页",
      url: import.meta.env.BASE_URL,
      icon: (
        <HomeIcon
        />
      ),
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: (
        <InboxIcon
        />
      ),
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "日历",
      url: "#",
      icon: (
        <CalendarIcon
        />
      ),
    },
    {
      title: "设置",
      url: `${import.meta.env.BASE_URL}settings/`,
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "网站地图",
      url: `${import.meta.env.BASE_URL}sitemap-index.xml`,
      icon: (
        <MapIcon
        />
      ),
    },
    {
      title: "RSS订阅",
      url: `${import.meta.env.BASE_URL}feed.xml`,
      icon: (
        <RssIcon
        />
      ),
    },
    {
      title: "帮助",
      url: "#",
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
    {
      name: "Creative Projects",
      emoji: "🎨",
      pages: [
        {
          name: "Writing Ideas & Story Outlines",
          url: "#",
          emoji: "✍️",
        },
        {
          name: "Art & Design Portfolio",
          url: "#",
          emoji: "🖼️",
        },
        {
          name: "Music Composition & Practice Log",
          url: "#",
          emoji: "🎵",
        },
      ],
    },
    {
      name: "Home Management",
      emoji: "🏡",
      pages: [
        {
          name: "Household Budget & Expense Tracking",
          url: "#",
          emoji: "💰",
        },
        {
          name: "Home Maintenance Schedule & Tasks",
          url: "#",
          emoji: "🔧",
        },
        {
          name: "Family Calendar & Event Planning",
          url: "#",
          emoji: "📅",
        },
      ],
    },
    {
      name: "Travel & Adventure",
      emoji: "🧳",
      pages: [
        {
          name: "Trip Planning & Itineraries",
          url: "#",
          emoji: "🗺️",
        },
        {
          name: "Travel Bucket List & Inspiration",
          url: "#",
          emoji: "🌎",
        },
        {
          name: "Travel Journal & Photo Gallery",
          url: "#",
          emoji: "📸",
        },
      ],
    },
  ],
}

export function SidebarLeft({
  favoritePosts,
  ...props
}: React.ComponentProps<typeof Sidebar> & { favoritePosts: any[] }) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={config.url}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">{config.title}</span>
                  <span className="">{config.description}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarHeader className="h-16 border-b border-sidebar-border">
          <NavUser user={data.user} />
        </SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={favoritePosts} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

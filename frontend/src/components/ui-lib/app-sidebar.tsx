"use client"

import * as React from "react"
import {
  Frame,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/ui-lib/nav-main"
import { NavProjects } from "@/components/ui-lib/nav-projects"
import { NavUser } from "@/components/ui-lib/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui-lib/sidebar"
import { Button } from "./button"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" { ...props }>
      <SidebarHeader>
        <NavUser user={ data.user } />
      </SidebarHeader>
      <SidebarContent>
        <Button className="mx-4 mt-2">Create Expiring Content</Button>
        <NavMain items={ data.navMain } />
        <NavProjects projects={ data.projects } />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

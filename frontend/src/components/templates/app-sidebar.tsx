"use client"

import * as React from "react"
import {
  Copy,
  Frame,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/templates/nav-main"
import { NavProjects } from "@/components/templates/nav-projects"
import { NavUser } from "@/components/templates/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui-lib/sidebar"
import { Button } from "../ui-lib/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui-lib/dialog"
import { DialogClose, DialogFooter, DialogHeader } from "../ui-lib/dialog"
import { Label } from "../ui-lib/label"
import { Input } from "../ui-lib/input"

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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mx-4 mt-2">Create Expiring Content</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
            Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
              Link
                </Label>
                <Input
                  id="link"
                  defaultValue="https://ui.shadcn.com/docs/installation"
                  readOnly
                />
              </div>
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
              Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <NavMain items={ data.navMain } />
        <NavProjects projects={ data.projects } />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

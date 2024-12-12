"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
// This is sample data.
const data = {
  navMain: [
    {
      title: "Módulos",
      url: "#",
      items: [
        {
          title: "Inicio",
          url: "/panel-de-control",
        },
      ],
    },
    {
      title: "Gestión de órdenes",
      url: "#",
      items: [
        {
          title: "Órdenes",
          url: "/panel-de-control/ordenes",
        },
        {
          title: "Crear Orden",
          url: "/panel-de-control/ordenes/nueva-orden",
        },
      ],
    },
    {
      title: "Módulo de administrador",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/panel-de-control/ordenes",
        },
        {
          title: "Usuarios",
          url: "/panel-de-control/usuarios",
        },
      ],
    },
  ],
}
export default function AppSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        Villa 29
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={
                      pathname === item.url
                    }>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
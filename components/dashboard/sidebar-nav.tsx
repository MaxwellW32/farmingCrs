"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Sprout,
  Cloud,
  BarChart3,
  Settings,
  MapPin,
  Droplets,
  Bug,
  Calendar,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Crops", href: "/dashboard/crops", icon: Sprout },
  { name: "Fields", href: "/dashboard/fields", icon: MapPin },
  { name: "Weather", href: "/dashboard/weather", icon: Cloud },
  { name: "Irrigation", href: "/dashboard/irrigation", icon: Droplets },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Soil", href: "/dashboard/soil", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-sidebar-border bg-sidebar md:block">
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

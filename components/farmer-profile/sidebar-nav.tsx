"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "overview", label: "Overview", href: "/profile" },
  { id: "branches", label: "Branches", href: "/profile/branches" },
  { id: "analytics", label: "Analytics", href: "/profile/analytics" },
  { id: "settings", label: "Settings", href: "/profile/settings" },
]

export function SidebarNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    console.log(`$pathname`, pathname);

    return pathname === href
  }

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors",
            isActive(item.href)
              ? "bg-primary/10 text-primary border-l-2 border-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              isActive(item.href) ? "bg-primary" : "bg-muted-foreground/50"
            )}
          />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

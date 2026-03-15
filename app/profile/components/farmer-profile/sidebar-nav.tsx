"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "branches", label: "Branches" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
]

export function SidebarNav() {
  const [activeItem, setActiveItem] = useState("overview")

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveItem(item.id)}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors",
            activeItem === item.id
              ? "bg-primary/10 text-primary border-l-2 border-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              activeItem === item.id ? "bg-primary" : "bg-muted-foreground/50"
            )}
          />
          {item.label}
        </button>
      ))}
    </nav>
  )
}

"use client"

import { Sprout, TreeDeciduous, Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsData {
  totalBranches: number
  totalAcres: number
  employees: number
  yearlyYield: string
}

export function StatsCards({ stats }: { stats: StatsData }) {
  const statItems = [
    {
      label: "Farm Branches",
      value: stats.totalBranches,
      icon: TreeDeciduous,
      description: "Active farm locations",
    },
    {
      label: "Total Acres",
      value: stats.totalAcres.toLocaleString(),
      icon: Sprout,
      description: "Cultivated land area",
    },
    {
      label: "Employees",
      value: stats.employees,
      icon: Users,
      description: "Team members",
    },
    {
      label: "Yearly Yield",
      value: stats.yearlyYield,
      icon: TrendingUp,
      description: "Annual production",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <Card key={stat.label} className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="size-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm font-medium text-foreground/80 mt-1">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

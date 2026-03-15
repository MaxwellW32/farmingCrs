import { Sprout, Droplets, Sun, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    name: "Active Crops",
    value: "12",
    change: "+2 from last month",
    icon: Sprout,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    name: "Water Usage",
    value: "2,450L",
    change: "-12% from yesterday",
    icon: Droplets,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    name: "Sun Exposure",
    value: "8.2 hrs",
    change: "Optimal conditions",
    icon: Sun,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    name: "Yield Forecast",
    value: "+24%",
    change: "Above average",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
]

export function StatsOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className={`rounded-lg p-2.5 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-bold text-card-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarNav } from "@/components/farmer-profile/sidebar-nav"
import { Tractor, TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Calendar } from "lucide-react"

const monthlyYield = [
  { month: "Jan", yield: 850 },
  { month: "Feb", yield: 920 },
  { month: "Mar", yield: 1100 },
  { month: "Apr", yield: 1350 },
  { month: "May", yield: 1580 },
  { month: "Jun", yield: 1420 },
  { month: "Jul", yield: 1650 },
  { month: "Aug", yield: 1780 },
  { month: "Sep", yield: 1520 },
  { month: "Oct", yield: 1380 },
  { month: "Nov", yield: 1050 },
  { month: "Dec", yield: 900 },
]

const cropDistribution = [
  { crop: "Wheat", percentage: 35, color: "bg-primary" },
  { crop: "Corn", percentage: 28, color: "bg-accent" },
  { crop: "Soybeans", percentage: 22, color: "bg-chart-3" },
  { crop: "Vegetables", percentage: 15, color: "bg-chart-4" },
]

const recentActivity = [
  { date: "Mar 12, 2026", action: "Harvest completed", branch: "North Valley Farm", type: "success" },
  { date: "Mar 10, 2026", action: "Irrigation system maintenance", branch: "River Delta Estate", type: "info" },
  { date: "Mar 8, 2026", action: "New equipment purchased", branch: "Highland Orchards", type: "info" },
  { date: "Mar 5, 2026", action: "Soil analysis report received", branch: "Southside Fields", type: "success" },
  { date: "Mar 2, 2026", action: "Seasonal workers onboarded", branch: "North Valley Farm", type: "info" },
]

export default function AnalyticsPage() {
  const maxYield = Math.max(...monthlyYield.map((m) => m.yield))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <SidebarNav />
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
                <p className="text-muted-foreground mt-1">Track your farm performance and insights</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                <span>Last 12 months</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <TrendingUp className="size-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">$2.4M</p>
                  <p className="text-xs text-primary mt-1">+12.5% from last year</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Avg Yield/Acre</p>
                    <TrendingUp className="size-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">4.38 tons</p>
                  <p className="text-xs text-primary mt-1">+8.2% from last year</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Operating Costs</p>
                    <TrendingDown className="size-4 text-destructive" />
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">$890K</p>
                  <p className="text-xs text-destructive mt-1">+5.3% from last year</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Profit Margin</p>
                    <Activity className="size-4 text-accent" />
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">62.9%</p>
                  <p className="text-xs text-muted-foreground mt-1">Industry avg: 45%</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Yield Chart */}
              <Card className="bg-card border-border lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="size-5 text-primary" />
                    Monthly Yield (tons)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 h-48">
                    {monthlyYield.map((item) => (
                      <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-primary/80 rounded-t hover:bg-primary transition-colors"
                          style={{ height: `${(item.yield / maxYield) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Crop Distribution */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="size-5 text-primary" />
                    Crop Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cropDistribution.map((crop) => (
                      <div key={crop.crop} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{crop.crop}</span>
                          <span className="text-muted-foreground">{crop.percentage}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${crop.color} rounded-full`}
                            style={{ width: `${crop.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="size-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div
                        className={`size-2 rounded-full mt-2 ${activity.type === "success" ? "bg-primary" : "bg-accent"
                          }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.branch}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Farming CRS - Connecting Farmers, Growing Communities</p>
        </div>
      </footer>
    </div>
  )
}

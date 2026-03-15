"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Download,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  Droplets,
  Sprout,
  DollarSign,
  Clock,
  Filter,
  ChevronRight,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const yieldData = [
  { month: "Oct", tomatoes: 1200, corn: 3500, soybeans: 0, lettuce: 800 },
  { month: "Nov", tomatoes: 1400, corn: 3800, soybeans: 0, lettuce: 900 },
  { month: "Dec", tomatoes: 1100, corn: 3200, soybeans: 1500, lettuce: 750 },
  { month: "Jan", tomatoes: 900, corn: 0, soybeans: 1800, lettuce: 850 },
  { month: "Feb", tomatoes: 800, corn: 0, soybeans: 2100, lettuce: 920 },
  { month: "Mar", tomatoes: 1000, corn: 0, soybeans: 2400, lettuce: 1100 },
]

const cropDistribution = [
  { name: "Corn", value: 40, color: "oklch(0.75 0.15 80)" },
  { name: "Soybeans", value: 32, color: "oklch(0.7 0.18 145)" },
  { name: "Tomatoes", value: 20, color: "oklch(0.65 0.18 35)" },
  { name: "Lettuce", value: 8, color: "oklch(0.55 0.2 200)" },
]

const waterUsageTrend = [
  { month: "Oct", usage: 4500, efficiency: 82 },
  { month: "Nov", usage: 4800, efficiency: 84 },
  { month: "Dec", usage: 5200, efficiency: 86 },
  { month: "Jan", usage: 4600, efficiency: 88 },
  { month: "Feb", usage: 4200, efficiency: 90 },
  { month: "Mar", usage: 4100, efficiency: 91 },
]

const recentReports = [
  {
    id: 1,
    name: "Monthly Yield Report - February 2026",
    type: "Yield",
    date: "Mar 1, 2026",
    status: "ready",
  },
  {
    id: 2,
    name: "Water Usage Analysis Q1 2026",
    type: "Water",
    date: "Feb 28, 2026",
    status: "ready",
  },
  {
    id: 3,
    name: "Soil Health Assessment",
    type: "Soil",
    date: "Feb 15, 2026",
    status: "ready",
  },
  {
    id: 4,
    name: "Financial Summary - YTD",
    type: "Financial",
    date: "Mar 10, 2026",
    status: "processing",
  },
]

const kpis = [
  {
    name: "Total Yield",
    value: "18,500 lbs",
    change: "+12%",
    trend: "up",
    icon: Sprout,
  },
  {
    name: "Water Efficiency",
    value: "91%",
    change: "+9%",
    trend: "up",
    icon: Droplets,
  },
  {
    name: "Revenue YTD",
    value: "$42,500",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Operating Cost",
    value: "$15,200",
    change: "-5%",
    trend: "down",
    icon: TrendingDown,
  },
]

export default function ReportsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-32 bg-secondary">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const IconComponent = kpi.icon
          return (
            <Card key={kpi.name} className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{kpi.name}</p>
                      <p className="text-xl font-bold text-foreground">
                        {kpi.value}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      kpi.trend === "up"
                        ? "bg-primary/20 text-primary"
                        : "bg-accent/20 text-accent"
                    }
                  >
                    {kpi.trend === "up" ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {kpi.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Yield Chart */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Crop Yield (lbs)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldData}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                    width={50}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.25 0 0)",
                      borderRadius: "6px",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="tomatoes"
                    fill="oklch(0.65 0.18 35)"
                    name="Tomatoes"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="corn"
                    fill="oklch(0.75 0.15 80)"
                    name="Corn"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="soybeans"
                    fill="oklch(0.7 0.18 145)"
                    name="Soybeans"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="lettuce"
                    fill="oklch(0.55 0.2 200)"
                    name="Lettuce"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Crop Distribution */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Crop Distribution by Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {cropDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.25 0 0)",
                      borderRadius: "6px",
                      color: "oklch(0.98 0 0)",
                    }}
                    formatter={(value: number) => [`${value}%`, "Area"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {cropDistribution.map((crop) => (
                <div key={crop.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: crop.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {crop.name} ({crop.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Water Usage Trend */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Water Usage & Efficiency Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waterUsageTrend}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                    width={50}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[70, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                    width={50}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.25 0 0)",
                      borderRadius: "6px",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="usage"
                    stroke="oklch(0.55 0.2 200)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.55 0.2 200)", strokeWidth: 0 }}
                    name="Usage (Gallons)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="efficiency"
                    stroke="oklch(0.7 0.18 145)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.7 0.18 145)", strokeWidth: 0 }}
                    name="Efficiency (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-card-foreground">
                Recent Reports
              </CardTitle>
              <Button variant="ghost" className="text-sm text-accent">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-lg bg-secondary p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === "ready" ? (
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-warning/20 text-warning"
                      >
                        <Clock className="mr-1 h-3 w-3" />
                        Processing
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

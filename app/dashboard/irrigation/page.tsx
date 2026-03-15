"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Droplets,
  Power,
  Clock,
  Gauge,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
  Play,
  Pause,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const irrigationZones = [
  {
    id: 1,
    name: "North Field - Tomatoes",
    status: "active",
    schedule: "6:00 AM - 7:30 AM",
    waterUsage: 250,
    soilMoisture: 42,
    lastIrrigated: "Today, 7:30 AM",
    duration: "90 min",
    efficiency: 92,
  },
  {
    id: 2,
    name: "South Field - Corn",
    status: "scheduled",
    schedule: "5:00 PM - 6:00 PM",
    waterUsage: 180,
    soilMoisture: 38,
    lastIrrigated: "Yesterday, 6:00 PM",
    duration: "60 min",
    efficiency: 88,
  },
  {
    id: 3,
    name: "East Field - Soybeans",
    status: "needs_attention",
    schedule: "7:00 AM - 8:00 AM",
    waterUsage: 200,
    soilMoisture: 32,
    lastIrrigated: "2 days ago",
    duration: "60 min",
    efficiency: 85,
  },
  {
    id: 4,
    name: "Greenhouse - Lettuce",
    status: "paused",
    schedule: "8:00 AM - 8:30 AM",
    waterUsage: 50,
    soilMoisture: 58,
    lastIrrigated: "Today, 8:30 AM",
    duration: "30 min",
    efficiency: 95,
  },
]

const waterUsageData = [
  { day: "Mon", usage: 680 },
  { day: "Tue", usage: 720 },
  { day: "Wed", usage: 650 },
  { day: "Thu", usage: 700 },
  { day: "Fri", usage: 580 },
  { day: "Sat", usage: 620 },
  { day: "Sun", usage: 680 },
]

const hourlySchedule = [
  { time: "5AM", flow: 0 },
  { time: "6AM", flow: 250 },
  { time: "7AM", flow: 380 },
  { time: "8AM", flow: 180 },
  { time: "9AM", flow: 50 },
  { time: "10AM", flow: 0 },
  { time: "11AM", flow: 0 },
  { time: "12PM", flow: 0 },
  { time: "1PM", flow: 0 },
  { time: "2PM", flow: 0 },
  { time: "3PM", flow: 0 },
  { time: "4PM", flow: 0 },
  { time: "5PM", flow: 200 },
  { time: "6PM", flow: 180 },
  { time: "7PM", flow: 0 },
]

const statusConfig: Record<
  string,
  { label: string; color: string; icon: typeof CheckCircle }
> = {
  active: { label: "Active", color: "bg-primary/20 text-primary", icon: CheckCircle },
  scheduled: { label: "Scheduled", color: "bg-accent/20 text-accent", icon: Clock },
  needs_attention: {
    label: "Needs Attention",
    color: "bg-warning/20 text-warning",
    icon: AlertTriangle,
  },
  paused: { label: "Paused", color: "bg-muted text-muted-foreground", icon: Pause },
}

export default function IrrigationPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Irrigation Management
          </h2>
          <p className="text-sm text-muted-foreground">
            Monitor and control your irrigation systems
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Edit Schedule
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Play className="mr-2 h-4 w-4" />
            Start All
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Droplets className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">680</p>
                <p className="text-xs text-muted-foreground">Gallons Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Power className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Active Zones</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                <Gauge className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">90%</p>
                <p className="text-xs text-muted-foreground">Avg. Efficiency</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-xs text-muted-foreground">Needs Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Irrigation Zones */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Irrigation Zones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {irrigationZones.map((zone) => {
              const status = statusConfig[zone.status]
              const StatusIcon = status.icon
              return (
                <div
                  key={zone.id}
                  className="rounded-lg border border-border bg-secondary p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                        <Droplets className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">
                            {zone.name}
                          </h4>
                          <Badge variant="secondary" className={status.color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {status.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Schedule: {zone.schedule}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last: {zone.lastIrrigated}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-foreground">
                          {zone.soilMoisture}%
                        </p>
                        <p className="text-xs text-muted-foreground">Moisture</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-foreground">
                          {zone.waterUsage}
                        </p>
                        <p className="text-xs text-muted-foreground">Gal/Day</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-primary">
                          {zone.efficiency}%
                        </p>
                        <p className="text-xs text-muted-foreground">Efficiency</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Switch
                          checked={zone.status === "active"}
                          aria-label={`Toggle ${zone.name}`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Soil Moisture</span>
                      <span className="text-foreground">{zone.soilMoisture}%</span>
                    </div>
                    <Progress value={zone.soilMoisture} className="mt-1 h-2" />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Water Usage Chart */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Weekly Water Usage (Gallons)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterUsageData}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.25 0 0)",
                      borderRadius: "6px",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                  <Bar
                    dataKey="usage"
                    fill="oklch(0.55 0.2 200)"
                    radius={[4, 4, 0, 0]}
                    name="Gallons"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Today's Flow Rate (GPM)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlySchedule}>
                  <defs>
                    <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="oklch(0.55 0.2 200)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="oklch(0.55 0.2 200)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 10 }}
                    interval={2}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.25 0 0)",
                      borderRadius: "6px",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="flow"
                    stroke="oklch(0.55 0.2 200)"
                    strokeWidth={2}
                    fill="url(#flowGradient)"
                    name="Flow Rate (GPM)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

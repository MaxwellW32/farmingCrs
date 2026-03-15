"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Layers,
  Droplets,
  Thermometer,
  Leaf,
  FlaskConical,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Calendar,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts"

const nutrientData = [
  { name: "Nitrogen (N)", value: 75, optimal: "60-80", status: "optimal", unit: "ppm" },
  { name: "Phosphorus (P)", value: 45, optimal: "50-70", status: "low", unit: "ppm" },
  { name: "Potassium (K)", value: 82, optimal: "70-90", status: "optimal", unit: "ppm" },
  { name: "Calcium (Ca)", value: 68, optimal: "60-80", status: "optimal", unit: "ppm" },
  { name: "Magnesium (Mg)", value: 35, optimal: "40-60", status: "low", unit: "ppm" },
  { name: "Sulfur (S)", value: 55, optimal: "40-60", status: "optimal", unit: "ppm" },
]

const radarData = [
  { nutrient: "N", value: 75, fullMark: 100 },
  { nutrient: "P", value: 45, fullMark: 100 },
  { nutrient: "K", value: 82, fullMark: 100 },
  { nutrient: "Ca", value: 68, fullMark: 100 },
  { nutrient: "Mg", value: 35, fullMark: 100 },
  { nutrient: "S", value: 55, fullMark: 100 },
]

const moistureHistory = [
  { date: "Mar 8", moisture: 48 },
  { date: "Mar 9", moisture: 52 },
  { date: "Mar 10", moisture: 45 },
  { date: "Mar 11", moisture: 38 },
  { date: "Mar 12", moisture: 42 },
  { date: "Mar 13", moisture: 40 },
  { date: "Mar 14", moisture: 42 },
]

const soilZones = [
  { name: "North Field", type: "Loamy", moisture: 45, ph: 6.5, health: "Good" },
  { name: "South Field", type: "Sandy Loam", moisture: 38, ph: 6.2, health: "Fair" },
  { name: "East Orchard", type: "Clay Loam", moisture: 52, ph: 6.8, health: "Excellent" },
  { name: "West Greenhouse", type: "Potting Mix", moisture: 60, ph: 6.0, health: "Good" },
]

const statusColors: Record<string, string> = {
  optimal: "bg-primary/20 text-primary",
  low: "bg-warning/20 text-warning",
  high: "bg-destructive/20 text-destructive",
}

const healthColors: Record<string, string> = {
  Excellent: "bg-primary/20 text-primary",
  Good: "bg-success/20 text-success",
  Fair: "bg-warning/20 text-warning",
  Poor: "bg-destructive/20 text-destructive",
}

export default function SoilPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Soil Analysis</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive soil health and nutrient monitoring
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Test
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <Layers className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Soil Type</p>
                  <p className="text-lg font-semibold text-foreground">Loamy</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Droplets className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Moisture</p>
                  <p className="text-lg font-semibold text-foreground">42%</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-warning/20 text-warning">
                <TrendingDown className="mr-1 h-3 w-3" />
                Low
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FlaskConical className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">pH Level</p>
                  <p className="text-lg font-semibold text-foreground">6.5</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <Minus className="mr-1 h-3 w-3" />
                Optimal
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                  <Thermometer className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Temperature</p>
                  <p className="text-lg font-semibold text-foreground">22°C</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <TrendingUp className="mr-1 h-3 w-3" />
                Good
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Nutrient Levels */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Nutrient Levels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nutrientData.map((nutrient) => (
              <div key={nutrient.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {nutrient.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground">
                      {nutrient.value} {nutrient.unit}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-xs capitalize ${statusColors[nutrient.status]}`}
                    >
                      {nutrient.status}
                    </Badge>
                  </div>
                </div>
                <Progress value={nutrient.value} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Optimal range: {nutrient.optimal} {nutrient.unit}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Nutrient Radar */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Nutrient Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="oklch(0.25 0 0)" />
                  <PolarAngleAxis
                    dataKey="nutrient"
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
                  />
                  <Radar
                    name="Current Level"
                    dataKey="value"
                    stroke="oklch(0.7 0.18 145)"
                    fill="oklch(0.7 0.18 145)"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Moisture History */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Moisture History (7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moistureHistory}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                  />
                  <YAxis
                    domain={[30, 60]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.25 0 0)",
                      borderRadius: "6px",
                      color: "oklch(0.98 0 0)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="moisture"
                    stroke="oklch(0.55 0.2 200)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.55 0.2 200)", strokeWidth: 0 }}
                    name="Moisture (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Soil Zones */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Field Zones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {soilZones.map((zone) => (
              <div
                key={zone.name}
                className="flex items-center justify-between rounded-lg bg-secondary p-3"
              >
                <div>
                  <p className="font-medium text-foreground">{zone.name}</p>
                  <p className="text-xs text-muted-foreground">{zone.type}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-accent" />
                    <span className="text-foreground">{zone.moisture}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FlaskConical className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{zone.ph}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={healthColors[zone.health]}
                  >
                    {zone.health}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Droplets,
  Thermometer,
  Sprout,
  AlertTriangle,
  Eye,
  Filter,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fieldZones = [
  {
    id: 1,
    name: "North Field",
    crop: "Tomatoes",
    area: "2.5 acres",
    status: "healthy",
    moisture: 45,
    temperature: 24,
    color: "bg-primary/60",
    position: { top: "10%", left: "20%", width: "35%", height: "25%" },
  },
  {
    id: 2,
    name: "South Field",
    crop: "Corn",
    area: "5.0 acres",
    status: "healthy",
    moisture: 42,
    temperature: 25,
    color: "bg-warning/60",
    position: { top: "60%", left: "15%", width: "40%", height: "30%" },
  },
  {
    id: 3,
    name: "East Field",
    crop: "Soybeans",
    area: "4.0 acres",
    status: "needs_water",
    moisture: 32,
    temperature: 26,
    color: "bg-accent/60",
    position: { top: "20%", left: "60%", width: "30%", height: "35%" },
  },
  {
    id: 4,
    name: "Greenhouse",
    crop: "Lettuce",
    area: "1.0 acres",
    status: "ready",
    moisture: 58,
    temperature: 22,
    color: "bg-chart-3/60",
    position: { top: "65%", left: "65%", width: "20%", height: "20%" },
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  healthy: { label: "Healthy", color: "bg-primary/20 text-primary" },
  needs_water: { label: "Needs Water", color: "bg-accent/20 text-accent" },
  ready: { label: "Ready to Harvest", color: "bg-chart-3/20 text-chart-3" },
  alert: { label: "Alert", color: "bg-destructive/20 text-destructive" },
}

const mapLayers = [
  { id: "crop", name: "Crop Type", active: true },
  { id: "moisture", name: "Soil Moisture", active: false },
  { id: "temperature", name: "Temperature", active: false },
  { id: "irrigation", name: "Irrigation Zones", active: false },
  { id: "sensors", name: "Sensor Locations", active: true },
]

const sensors = [
  { id: 1, type: "moisture", value: "45%", position: { top: "18%", left: "35%" } },
  { id: 2, type: "moisture", value: "32%", position: { top: "35%", left: "72%" } },
  { id: 3, type: "temperature", value: "24°C", position: { top: "75%", left: "30%" } },
  { id: 4, type: "moisture", value: "58%", position: { top: "72%", left: "73%" } },
]

export default function FieldMapPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Field Map</h2>
          <p className="text-sm text-muted-foreground">
            Interactive view of your farm fields and sensor data
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="crop">
            <SelectTrigger className="w-40 bg-secondary">
              <SelectValue placeholder="View Layer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crop">Crop View</SelectItem>
              <SelectItem value="moisture">Moisture View</SelectItem>
              <SelectItem value="health">Health View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Map */}
        <Card className="border-border bg-card lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <MapPin className="h-5 w-5" />
                Farm Overview
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Interactive Map Area */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-secondary">
              {/* Grid overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(0.25 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.25 0 0) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Field Zones */}
              {fieldZones.map((zone) => (
                <div
                  key={zone.id}
                  className={`absolute cursor-pointer rounded-lg border-2 border-dashed border-foreground/30 transition-all hover:border-foreground/60 ${zone.color}`}
                  style={{
                    top: zone.position.top,
                    left: zone.position.left,
                    width: zone.position.width,
                    height: zone.position.height,
                  }}
                >
                  <div className="flex h-full flex-col items-center justify-center p-2 text-center">
                    <span className="text-sm font-semibold text-foreground">
                      {zone.name}
                    </span>
                    <span className="text-xs text-foreground/80">{zone.crop}</span>
                  </div>
                </div>
              ))}

              {/* Sensors */}
              {sensors.map((sensor) => (
                <div
                  key={sensor.id}
                  className="absolute z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-card border border-border shadow-lg transition-transform hover:scale-110"
                  style={{
                    top: sensor.position.top,
                    left: sensor.position.left,
                    transform: "translate(-50%, -50%)",
                  }}
                  title={`${sensor.type}: ${sensor.value}`}
                >
                  {sensor.type === "moisture" ? (
                    <Droplets className="h-4 w-4 text-accent" />
                  ) : (
                    <Thermometer className="h-4 w-4 text-chart-4" />
                  )}
                </div>
              ))}

              {/* Compass */}
              <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-card/80 border border-border">
                <span className="text-sm font-bold text-foreground">N</span>
              </div>

              {/* Scale */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded bg-card/80 px-2 py-1">
                <div className="h-1 w-16 bg-foreground" />
                <span className="text-xs text-foreground">100m</span>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-foreground">Legend:</span>
              {fieldZones.map((zone) => (
                <div key={zone.id} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded ${zone.color}`} />
                  <span className="text-xs text-muted-foreground">{zone.crop}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Layers */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <Layers className="h-5 w-5" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mapLayers.map((layer) => (
                <div
                  key={layer.id}
                  className="flex items-center justify-between rounded-lg bg-secondary p-2"
                >
                  <span className="text-sm text-foreground">{layer.name}</span>
                  <div
                    className={`h-4 w-4 rounded border ${
                      layer.active
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Field Details */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-card-foreground">
                Field Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {fieldZones.map((zone) => {
                const status = statusConfig[zone.status]
                return (
                  <div
                    key={zone.id}
                    className="rounded-lg bg-secondary p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">
                        {zone.name}
                      </span>
                      <Badge variant="secondary" className={status.color}>
                        {status.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Sprout className="h-3 w-3" />
                        {zone.crop}
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        {zone.moisture}%
                      </div>
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-3 w-3" />
                        {zone.temperature}°C
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Area: {zone.area}
                    </p>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-card-foreground">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" />
                View Sensor History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                View Alerts (2)
              </Button>
              <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                <MapPin className="mr-2 h-4 w-4" />
                Add New Zone
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

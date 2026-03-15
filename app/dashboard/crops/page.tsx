"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sprout,
  Leaf,
  Wheat,
  Apple,
  Plus,
  Filter,
  Search,
  Calendar,
  Droplets,
  Sun,
  TrendingUp,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const crops = [
  {
    id: 1,
    name: "Tomatoes",
    variety: "Roma VF",
    stage: "Flowering",
    progress: 65,
    plantedDate: "Feb 15, 2026",
    expectedHarvest: "May 20, 2026",
    health: "Healthy",
    icon: Apple,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    area: "2.5 acres",
    waterNeeds: "Moderate",
    sunlight: "Full Sun",
    yieldEstimate: "3,200 lbs",
  },
  {
    id: 2,
    name: "Corn",
    variety: "Sweet Yellow",
    stage: "Vegetative",
    progress: 45,
    plantedDate: "Feb 28, 2026",
    expectedHarvest: "Jun 10, 2026",
    health: "Healthy",
    icon: Wheat,
    color: "text-warning",
    bgColor: "bg-warning/10",
    area: "5.0 acres",
    waterNeeds: "High",
    sunlight: "Full Sun",
    yieldEstimate: "8,500 lbs",
  },
  {
    id: 3,
    name: "Soybeans",
    variety: "AG2832",
    stage: "Germination",
    progress: 25,
    plantedDate: "Mar 05, 2026",
    expectedHarvest: "Jul 15, 2026",
    health: "Needs Water",
    icon: Leaf,
    color: "text-primary",
    bgColor: "bg-primary/10",
    area: "4.0 acres",
    waterNeeds: "High",
    sunlight: "Full Sun",
    yieldEstimate: "4,800 lbs",
  },
  {
    id: 4,
    name: "Lettuce",
    variety: "Butterhead",
    stage: "Ready to Harvest",
    progress: 95,
    plantedDate: "Jan 20, 2026",
    expectedHarvest: "Mar 18, 2026",
    health: "Ready",
    icon: Sprout,
    color: "text-success",
    bgColor: "bg-success/10",
    area: "1.0 acres",
    waterNeeds: "Moderate",
    sunlight: "Partial Shade",
    yieldEstimate: "1,800 lbs",
  },
]

const stageColors: Record<string, string> = {
  Germination: "bg-accent/20 text-accent",
  Vegetative: "bg-warning/20 text-warning",
  Flowering: "bg-chart-4/20 text-chart-4",
  "Ready to Harvest": "bg-primary/20 text-primary",
}

const healthColors: Record<string, string> = {
  Healthy: "bg-primary/20 text-primary",
  "Needs Water": "bg-accent/20 text-accent",
  Ready: "bg-success/20 text-success",
}

export default function CropsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Crops Management</h2>
          <p className="text-sm text-muted-foreground">
            Track and manage all your registered crops
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New Crop
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search crops..."
            className="bg-secondary pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full bg-secondary sm:w-40">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="germination">Germination</SelectItem>
            <SelectItem value="vegetative">Vegetative</SelectItem>
            <SelectItem value="flowering">Flowering</SelectItem>
            <SelectItem value="harvest">Ready to Harvest</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full bg-secondary sm:w-40">
            <SelectValue placeholder="Health" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Health</SelectItem>
            <SelectItem value="healthy">Healthy</SelectItem>
            <SelectItem value="needs-water">Needs Water</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Sprout className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Active Crops</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-xs text-muted-foreground">Ready to Harvest</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Droplets className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-xs text-muted-foreground">Needs Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                <TrendingUp className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12.5</p>
                <p className="text-xs text-muted-foreground">Total Acres</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crops Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {crops.map((crop) => {
          const IconComponent = crop.icon
          return (
            <Card
              key={crop.id}
              className="group cursor-pointer border-border bg-card transition-all hover:border-primary/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${crop.bgColor}`}
                    >
                      <IconComponent className={`h-6 w-6 ${crop.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground">
                        {crop.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {crop.variety}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      variant="secondary"
                      className={stageColors[crop.stage]}
                    >
                      {crop.stage}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={healthColors[crop.health]}
                    >
                      {crop.health}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Growth Progress</span>
                    <span className="font-semibold text-foreground">
                      {crop.progress}%
                    </span>
                  </div>
                  <Progress value={crop.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-secondary p-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Planted</p>
                        <p className="font-medium text-foreground">
                          {crop.plantedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-secondary p-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Harvest</p>
                        <p className="font-medium text-foreground">
                          {crop.expectedHarvest}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-secondary p-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground">Water</p>
                        <p className="font-medium text-foreground">
                          {crop.waterNeeds}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-secondary p-2">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-warning" />
                      <div>
                        <p className="text-xs text-muted-foreground">Sunlight</p>
                        <p className="font-medium text-foreground">
                          {crop.sunlight}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Area</p>
                    <p className="font-semibold text-foreground">{crop.area}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Est. Yield</p>
                    <p className="font-semibold text-primary">
                      {crop.yieldEstimate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { MapPin, Droplets, Sun, Users, TrendingUp, Calendar, Leaf, ThermometerSun } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface BranchDetail {
  id: string
  name: string
  location: string
  acres: number
  crops: string[]
  status: "active" | "seasonal" | "developing"
  irrigation: string
  employees: number
  established: string
  soilType: string
  climate: string
  lastHarvest: string
  nextPlanting: string
  yieldPerAcre: string
  image: string
}

export function BranchCard({ branch }: { branch: BranchDetail }) {
  const getStatusColor = (status: BranchDetail["status"]) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground"
      case "seasonal":
        return "bg-accent text-accent-foreground"
      case "developing":
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 group">
      {/* Image Header */}
      <div className="relative h-48 bg-secondary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ 
            backgroundImage: `url(${branch.image})`,
            backgroundColor: 'oklch(0.25 0.03 145)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge className={getStatusColor(branch.status)}>
            {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-foreground mb-1">{branch.name}</h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4" />
            <span className="text-sm">{branch.location}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Sun className="size-5 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Total Area</p>
              <p className="font-semibold text-foreground">{branch.acres} acres</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Users className="size-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Workers</p>
              <p className="font-semibold text-foreground">{branch.employees}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Droplets className="size-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Irrigation</p>
              <p className="font-semibold text-foreground text-sm">{branch.irrigation}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <TrendingUp className="size-5 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Yield/Acre</p>
              <p className="font-semibold text-foreground">{branch.yieldPerAcre}</p>
            </div>
          </div>
        </div>

        {/* Crops */}
        <div>
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Leaf className="size-4" />
            Crops Grown
          </p>
          <div className="flex flex-wrap gap-2">
            {branch.crops.map((crop) => (
              <Badge key={crop} variant="outline" className="border-primary/30 text-foreground bg-primary/10">
                {crop}
              </Badge>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
              <ThermometerSun className="size-3" />
              Climate
            </p>
            <p className="text-sm text-foreground">{branch.climate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Soil Type</p>
            <p className="text-sm text-foreground">{branch.soilType}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
              <Calendar className="size-3" />
              Last Harvest
            </p>
            <p className="text-sm text-foreground">{branch.lastHarvest}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Next Planting</p>
            <p className="text-sm text-foreground">{branch.nextPlanting}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            View Details
          </Button>
          <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-secondary">
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

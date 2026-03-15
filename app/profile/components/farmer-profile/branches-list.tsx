"use client"

import { MapPin, Wheat, Droplets, Sun } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Branch {
  id: string
  name: string
  location: string
  acres: number
  crops: string[]
  status: "active" | "seasonal" | "developing"
  irrigation: string
}

export function BranchesList({ branches }: { branches: Branch[] }) {
  const getStatusColor = (status: Branch["status"]) => {
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
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Wheat className="size-6 text-primary" />
          Farm Branches
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{branch.name}</h3>
                  <Badge className={getStatusColor(branch.status)}>
                    {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="size-4" />
                  <span className="text-sm">{branch.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {branch.crops.map((crop) => (
                    <Badge key={crop} variant="outline" className="border-border text-muted-foreground">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-row sm:flex-col gap-4 sm:gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sun className="size-4 text-accent" />
                  <span>{branch.acres} acres</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="size-4 text-primary" />
                  <span>{branch.irrigation}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

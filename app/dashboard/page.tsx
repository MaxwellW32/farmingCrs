"use client"

import { StatsOverview } from "@/components/dashboard/stats-overview"
import { WeatherCard } from "@/components/dashboard/weather-card"
import { CropsProgress } from "@/components/dashboard/crops-progress"
import { AIRecommendations } from "@/components/dashboard/ai-recommendations"
import { SoilStatus } from "@/components/dashboard/soil-status"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  Bug,
  Zap,
  AlertTriangle,
  AlertCircle,
  Info
} from "lucide-react"

interface ControlItem {
  id: string
  name: string
  icon: React.ReactNode
  enabled: boolean
  hasSlider: boolean
  value: number
  unit: string
  alert?: {
    type: "critical" | "warning" | "info"
    message: string
  }
}

export default function OverviewPage() {
   const [controls, setControls] = useState<ControlItem[]>([
    {
      id: "cooling",
      name: "Greenhouse Cooling",
      icon: <Thermometer className="h-5 w-5" />,
      enabled: true,
      hasSlider: true,
      value: 75,
      unit: "%",
      alert: {
        type: "critical",
        message: "Heat stress detected! Crops experiencing 38°C. Immediate cooling recommended."
      }
    },
    {
      id: "irrigation",
      name: "Smart Irrigation",
      icon: <Droplets className="h-5 w-5" />,
      enabled: true,
      hasSlider: true,
      value: 60,
      unit: "%",
      alert: {
        type: "warning",
        message: "Soil moisture at 28% in Field B. Consider increasing irrigation."
      }
    },
    {
      id: "ventilation",
      name: "Ventilation System",
      icon: <Wind className="h-5 w-5" />,
      enabled: true,
      hasSlider: true,
      value: 45,
      unit: "%"
    },
    {
      id: "lights",
      name: "Grow Lights",
      icon: <Sun className="h-5 w-5" />,
      enabled: false,
      hasSlider: false,
      value: 0,
      unit: ""
    },
    {
      id: "pest",
      name: "Pest Detection",
      icon: <Bug className="h-5 w-5" />,
      enabled: true,
      hasSlider: false,
      value: 0,
      unit: "",
      alert: {
        type: "info",
        message: "Elevated pest risk due to humidity levels. Monitoring active."
      }
    },
    {
      id: "power",
      name: "Backup Power",
      icon: <Zap className="h-5 w-5" />,
      enabled: false,
      hasSlider: false,
      value: 0,
      unit: ""
    }
  ])

  const toggleControl = (id: string) => {
    setControls(prev => prev.map(control => 
      control.id === id ? { ...control, enabled: !control.enabled } : control
    ))
  }

  const updateValue = (id: string, newValue: number[]) => {
    setControls(prev => prev.map(control => 
      control.id === id ? { ...control, value: newValue[0] } : control
    ))
  }

  const getAlertStyles = (type: "critical" | "warning" | "info") => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          text: "text-red-400",
          icon: <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
        }
      case "warning":
        return {
          bg: "bg-amber-500/10",
          border: "border-amber-500/30",
          text: "text-amber-400",
          icon: <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
        }
      case "info":
        return {
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          text: "text-blue-400",
          icon: <Info className="h-4 w-4 text-blue-400 shrink-0" />
        }
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Farm Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Monitor your crops, weather conditions, and get AI-powered
          recommendations
        </p>
      </div>

      <div className="mb-6">
        <StatsOverview />
      </div>

      <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Farm Controls</CardTitle>
          <Badge variant="outline" className="border-primary/30 text-primary">
            Live
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage your farm systems and respond to alerts
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {controls.map((control) => (
            <div
              key={control.id}
              className="rounded-lg border border-border bg-muted/30 p-4"
            >
              {/* Alert Banner */}
              {control.alert && control.enabled && (
                <div className={`mb-3 flex items-start gap-2 rounded-md border p-2 ${getAlertStyles(control.alert.type).bg} ${getAlertStyles(control.alert.type).border}`}>
                  {getAlertStyles(control.alert.type).icon}
                  <p className={`text-xs ${getAlertStyles(control.alert.type).text}`}>
                    {control.alert.message}
                  </p>
                </div>
              )}

              {/* Control Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-md p-2 ${control.enabled ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {control.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{control.name}</p>
                    {control.hasSlider && control.enabled && (
                      <p className="text-sm text-muted-foreground">
                        Output: {control.value}{control.unit}
                      </p>
                    )}
                  </div>
                </div>
                <Switch
                  checked={control.enabled}
                  onCheckedChange={() => toggleControl(control.id)}
                />
              </div>

              {/* Slider Control */}
              {control.hasSlider && control.enabled && (
                <div className="mt-4">
                  <Slider
                    value={[control.value]}
                    onValueChange={(val) => updateValue(control.id, val)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <WeatherCard />
          <SoilStatus />
        </div>

        <div className="lg:col-span-1">
          <CropsProgress />
        </div>

        <div className="lg:col-span-1">
          <AIRecommendations />
        </div>
      </div>
    </div>
  )
}

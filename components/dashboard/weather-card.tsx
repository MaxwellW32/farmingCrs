import { Cloud, Droplets, Wind, Thermometer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const forecast = [
  { day: "Mon", temp: 24, icon: "sunny" },
  { day: "Tue", temp: 22, icon: "cloudy" },
  { day: "Wed", temp: 19, icon: "rainy" },
  { day: "Thu", temp: 21, icon: "cloudy" },
  { day: "Fri", temp: 25, icon: "sunny" },
]

export function WeatherCard() {
  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Cloud className="h-5 w-5 text-info" />
          Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold text-card-foreground">23°C</p>
            <p className="text-sm text-muted-foreground">Partly Cloudy</p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div className="flex items-center justify-end gap-1">
              <Droplets className="h-4 w-4" />
              <span>65% humidity</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <Wind className="h-4 w-4" />
              <span>12 km/h</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between border-t border-border pt-4">
          {forecast.map((day) => (
            <div key={day.day} className="text-center">
              <p className="text-xs text-muted-foreground">{day.day}</p>
              <Thermometer className="mx-auto my-1 h-4 w-4 text-warning" />
              <p className="text-sm font-medium text-card-foreground">
                {day.temp}°
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

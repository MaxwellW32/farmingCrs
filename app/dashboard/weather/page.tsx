"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Cloud,
  CloudRain,
  Droplets,
  Sun,
  Thermometer,
  Wind,
  Sunrise,
  Sunset,
  Eye,
  Gauge,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const hourlyForecast = [
  { time: "6AM", temp: 18, humidity: 75, icon: Sunrise },
  { time: "9AM", temp: 22, humidity: 68, icon: Sun },
  { time: "12PM", temp: 26, humidity: 55, icon: Sun },
  { time: "3PM", temp: 28, humidity: 50, icon: Sun },
  { time: "6PM", temp: 25, humidity: 58, icon: Sunset },
  { time: "9PM", temp: 21, humidity: 65, icon: Cloud },
]

const weeklyForecast = [
  { day: "Mon", high: 28, low: 18, rain: 10, icon: Sun, condition: "Sunny" },
  { day: "Tue", high: 26, low: 17, rain: 20, icon: Cloud, condition: "Partly Cloudy" },
  { day: "Wed", high: 24, low: 16, rain: 45, icon: CloudRain, condition: "Light Rain" },
  { day: "Thu", high: 25, low: 17, rain: 30, icon: Cloud, condition: "Cloudy" },
  { day: "Fri", high: 27, low: 18, rain: 5, icon: Sun, condition: "Sunny" },
  { day: "Sat", high: 29, low: 19, rain: 0, icon: Sun, condition: "Clear" },
  { day: "Sun", high: 28, low: 18, rain: 15, icon: Cloud, condition: "Partly Cloudy" },
]

const temperatureHistory = [
  { date: "Mar 8", max: 25, min: 16, avg: 20 },
  { date: "Mar 9", max: 27, min: 17, avg: 22 },
  { date: "Mar 10", max: 26, min: 18, avg: 22 },
  { date: "Mar 11", max: 24, min: 15, avg: 19 },
  { date: "Mar 12", max: 26, min: 17, avg: 21 },
  { date: "Mar 13", max: 28, min: 18, avg: 23 },
  { date: "Mar 14", max: 26, min: 17, avg: 22 },
]

const rainfallData = [
  { month: "Oct", rainfall: 45 },
  { month: "Nov", rainfall: 62 },
  { month: "Dec", rainfall: 78 },
  { month: "Jan", rainfall: 55 },
  { month: "Feb", rainfall: 42 },
  { month: "Mar", rainfall: 28 },
]

export default function WeatherPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Weather Conditions</h2>
        <p className="text-sm text-muted-foreground">
          Detailed weather data and forecasts for your farm location
        </p>
      </div>

      {/* Current Weather Hero */}
      <Card className="mb-6 border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-warning/10">
                <Sun className="h-16 w-16 text-warning" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold text-foreground">26°C</span>
                </div>
                <p className="text-xl text-muted-foreground">Partly Cloudy</p>
                <p className="text-sm text-muted-foreground">
                  Feels like 28°C
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                <Droplets className="h-6 w-6 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                  <p className="text-lg font-semibold text-foreground">65%</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                <Wind className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Wind</p>
                  <p className="text-lg font-semibold text-foreground">12 km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                <Eye className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Visibility</p>
                  <p className="text-lg font-semibold text-foreground">10 km</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                <Gauge className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Pressure</p>
                  <p className="text-lg font-semibold text-foreground">1013 hPa</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Forecast */}
      <Card className="mb-6 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">
            Hourly Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {hourlyForecast.map((hour) => {
              const IconComponent = hour.icon
              return (
                <div
                  key={hour.time}
                  className="flex min-w-[80px] flex-col items-center gap-2 rounded-lg bg-secondary p-4"
                >
                  <span className="text-sm text-muted-foreground">{hour.time}</span>
                  <IconComponent className="h-8 w-8 text-warning" />
                  <span className="text-lg font-semibold text-foreground">
                    {hour.temp}°
                  </span>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3 text-accent" />
                    <span className="text-xs text-muted-foreground">
                      {hour.humidity}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 7-Day Forecast */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              7-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weeklyForecast.map((day) => {
              const IconComponent = day.icon
              return (
                <div
                  key={day.day}
                  className="flex items-center justify-between rounded-lg bg-secondary p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 font-medium text-foreground">{day.day}</span>
                    <IconComponent className="h-6 w-6 text-warning" />
                    <span className="text-sm text-muted-foreground">
                      {day.condition}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <CloudRain className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">
                        {day.rain}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {day.high}°
                      </span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-muted-foreground">{day.low}°</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Temperature History */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Temperature History (7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureHistory}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 11 }}
                  />
                  <YAxis
                    domain={[10, 35]}
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
                    dataKey="max"
                    stroke="oklch(0.65 0.18 35)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.65 0.18 35)", strokeWidth: 0 }}
                    name="Max (°C)"
                  />
                  <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="oklch(0.75 0.15 80)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.75 0.15 80)", strokeWidth: 0 }}
                    name="Avg (°C)"
                  />
                  <Line
                    type="monotone"
                    dataKey="min"
                    stroke="oklch(0.55 0.2 200)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.55 0.2 200)", strokeWidth: 0 }}
                    name="Min (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Rainfall Chart */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Monthly Rainfall (mm)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rainfallData}>
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
                    dataKey="rainfall"
                    fill="oklch(0.55 0.2 200)"
                    radius={[4, 4, 0, 0]}
                    name="Rainfall (mm)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

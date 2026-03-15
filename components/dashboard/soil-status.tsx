import { Layers } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const soilMetrics = [
  { name: "pH Level", value: "6.8", status: "Optimal", range: "6.0 - 7.0" },
  { name: "Nitrogen", value: "42 ppm", status: "Low", range: "50 - 100 ppm" },
  { name: "Phosphorus", value: "35 ppm", status: "Good", range: "25 - 50 ppm" },
  { name: "Potassium", value: "180 ppm", status: "High", range: "100 - 200 ppm" },
]

export function SoilStatus() {
  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Layers className="h-5 w-5 text-chart-4" />
          Soil Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {soilMetrics.map((metric) => (
            <div
              key={metric.name}
              className="flex items-center justify-between rounded-lg bg-secondary p-3"
            >
              <div>
                <p className="font-medium text-card-foreground">{metric.name}</p>
                <p className="text-xs text-muted-foreground">Range: {metric.range}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-card-foreground">{metric.value}</p>
                <span
                  className={`text-xs font-medium ${
                    metric.status === "Optimal" || metric.status === "Good"
                      ? "text-success"
                      : metric.status === "Low"
                        ? "text-warning"
                        : "text-info"
                  }`}
                >
                  {metric.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

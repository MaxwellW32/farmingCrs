import { Sprout } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const crops = [
  { name: "Wheat", progress: 75, status: "Growing", area: "Field A - 50 acres" },
  { name: "Corn", progress: 45, status: "Seedling", area: "Field B - 30 acres" },
  { name: "Soybeans", progress: 90, status: "Harvest Ready", area: "Field C - 25 acres" },
  { name: "Rice", progress: 60, status: "Flowering", area: "Field D - 40 acres" },
  { name: "Barley", progress: 30, status: "Planting", area: "Field E - 20 acres" },
]

export function CropsProgress() {
  return (
    <Card className="h-full bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sprout className="h-5 w-5 text-success" />
          Crop Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {crops.map((crop) => (
            <div key={crop.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-card-foreground">{crop.name}</p>
                  <p className="text-xs text-muted-foreground">{crop.area}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    crop.progress >= 90
                      ? "bg-success/20 text-success"
                      : crop.progress >= 50
                        ? "bg-info/20 text-info"
                        : "bg-warning/20 text-warning"
                  }`}
                >
                  {crop.status}
                </span>
              </div>
              <Progress value={crop.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

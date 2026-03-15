import { Sparkles, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const recommendations = [
  {
    type: "warning",
    title: "Irrigation Alert",
    description: "Field B moisture levels are below optimal. Consider increasing water supply.",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    type: "success",
    title: "Harvest Window",
    description: "Soybeans in Field C are ready for harvest. Weather looks favorable for next 3 days.",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    type: "info",
    title: "Pest Prevention",
    description: "High humidity forecast. Apply preventive treatment to corn to avoid fungal growth.",
    icon: Info,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    type: "info",
    title: "Soil Analysis",
    description: "Nitrogen levels in Field A are declining. Schedule fertilizer application.",
    icon: Info,
    color: "text-info",
    bgColor: "bg-info/10",
  },
]

export function AIRecommendations() {
  return (
    <Card className="h-full bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex gap-3 rounded-lg border border-border p-3"
            >
              <div className={`rounded-lg p-2 ${rec.bgColor}`}>
                <rec.icon className={`h-4 w-4 ${rec.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-card-foreground">{rec.title}</p>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

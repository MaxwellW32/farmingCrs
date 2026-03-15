import { StatsOverview } from "@/components/dashboard/stats-overview"
import { WeatherCard } from "@/components/dashboard/weather-card"
import { CropsProgress } from "@/components/dashboard/crops-progress"
import { AIRecommendations } from "@/components/dashboard/ai-recommendations"
import { SoilStatus } from "@/components/dashboard/soil-status"

export default function OverviewPage() {
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

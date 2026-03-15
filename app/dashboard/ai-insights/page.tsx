"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertTriangle,
  CheckCircle,
  Droplets,
  Info,
  Lightbulb,
  MessageSquare,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Zap,
  Filter,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const recommendations = [
  {
    id: 1,
    type: "action",
    priority: "high",
    icon: Droplets,
    title: "Increase Irrigation for Soybeans",
    description:
      "Based on current soil moisture levels (32%) and the 7-day forecast showing no rain, increase irrigation by 20% for the soybean fields to prevent water stress during germination.",
    crop: "Soybeans",
    impact: "Prevents yield loss up to 15%",
    timing: "Within 24 hours",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    confidence: 94,
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    type: "insight",
    priority: "medium",
    icon: TrendingUp,
    title: "Optimal Harvest Window for Lettuce",
    description:
      "Weather conditions are ideal for harvesting lettuce over the next 3 days. Temperature and humidity levels are perfect for maintaining freshness post-harvest.",
    crop: "Lettuce",
    impact: "Maximize crop quality",
    timing: "Next 3 days",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    confidence: 89,
    createdAt: "4 hours ago",
  },
  {
    id: 3,
    type: "warning",
    priority: "medium",
    icon: AlertTriangle,
    title: "Potential Pest Risk for Tomatoes",
    description:
      "Current warm and humid conditions may increase aphid activity. Consider preventive organic pest management measures for your tomato crop.",
    crop: "Tomatoes",
    impact: "Early detection saves 25% treatment costs",
    timing: "Monitor next 5 days",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    confidence: 78,
    createdAt: "6 hours ago",
  },
  {
    id: 4,
    type: "optimization",
    priority: "low",
    icon: Zap,
    title: "Fertilizer Application Timing",
    description:
      "Based on corn growth stage and soil nitrogen levels, apply side-dress fertilizer this week for optimal nutrient uptake during vegetative growth.",
    crop: "Corn",
    impact: "Improve yield by 10-12%",
    timing: "This week",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    borderColor: "border-chart-5/30",
    confidence: 85,
    createdAt: "1 day ago",
  },
  {
    id: 5,
    type: "insight",
    priority: "low",
    icon: Lightbulb,
    title: "Crop Rotation Suggestion",
    description:
      "Based on your soil nutrient history, consider planting legumes in the North Field next season to naturally replenish nitrogen levels.",
    crop: "All Fields",
    impact: "Reduce fertilizer costs by 20%",
    timing: "Next planting season",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    borderColor: "border-chart-3/30",
    confidence: 82,
    createdAt: "2 days ago",
  },
]

const priorityBadges: Record<string, string> = {
  high: "bg-destructive/20 text-destructive",
  medium: "bg-warning/20 text-warning",
  low: "bg-muted text-muted-foreground",
}

const historyItems = [
  {
    query: "When should I harvest my tomatoes?",
    response:
      "Based on current growth stage (65% flowering) and weather forecast, optimal harvest window is May 15-25.",
    date: "Mar 12, 2026",
  },
  {
    query: "How can I improve corn yield?",
    response:
      "Consider side-dress nitrogen application this week and ensure adequate irrigation during tasseling stage.",
    date: "Mar 10, 2026",
  },
  {
    query: "What's causing yellow leaves on soybeans?",
    response:
      "Likely nitrogen deficiency due to low soil moisture. Increase irrigation and consider foliar nitrogen application.",
    date: "Mar 8, 2026",
  },
]

export default function AIInsightsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">AI Insights</h2>
              <p className="text-sm text-muted-foreground">
                Personalized recommendations based on your crops, soil, and weather
              </p>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary w-fit">
          5 New Insights
        </Badge>
      </div>

      {/* AI Chat Section */}
      <Card className="mb-6 border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
            <MessageSquare className="h-5 w-5" />
            Ask Your Farm AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Ask anything about your crops, soil, or weather..."
              className="flex-1 bg-secondary"
            />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
            >
              Best time to plant?
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
            >
              How to improve yield?
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
            >
              Pest prevention tips
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
            >
              Water optimization
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search insights..." className="bg-secondary pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full bg-secondary sm:w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full bg-secondary sm:w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="action">Actions</SelectItem>
            <SelectItem value="insight">Insights</SelectItem>
            <SelectItem value="warning">Warnings</SelectItem>
            <SelectItem value="optimization">Optimizations</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recommendations List */}
        <div className="space-y-4 lg:col-span-2">
          {recommendations.map((rec) => {
            const IconComponent = rec.icon
            return (
              <Card
                key={rec.id}
                className={`border bg-card transition-all hover:bg-card/80 ${rec.borderColor}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${rec.bgColor}`}
                    >
                      <IconComponent className={`h-6 w-6 ${rec.color}`} />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {rec.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={`capitalize ${priorityBadges[rec.priority]}`}
                            >
                              {rec.priority}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {rec.createdAt}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm font-medium text-primary">
                            <Sparkles className="h-3 w-3" />
                            {rec.confidence}%
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Confidence
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {rec.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {rec.crop}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Info className="h-3 w-3" />
                          {rec.impact}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3" />
                          {rec.timing}
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-border pt-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <ThumbsDown className="mr-1 h-4 w-4" />
                            Not Helpful
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-muted-foreground"
                          >
                            Dismiss
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Apply Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* History Sidebar */}
        <div className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-card-foreground">
                Recent Queries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {historyItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-secondary p-3 space-y-2"
                >
                  <p className="text-sm font-medium text-foreground">
                    {item.query}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.response}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-card-foreground">
                AI Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Insights Generated
                </span>
                <span className="font-semibold text-foreground">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Actions Applied
                </span>
                <span className="font-semibold text-primary">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Avg. Accuracy
                </span>
                <span className="font-semibold text-foreground">86%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Est. Savings
                </span>
                <span className="font-semibold text-primary">$4,250</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

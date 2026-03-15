import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Leaf,
  CloudSun,
  BarChart3,
  Brain,
  Droplets,
  Smartphone,
  ArrowRight,
  Check,
  Sprout,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background crop image - full coverage */}
        <div className="absolute inset-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crop-aH2ctBUJtsi7iFOHEe3kuUmdzUyWh1.jpeg"
            alt="Lush farm crops at sunset"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Subtle gradient overlay - only on left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        {/* Bottom gradient for smooth transition to next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />

        {/* Farmer on the left - positioned within the scene */}
        <div className="pointer-events-none absolute bottom-0 left-4 z-10 hidden lg:block lg:left-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ffarmer-zqtj5dOs0zYKQxn7Ipb04fYxu0vjrk.png"
            alt="Farmer overlooking crops"
            className="h-[600px] w-auto object-contain"
          />
        </div>

        {/* Drone in the air with spray/scan beam */}
        <div className="pointer-events-none absolute right-[15%] top-[15%] z-10 hidden md:block">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drone-POs3icGEIpvW4kLPDS3UWCui6X38cY.png"
            alt="Agricultural drone scanning crops"
            className="h-32 w-auto object-contain drop-shadow-2xl lg:h-40"
          />
          {/* Spray/scan beam effect */}
          <div
            className="absolute left-1/2 top-full -translate-x-1/2"
            style={{
              width: '200px',
              height: '300px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
            }}
          />
        </div>

        {/* Content - left aligned */}
        <div className="container relative z-20 mx-auto flex min-h-screen items-center px-4 py-32 lg:px-8">
          <div className="max-w-lg lg:ml-[280px]">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
              Precision Agriculture Platform
            </p>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              Farming{" "}
              <span className="text-amber-400">CRS</span>
            </h1>
            <p className="mb-8 max-w-md text-lg leading-relaxed text-white/90">
              Drone-powered crop reconnaissance that turns every acre into actionable insight. Monitor, analyse and optimise — from seedling to harvest.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/login">Get Started</Link>
              </Button>

              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white" asChild>
                <Link href="/demo">About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border/40 bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need to Farm Smarter
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Powerful tools and insights designed specifically for modern farmers
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<CloudSun className="h-6 w-6" />}
              title="Weather Monitoring"
              description="Real-time weather data and forecasts to help you plan irrigation and harvesting schedules."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Crop Analytics"
              description="Track growth stages, monitor health metrics, and analyze yield predictions for all your crops."
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6" />}
              title="AI Recommendations"
              description="Get intelligent suggestions for planting, fertilizing, and pest control based on your data."
            />
            <FeatureCard
              icon={<Droplets className="h-6 w-6" />}
              title="Soil Monitoring"
              description="Monitor soil moisture, pH levels, and nutrient content across your entire farm."
            />
            <FeatureCard
              icon={<Smartphone className="h-6 w-6" />}
              title="Mobile Access"
              description="Access your dashboard from anywhere with our responsive mobile interface."
            />
            <FeatureCard
              icon={<Leaf className="h-6 w-6" />}
              title="Sustainability Tracking"
              description="Monitor your environmental impact and optimize for sustainable farming practices."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-border/40 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Choose the plan that fits your farm size and needs
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <PricingCard
              title="Small Indoor Farm 0 – 50 m²"
              price="$3,100/month"
              description="Set Up Cost $31,100"
              features={[
                "Environmental Monitoring",
                "AI farming recommendations",
                "Alerts for temperature, humidity, and soil issues",
                "Automated initiation to each Alerts"
              ]}
            />
            <PricingCard
              title="Medium Indoor Farm 50 – 200 m²"
              price="$7,800/month"
              description="Setup Cost: $78,400"
              features={[
                "Environmental Monitoring",
                "AI farming recommendations",
                "Alerts for temperature, humidity, and soil issues",
                "Automated initiation to each Alerts"
              ]}
              highlighted
            />
            <PricingCard
              title=" Large Indoor Farm 200 m² +"
              price="$15,700/month"
              description="Setup Cost: $156,900"
              features={[
                "Environmental Monitoring",
                "AI farming recommendations",
                "Alerts for temperature, humidity, and soil issues",
                "Automated initiation to each Alerts"
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-muted/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Ready to Transform Your Farm?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Join thousands of farmers already using Farming CRS to increase yields and reduce costs.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Farming CRS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2026 Farming CRS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="border-border/40 bg-card/50">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  highlighted,
}: {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
}) {
  return (
    <Card
      className={`relative border-border/40 ${highlighted ? "border-primary bg-primary/5" : "bg-card/50"
        }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      <CardContent className="p-6">
        <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        <div className="mb-6">
          <span className="text-3xl font-bold text-foreground">{price}</span>
          {period && <span className="text-muted-foreground">{period}</span>}
        </div>
        <ul className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full" variant={highlighted ? "default" : "outline"} asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

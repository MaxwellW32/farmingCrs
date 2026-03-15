import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sprout, Map, Bell, BarChart } from "lucide-react"

export default function Page() {
    return (
        <main>
            {/* Hero */}
            <section className="border-b border-border/40 py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
                        See How Farming CRS Works
                    </h1>

                    <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                        Farming CRS helps farmers manage land, crops, and climate risks
                        from a single dashboard. Here's a quick look at how easy it is to
                        get started.
                    </p>

                    <Button size="lg" asChild>
                        <Link href="/login">
                            Try the Demo
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Steps */}
            <section className="py-24">
                <div className="container mx-auto grid max-w-5xl gap-12 px-4 md:grid-cols-2">

                    {/* Step 1 */}
                    <div className="rounded-lg border bg-card p-6">
                        <Sprout className="mb-4 h-8 w-8 text-primary" />

                        <h3 className="mb-2 text-xl font-semibold">
                            1. Create Your Farm Profile
                        </h3>

                        <p className="text-muted-foreground">
                            After signing up, farmers add their farm name and basic details.
                            This becomes the central place where all branches and crop
                            information are managed.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="rounded-lg border bg-card p-6">
                        <Map className="mb-4 h-8 w-8 text-primary" />

                        <h3 className="mb-2 text-xl font-semibold">
                            2. Add Farm Branches
                        </h3>

                        <p className="text-muted-foreground">
                            Many farmers manage multiple plots of land. With Farming CRS,
                            you can create branches for each location and map the land using
                            simple boundary pins.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="rounded-lg border bg-card p-6">
                        <BarChart className="mb-4 h-8 w-8 text-primary" />

                        <h3 className="mb-2 text-xl font-semibold">
                            3. Track Crops & Soil Health
                        </h3>

                        <p className="text-muted-foreground">
                            Each branch displays types of crops growing in that area, along with
                            insights about soil health, growth progress, and recommended
                            planting strategies.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="rounded-lg border bg-card p-6">
                        <Bell className="mb-4 h-8 w-8 text-primary" />

                        <h3 className="mb-2 text-xl font-semibold">
                            4. Receive Alerts & Predictions
                        </h3>

                        <p className="text-muted-foreground">
                            Farmers receive real-time alerts about weather events, climate
                            risks, and crop conditions. Farming CRS helps farmers make
                            proactive decisions to reduce crop loss and maximize yields.
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-border/40 bg-muted/30 py-24">
                <div className="container mx-auto px-4 text-center">

                    <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                        Smarter Farming Starts Here
                    </h2>

                    <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                        Farming CRS helps farmers stay ahead of climate changes,
                        improve crop yields, and manage their land more efficiently.
                    </p>

                    <Button size="lg" asChild>
                        <Link href="/login">
                            Create Your Farm Account
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                </div>
            </section>

        </main>
    )
}
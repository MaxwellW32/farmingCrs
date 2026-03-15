import { Wheat, Plus, Filter, Search } from "lucide-react"
import { BranchCard } from "@/components/farmer-profile/branch-card"
import { SidebarNav } from "@/components/farmer-profile/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/auth/auth"
import { getSpecificUser } from "@/serverFunctions/handleUsers"
import { getBranches } from "@/serverFunctions/handleBranches"
import AddBranch from "@/components/branches/AddBranch"

// Extended branch data with more details
// const branchesData: BranchDetail[] = [
//   {
//     id: "1",
//     name: "North Valley Farm",
//     location: "Yolo County, CA",
//     acres: 850,
//     crops: ["Organic Tomatoes", "Bell Peppers", "Squash", "Zucchini"],
//     status: "active",
//     irrigation: "Drip System",
//     employees: 18,
//     established: "2012",
//     soilType: "Loamy Clay",
//     climate: "Mediterranean",
//     lastHarvest: "Feb 2026",
//     nextPlanting: "Apr 2026",
//     yieldPerAcre: "22 tons",
//     image: "/north-valley-farm.jpg",
//   },
//   {
//     id: "2",
//     name: "River Delta Estate",
//     location: "Sacramento County, CA",
//     acres: 1200,
//     crops: ["Rice", "Corn", "Soybeans", "Sunflower"],
//     status: "active",
//     irrigation: "Flood Irrigation",
//     employees: 15,
//     established: "2008",
//     soilType: "Alluvial",
//     climate: "Warm Temperate",
//     lastHarvest: "Jan 2026",
//     nextPlanting: "Mar 2026",
//     yieldPerAcre: "8 tons",
//     image: "/river-delta-estate.jpg",
//   },
//   {
//     id: "3",
//     name: "Highland Orchards",
//     location: "Placer County, CA",
//     acres: 500,
//     crops: ["Almonds", "Walnuts", "Peaches", "Plums"],
//     status: "seasonal",
//     irrigation: "Micro-sprinkler",
//     employees: 8,
//     established: "2015",
//     soilType: "Sandy Loam",
//     climate: "Warm Summer",
//     lastHarvest: "Oct 2025",
//     nextPlanting: "Dormant",
//     yieldPerAcre: "3.5 tons",
//     image: "/highland-orchards.jpg",
//   },
//   {
//     id: "4",
//     name: "Southside Fields",
//     location: "San Joaquin County, CA",
//     acres: 300,
//     crops: ["Wheat", "Barley", "Oats"],
//     status: "developing",
//     irrigation: "Center Pivot",
//     employees: 6,
//     established: "2024",
//     soilType: "Silty Clay",
//     climate: "Hot Summer",
//     lastHarvest: "New Site",
//     nextPlanting: "May 2026",
//     yieldPerAcre: "TBD",
//     image: "/southside-fields.jpg",
//   },
// ]

export default async function BranchesPage() {
  const session = await auth()
  if (session === null) return (<p>no session</p>)

  const user = await getSpecificUser(session.user.id)
  if (user === undefined) return (<p>user not seen</p>)

  const branches = await getBranches({ userId: user.id })

  // Summary stats
  const summaryStats = {
    totalBranches: branches.length,
    totalAcres: 2,
    totalEmployees: 2,
    activeBranches: branches.length,
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <SidebarNav />
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Wheat className="size-8 text-primary" />
                  Farm Branches
                </h1>

                <p className="text-muted-foreground mt-2">
                  Manage and monitor all your agricultural operations across {summaryStats.totalBranches} locations
                </p>
              </div>
            </div>

            <AddBranch user={user} />

            {/* Summary Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-primary">{summaryStats.totalBranches}</p>
                <p className="text-sm text-muted-foreground">Total Branches</p>
              </div>
              <div className="text-center p-4 border-l border-border">
                <p className="text-3xl font-bold text-accent">{summaryStats.totalAcres.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Acres</p>
              </div>
              <div className="text-center p-4 border-l border-border">
                <p className="text-3xl font-bold text-foreground">{summaryStats.totalEmployees}</p>
                <p className="text-sm text-muted-foreground">Total Employees</p>
              </div>
              <div className="text-center p-4 border-l border-border">
                <p className="text-3xl font-bold text-primary">{summaryStats.activeBranches}</p>
                <p className="text-sm text-muted-foreground">Active Operations</p>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search branches by name, location, or crop..."
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary gap-2">
                <Filter className="size-4" />
                Filters
              </Button>
            </div>

            {/* Branches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map((eachBranch) => (
                <BranchCard key={eachBranch.id} branch={eachBranch} />
              ))}
            </div>

            {/* Empty State Placeholder for Add */}
            <div className="p-8 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="size-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Plus className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Add Another Branch</h3>
                <p className="text-sm text-muted-foreground">
                  Expand your agricultural network by registering a new farm location
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Farming CRS - Connecting Farmers, Growing Communities</p>
        </div>
      </footer>
    </div>
  )
}
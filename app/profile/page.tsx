import { ProfileHeader } from "@/components/farmer-profile/profile-header"
import { StatsCards } from "@/components/farmer-profile/stats-cards"
import { BranchesList } from "@/components/farmer-profile/branches-list"
import { AboutSection } from "@/components/farmer-profile/about-section"
import { SidebarNav } from "@/components/farmer-profile/sidebar-nav"
import { Tractor } from "lucide-react"

// Sample farmer data
const farmerData = {
  name: "James Whitfield",
  role: "Organic Crop Farmer & Agricultural Consultant",
  location: "Sacramento Valley, California",
  email: "james@whitfieldfarms.com",
  phone: "+1 (530) 555-0142",
  memberSince: "March 2019",
  avatar: "/placeholder-avatar.jpg",
  verified: true,
}

const statsData = {
  totalBranches: 4,
  totalAcres: 2850,
  employees: 47,
  yearlyYield: "12,500 tons",
}

const branchesData = [
  {
    id: "1",
    name: "North Valley Farm",
    location: "Yolo County, CA",
    acres: 850,
    crops: ["Organic Tomatoes", "Bell Peppers", "Squash"],
    status: "active" as const,
    irrigation: "Drip System",
  },
  {
    id: "2",
    name: "River Delta Estate",
    location: "Sacramento County, CA",
    acres: 1200,
    crops: ["Rice", "Corn", "Soybeans"],
    status: "active" as const,
    irrigation: "Flood Irrigation",
  },
  {
    id: "3",
    name: "Highland Orchards",
    location: "Placer County, CA",
    acres: 500,
    crops: ["Almonds", "Walnuts", "Peaches"],
    status: "seasonal" as const,
    irrigation: "Micro-sprinkler",
  },
  {
    id: "4",
    name: "Southside Fields",
    location: "San Joaquin County, CA",
    acres: 300,
    crops: ["Wheat", "Barley"],
    status: "developing" as const,
    irrigation: "Center Pivot",
  },
]

const aboutData = {
  bio: "With over 25 years of experience in sustainable agriculture, I have dedicated my life to cultivating quality crops while preserving the land for future generations. My journey began on my family's small farm in the Central Valley, and has since grown into a network of four thriving agricultural operations across Northern California.",
  specialties: [
    "Organic Farming",
    "Sustainable Agriculture",
    "Crop Rotation",
    "Water Conservation",
    "Soil Health Management",
  ],
  certifications: [
    "USDA Organic Certified",
    "California Certified Organic Farmers",
    "Regenerative Organic Certified",
    "Global G.A.P.",
  ],
}

export default function FarmerProfilePage() {
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
          <main className="space-y-8">
            {/* Profile Header */}
            <section className="pb-8 border-b border-border">
              <ProfileHeader farmer={farmerData} />
            </section>

            {/* Stats */}
            <section>
              <StatsCards stats={statsData} />
            </section>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
              {/* Branches */}
              <section>
                <BranchesList branches={branchesData} />
              </section>

              {/* About */}
              <section>
                <AboutSection about={aboutData} />
              </section>
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

import { ProfileHeader } from "@/components/farmer-profile/profile-header"
import { StatsCards } from "@/components/farmer-profile/stats-cards"
import { BranchesList } from "@/components/farmer-profile/branches-list"
import { AboutSection } from "@/components/farmer-profile/about-section"
import { SidebarNav } from "@/components/farmer-profile/sidebar-nav"
import { Tractor } from "lucide-react"
import { userType } from "@/types"
import { getSpecificUser } from "@/serverFunctions/handleUsers"
import { auth } from "@/auth/auth"
import defaultProfilePic from "@/public/defaultProfileImage.jpg"
import { getBranches } from "@/serverFunctions/handleBranches"
import { getTotalAcres } from "@/utility/contextHelpers"

// Sample farmer data
// const farmerData = {
//   name: "James Whitfield",
//   role: "Organic Crop Farmer & Agricultural Consultant",
//   location: "Sacramento Valley, California",
//   email: "james@whitfieldfarms.com",
//   phone: "+1 (530) 555-0142",
//   memberSince: "March 2019",
//   avatar: "/placeholder-avatar.jpg",
//   verified: true,
// }

// const statsData = {
//   totalBranches: 4,
//   totalAcres: 2850,
//   employees: 47,
//   yearlyYield: "12,500 tons",
// }

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

export default async function FarmerProfilePage() {
  const session = await auth()
  if (session === null) return (<p>no session</p>)

  const user = await getSpecificUser(session.user.id)
  if (user === undefined) return (<p>user not seen</p>)

  const branches = await getBranches({ userId: user.id })

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
              <ProfileHeader farmer={{
                avatar: user.image === null ? defaultProfilePic.src : user.image,
                email: user.email === null ? "johndoe@gmail.com" : user.email,
                location: "jamaica",
                memberSince: "1 day ago",
                name: user.name === null ? "john doe" : user.name,
                phone: "phone",
                role: "farmer",
                verified: true
              }} />
            </section>

            {/* Stats */}
            <section>
              <StatsCards stats={{
                totalBranches: branches.length,
                totalAcres: getTotalAcres(branches),
                yearlyYield: "12,500 tons",
                employees: 2,
              }} />
            </section>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
              {/* Branches */}
              <section>
                <BranchesList branches={branches} />
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
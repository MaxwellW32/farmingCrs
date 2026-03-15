import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader />
      <div className="flex flex-1">
        <SidebarNav />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SidebarNav } from "@/components/farmer-profile/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tractor, User, Bell, Shield, CreditCard, Globe, Trash2 } from "lucide-react"

export default function SettingsPage() {
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
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your account preferences and settings</p>
            </div>

            {/* Profile Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="size-5 text-primary" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                    <Input id="firstName" defaultValue="James" className="bg-secondary border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                    <Input id="lastName" defaultValue="Whitfield" className="bg-secondary border-border text-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input id="email" type="email" defaultValue="james@whitfieldfarms.com" className="bg-secondary border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (530) 555-0142" className="bg-secondary border-border text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-foreground">Location</Label>
                  <Input id="location" defaultValue="Sacramento Valley, California" className="bg-secondary border-border text-foreground" />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="size-5 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>Configure how you receive updates and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive updates about your farm activity via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Weather Alerts</p>
                    <p className="text-xs text-muted-foreground">Get notified about severe weather conditions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Harvest Reminders</p>
                    <p className="text-xs text-muted-foreground">Receive reminders for upcoming harvests</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Market Price Updates</p>
                    <p className="text-xs text-muted-foreground">Daily updates on crop market prices</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="size-5 text-primary" />
                  Security
                </CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-foreground">Current Password</Label>
                  <Input id="currentPassword" type="password" className="bg-secondary border-border text-foreground" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-foreground">New Password</Label>
                    <Input id="newPassword" type="password" className="bg-secondary border-border text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="bg-secondary border-border text-foreground" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Update Password</Button>
              </CardContent>
            </Card>

            {/* Billing Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="size-5 text-primary" />
                  Billing & Subscription
                </CardTitle>
                <CardDescription>Manage your subscription and payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Pro Plan</p>
                    <p className="text-xs text-muted-foreground">$49/month - Unlimited branches, advanced analytics</p>
                  </div>
                  <Button variant="outline" className="border-border text-foreground hover:bg-secondary">Manage Plan</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-muted rounded-lg flex items-center justify-center">
                      <CreditCard className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/2027</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-border text-foreground hover:bg-secondary">Update</Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="size-5 text-primary" />
                  Preferences
                </CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Language</p>
                    <p className="text-xs text-muted-foreground">Select your preferred language</p>
                  </div>
                  <select className="bg-secondary border border-border rounded-md px-3 py-1.5 text-sm text-foreground">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Units of Measurement</p>
                    <p className="text-xs text-muted-foreground">Choose acres or hectares</p>
                  </div>
                  <select className="bg-secondary border border-border rounded-md px-3 py-1.5 text-sm text-foreground">
                    <option>Acres</option>
                    <option>Hectares</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Timezone</p>
                    <p className="text-xs text-muted-foreground">Set your local timezone</p>
                  </div>
                  <select className="bg-secondary border border-border rounded-md px-3 py-1.5 text-sm text-foreground">
                    <option>Pacific Time (PT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Central Time (CT)</option>
                    <option>Eastern Time (ET)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-card border-destructive/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                  <Trash2 className="size-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible and destructive actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Delete Account</p>
                    <p className="text-xs text-muted-foreground">Permanently delete your account and all associated data</p>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
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

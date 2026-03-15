"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Settings,
  User,
  Bell,
  Shield,
  MapPin,
  Wifi,
  Database,
  Palette,
  Globe,
  Save,
  Upload,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const notificationSettings = [
  {
    id: "weather_alerts",
    name: "Weather Alerts",
    description: "Get notified about severe weather conditions",
    enabled: true,
  },
  {
    id: "irrigation_reminders",
    name: "Irrigation Reminders",
    description: "Reminders for scheduled irrigation tasks",
    enabled: true,
  },
  {
    id: "crop_updates",
    name: "Crop Status Updates",
    description: "Updates about crop growth stages and health",
    enabled: true,
  },
  {
    id: "ai_recommendations",
    name: "AI Recommendations",
    description: "New insights and recommendations from AI",
    enabled: false,
  },
  {
    id: "system_updates",
    name: "System Updates",
    description: "Notifications about app updates and maintenance",
    enabled: false,
  },
]

const connectedDevices = [
  { name: "Soil Moisture Sensor #1", status: "connected", lastSync: "2 min ago" },
  { name: "Soil Moisture Sensor #2", status: "connected", lastSync: "5 min ago" },
  { name: "Weather Station", status: "connected", lastSync: "1 min ago" },
  { name: "Irrigation Controller", status: "connected", lastSync: "3 min ago" },
  { name: "Greenhouse Sensor", status: "offline", lastSync: "2 hours ago" },
]

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="space-y-6 lg:col-span-2">
          {/* Profile Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Manage your personal information and farm details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" className="bg-secondary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john@example.com"
                    className="bg-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="bg-secondary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input
                  id="farmName"
                  defaultValue="Green Valley Farm"
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmAddress">Farm Address</Label>
                <Textarea
                  id="farmAddress"
                  defaultValue="1234 Rural Route 5, Springfield, IL 62701"
                  className="bg-secondary"
                  rows={2}
                />
              </div>

              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure how you receive alerts and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between rounded-lg bg-secondary p-4"
                >
                  <div>
                    <p className="font-medium text-foreground">{setting.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch defaultChecked={setting.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <Palette className="h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Temperature Unit</Label>
                  <Select defaultValue="celsius">
                    <SelectTrigger className="bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celsius">Celsius (°C)</SelectItem>
                      <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Area Unit</Label>
                  <Select defaultValue="acres">
                    <SelectTrigger className="bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                      <SelectItem value="sqmeters">Square Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="cst">
                    <SelectTrigger className="bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Connected Devices */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <Wifi className="h-5 w-5" />
                Connected Devices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {connectedDevices.map((device) => (
                <div
                  key={device.name}
                  className="flex items-center justify-between rounded-lg bg-secondary p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {device.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last sync: {device.lastSync}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      device.status === "connected"
                        ? "bg-primary/20 text-primary"
                        : "bg-destructive/20 text-destructive"
                    }
                  >
                    {device.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Add New Device
              </Button>
            </CardContent>
          </Card>

          {/* Data & Storage */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <Database className="h-5 w-5" />
                Data & Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Storage Used
                </span>
                <span className="font-semibold text-foreground">2.4 GB</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary"
                  style={{ width: "48%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                2.4 GB of 5 GB used
              </p>
              <Button variant="outline" className="w-full">
                Manage Storage
              </Button>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Active Sessions
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="space-y-2 text-center">
                <p className="font-semibold text-foreground">AgriSmart</p>
                <p className="text-sm text-muted-foreground">Version 2.1.0</p>
                <div className="flex justify-center gap-4 pt-2 text-xs text-muted-foreground">
                  <button className="hover:text-foreground">Terms</button>
                  <button className="hover:text-foreground">Privacy</button>
                  <button className="hover:text-foreground">Support</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { MapPin, Mail, Phone, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface FarmerInfo {
  name: string
  role: string
  location: string
  email: string
  phone: string
  memberSince: string
  avatar: string
  verified: boolean
}

export function ProfileHeader({ farmer }: { farmer: FarmerInfo }) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <Avatar className="size-32 border-4 border-primary/30">
        <AvatarImage src={farmer.avatar} alt={farmer.name} />
        <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
          {farmer.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold tracking-tight text-balance">{farmer.name}</h1>
          {farmer.verified && (
            <Badge className="bg-primary text-primary-foreground">Verified Farmer</Badge>
          )}
        </div>

        <p className="text-xl text-muted-foreground mb-6">{farmer.role}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            <span>{farmer.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-primary" />
            <span>{farmer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4 text-primary" />
            <span>{farmer.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-primary" />
            <span>Member since {farmer.memberSince}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

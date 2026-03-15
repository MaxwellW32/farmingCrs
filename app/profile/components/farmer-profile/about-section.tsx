"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AboutData {
  bio: string
  specialties: string[]
  certifications: string[]
}

export function AboutSection({ about }: { about: AboutData }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl">About</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground leading-relaxed">{about.bio}</p>
        
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {about.specialties.map((specialty) => (
              <Badge key={specialty} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {about.certifications.map((cert) => (
              <Badge key={cert} variant="outline" className="border-accent text-accent">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

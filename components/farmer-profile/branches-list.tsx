"use client"

import Link from "next/link"
import { MapPin, Wheat, Droplets, Sun, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { branchType, cropType } from "@/types"
import React, { useEffect, useState } from "react"
import { consoleAndToastError } from "@/utility/consoleErrorWithToast"
import { getCrops } from "@/serverFunctions/handleCrops"
import { coordsToString, getSizeFromCoords } from "@/utility/contextHelpers"

// interface Branch {
//   id: string
//   name: string
//   location: string
//   acres: number
//   crops: string[]
//   status: "active" | "seasonal" | "developing"
//   irrigation: string
// }

export function BranchesList({ branches }: { branches: branchType[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground"
      case "seasonal":
        return "bg-accent text-accent-foreground"
      case "developing":
        return "bg-muted text-muted-foreground"
    }
  }

  const [crops, cropsSet] = useState<cropType[] | undefined>()

  //get crops
  useEffect(() => {
    const search = async () => {
      try {
        const seenCrops = await getCrops({})
        cropsSet(seenCrops)

      } catch (error) {
        consoleAndToastError(error)
      }
    }
    search()

  }, [])

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Wheat className="size-6 text-primary" />
          Farm Branches
        </CardTitle>
        <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
          <Link href="/profile/branches">
            View All
            <ArrowRight className="size-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {branches.length === 0 && <p>no branches yet</p>}

        {branches.map((branch) => (
          <div
            key={branch.id}
            className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{branch.name}</h3>
                  <Badge className={getStatusColor("active")}>
                    {"active"}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="size-4" />
                  <span className="text-sm">{coordsToString(branch.boundingPins[0].coordinates)}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {crops === undefined ? (<p>loading crops</p>) : (
                    <>
                      {branch.cropIds.map((eachcropId) => {
                        const foundCrop = crops.find(eachCrop => eachCrop.id === eachcropId.referencedCropId)
                        return (
                          <React.Fragment key={eachcropId.id}>
                            {foundCrop === undefined ? (<p>not seeing crop</p>) : (
                              <Badge variant="outline" className="border-border text-muted-foreground">
                                {foundCrop.name}
                              </Badge>
                            )}

                          </React.Fragment>
                        )
                      })}
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-row sm:flex-col gap-4 sm:gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sun className="size-4 text-accent" />
                  <span>{getSizeFromCoords(branch.boundingPins).acres.toFixed(2)} acres</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="size-4 text-primary" />
                  <span>Micro-sprinkler</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

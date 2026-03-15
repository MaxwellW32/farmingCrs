"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { GoogleMap, Marker, Polygon, useLoadScript } from "@react-google-maps/api"
import { newBranchType, userType } from "@/types"
import { addBranch } from "@/serverFunctions/handleBranches"
import { useRouter } from "next/navigation"

const mapContainerStyle = {
    width: "100%",
    height: "450px"
}

const center = {
    lat: 18.1096,
    lng: -77.2975
}

export default function AddBranch({ user }: { user: userType }) {
    const router = useRouter()
    const [addingBranch, setAddingBranch] = useState(false)
    const [name, setName] = useState("")
    const [pins, setPins] = useState<{ lat: number; lng: number }[]>([])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!
    })

    console.log(`$isLoaded`, isLoaded);

    function createInitialSquare(lat: number, lng: number) {
        const offset = 0.001 // ~100m

        return [
            { lat: lat + offset, lng: lng - offset },
            { lat: lat + offset, lng: lng + offset },
            { lat: lat - offset, lng: lng + offset },
            { lat: lat - offset, lng: lng - offset }
        ]
    }

    function handleMapClick(e: google.maps.MapMouseEvent) {
        if (!e.latLng) return

        const lat = e.latLng.lat()
        const lng = e.latLng.lng()

        if (pins.length === 0) {
            setPins(createInitialSquare(lat, lng))

        } else {
            setPins([...pins, { lat, lng }])
        }
    }

    function updatePin(index: number, lat: number, lng: number) {
        const updated = [...pins]
        updated[index] = { lat, lng }
        setPins(updated)
    }

    async function handleSubmit() {
        if (pins.length === 0) return

        const centerLat =
            pins.reduce((sum, p) => sum + p.lat, 0) / pins.length
        const centerLng =
            pins.reduce((sum, p) => sum + p.lng, 0) / pins.length

        const newBranch: newBranchType = {
            location: `${centerLat},${centerLng}`,
            boundingPins: pins.map((p) => ({
                coordinates: {
                    latitude: p.lat,
                    longitude: p.lng
                }
            })),
            branchEvents: [],
            cropIds: [],
            name: name,
            userId: user.id,
        }

        console.log(`$newBranch`, newBranch);
        await addBranch(newBranch)

        setAddingBranch(false)
        setPins([])

        //refresh
        router.refresh()
    }

    return (
        <div>
            <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                onClick={() => setAddingBranch(prev => !prev)}
            >
                <Plus className="size-4" />
                {addingBranch ? "minimize" : "Add New Branch"}
            </Button>

            {addingBranch && (
                <div className="mt-6 space-y-4 border p-6 rounded-lg bg-card">
                    <input
                        placeholder="Branch Name"
                        className="w-full border rounded px-3 py-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {isLoaded && (
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={15}
                            center={center}
                            onClick={handleMapClick}
                        >

                            {/* Boundary Polygon */}
                            {pins.length > 2 && (
                                <Polygon
                                    path={pins}
                                    options={{
                                        fillColor: "#4ade80",
                                        fillOpacity: 0.25,
                                        strokeColor: "#16a34a",
                                        strokeWeight: 2
                                    }}
                                />
                            )}

                            {/* Draggable Pins */}
                            {pins.map((pin, i) => (
                                <Marker
                                    key={i}
                                    position={pin}
                                    draggable
                                    onDragEnd={(e) => {
                                        if (!e.latLng) return
                                        updatePin(i, e.latLng.lat(), e.latLng.lng())
                                    }}
                                />
                            ))}
                        </GoogleMap>
                    )}

                    <p className="text-sm text-muted-foreground">
                        Click map to create or add boundary points. Drag markers to adjust
                        the land shape.
                    </p>

                    <Button onClick={handleSubmit}>
                        Save Branch
                    </Button>
                </div>
            )}
        </div>
    )
}
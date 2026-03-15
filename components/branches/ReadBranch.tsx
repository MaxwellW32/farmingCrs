"use client"
import { branchSchema, branchType, cropType, monitorEventType, recommendationType } from '@/types'
import { consoleAndToastError } from '@/utility/consoleErrorWithToast'
import { useEffect, useRef, useState } from 'react'
import { GoogleMap, Marker, Polygon, useLoadScript, Circle } from "@react-google-maps/api"
import styles from "./styles.module.css"
import { getCrops } from '@/serverFunctions/handleCrops'
import { updateBranch } from '@/serverFunctions/handleBranches'
import { getCropIcon } from '@/lib/crop'
import { generateMonitorEvents, makeCropRecommendations } from '@/serverFunctions/handleGpt'
import toast from 'react-hot-toast'

export default function ReadBranch({ seenBranch }: { seenBranch: branchType }) {
    const [branch, branchSet] = useState({ ...seenBranch })

    const syncBranchToServerDebounce = useRef<{ [key: string]: NodeJS.Timeout | undefined }>({})
    const [syncBranchToServerKeys, syncBranchToServerKeysSet] = useState<(keyof branchType)[] | undefined>(undefined)

    const [rec, recSet] = useState<unknown | undefined>(undefined)
    const [showingSideMenu, showingSideMenuSet] = useState(false)
    const [pins,] = useState(() => {
        return branch.boundingPins.map(each => {
            return {
                lat: each.coordinates.latitude,
                lng: each.coordinates.longitude
            }
        })
    })

    const [crops, cropsSet] = useState<cropType[]>([])
    const [search, setSearch] = useState("")
    const [selectedCrop, selectedCropSet] = useState<cropType | null>(null)

    const [recommendations, recommendationsSet] = useState<recommendationType[]>([])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
        libraries: ["geometry"]
    })

    const mapContainerStyle = {
        width: "100%",
        height: "100%"
    }

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

    //generate monitor events - as an example
    useEffect(() => {
        const search = async () => {
            try {
                //get api test
                const newMonitorEvents = await generateMonitorEvents({ branch })

                branchSet(prev => ({
                    ...prev,
                    branchEvents: [...newMonitorEvents.newMonitorEvents]
                }))

                console.log(`$newMonitorEvents`, newMonitorEvents);

                //sync to server
                syncBranchToServerKeysSet(["branchEvents"])

            } catch (error) {
                consoleAndToastError(error)
            }
        }

        search()

    }, [])

    //test api
    useEffect(() => {
        const search = async () => {
            try {
                //get api test
                const base = process.env.NEXT_PUBLIC_PY_API;
                console.log(`$base`, base);

                const pin = branch.boundingPins[0]

                const rcCropsRes = await fetch(
                    `${base}/recommendations?lat=${pin.coordinates.latitude}&lon=${pin.coordinates.latitude}`
                );
                const recCrops = await rcCropsRes.json()
                console.log(`$recCrops`, recCrops);

                recSet(recCrops)

            } catch (error) {
                consoleAndToastError(error)
            }
        }

        search()

    }, [])

    //sync branch to server
    useEffect(() => {
        try {
            if (syncBranchToServerKeys === undefined) return

            const combinedKeyString = syncBranchToServerKeys.length === 0 ? "general" : syncBranchToServerKeys.join("-")

            if (syncBranchToServerDebounce.current[combinedKeyString]) clearTimeout(syncBranchToServerDebounce.current[combinedKeyString])
            syncBranchToServerDebounce.current[combinedKeyString] = setTimeout(async () => {
                let validatedBranch: Partial<branchType>

                if (syncBranchToServerKeys.length === 0) {
                    validatedBranch = branchSchema.parse(branch)

                } else {
                    const pickShape = Object.fromEntries(
                        syncBranchToServerKeys.map((key) => [key, true])
                    ) as Record<keyof branchType, true>

                    //@ts-expect-error type
                    const reducedSchema = branchSchema.pick(pickShape)
                    validatedBranch = reducedSchema.parse(branch)
                }

                //sync to server
                await updateBranch(branch.id, validatedBranch)
                console.log(`$sent branch update to server`)
            }, 5000)

        } catch (error) {
            consoleAndToastError(error)
        }

    }, [syncBranchToServerKeys])

    const filteredCrops = crops.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    function addCrop(lat: number, lng: number) {
        if (selectedCrop === null) return

        const newCrop = {
            id: crypto.randomUUID(),
            referencedCropId: selectedCrop.id,
            corrdinates: {
                latitude: lat,
                longitude: lng
            }
        }

        //ensure in field
        if (!isInsideField(newCrop.corrdinates.latitude, newCrop.corrdinates.longitude)) return

        branchSet({
            ...branch,
            cropIds: [...branch.cropIds, newCrop]
        })

        //server sync
        syncBranchToServerKeysSet(["cropIds"])
        console.log(`$branch`, branch);

        console.log(`$added`);
    }

    function updateCropPosition(index: number, lat: number, lng: number) {
        const updated = [...branch.cropIds]

        updated[index] = {
            ...updated[index],
            corrdinates: {
                latitude: lat,
                longitude: lng
            }
        }

        branchSet({
            ...branch,
            cropIds: updated
        })

        //server sync
        syncBranchToServerKeysSet(["cropIds"])
    }

    function isInsideField(lat: number, lng: number) {
        if (!window.google) return false

        const polygon = new google.maps.Polygon({
            paths: branch.boundingPins.map((p) => ({
                lat: p.coordinates.latitude,
                lng: p.coordinates.longitude
            }))
        })

        const point = new google.maps.LatLng(lat, lng)

        return google.maps.geometry.poly.containsLocation(point, polygon)
    }

    function handleMapClick(e: google.maps.MapMouseEvent) {
        console.log(`$hi`);
        if (!e.latLng) return

        const lat = e.latLng.lat()
        const lng = e.latLng.lng()

        console.log(`$here`);

        // console.log(`$isInsideField`, isInsideField(lat, lng));

        // if (!isInsideField(lat, lng)) {
        //     alert("Crop must be inside branch boundary")
        //     return
        // }

        addCrop(lat, lng)
    }

    function getMonitorStyle(event: monitorEventType) {
        switch (event.typeObj.type) {
            case "temperature":
                if (event.typeObj.temperature > 35) {
                    return { fillColor: "#ef4444", strokeColor: "#b91c1c" } // hot
                }
                return { fillColor: "#f97316", strokeColor: "#c2410c" }

            case "humidity":
                return { fillColor: "#3b82f6", strokeColor: "#1d4ed8" }

            case "soil-condition":
                return { fillColor: "#a16207", strokeColor: "#713f12" }

            case "elevation":
                return { fillColor: "#eab308", strokeColor: "#a16207" }
        }
    }

    return (
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", overflow: "auto", zIndex: 0 }}>
            <div className={styles.navButtonRow} style={{}}>
                <button //nav settings row
                    onClick={() => {
                        showingSideMenuSet(prev => !prev)
                    }}
                >
                    <svg className='svgIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" /></svg>
                </button>
            </div>

            <div style={{ display: "grid", overflow: "auto", position: "relative", gridTemplateRows: "1fr" }}>
                <div className={styles.sideMenu} style={{ display: showingSideMenu ? "grid" : "none", }}>
                    <p>{branch.name}</p>
                    {/* main nav */}
                    <h3 className="font-semibold">Crops</h3>

                    <input
                        placeholder="Search crops..."
                        className="w-full border rounded px-2 py-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="max-h-48 overflow-y-auto border rounded">
                        {filteredCrops.map((crop) => (
                            <div
                                key={crop.id}
                                className={`px-3 py-2 cursor-pointer hover:bg-muted ${selectedCrop?.id === crop.id ? "bg-muted" : ""
                                    }`}
                                onClick={() => {
                                    if (selectedCrop !== null && selectedCrop.id === crop.id) {
                                        selectedCropSet(null)
                                    } else {
                                        selectedCropSet(crop)
                                    }
                                }}
                            >
                                {crop.name}
                            </div>
                        ))}
                    </div>

                    {selectedCrop && (
                        <p className="text-sm text-muted-foreground">
                            Selected crop: {selectedCrop.name}
                        </p>
                    )}

                    <p className="text-xs text-muted-foreground">
                        Click the map to place crops
                    </p>

                    <div className="space-y-6 mt-8">
                        <button
                            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-medium hover:bg-primary/90 transition shadow-sm"
                            onClick={async () => {
                                toast.loading("Generating recommendations...")

                                const cropsInArea = crops.filter(eachCrop =>
                                    branch.cropIds.some(eachBranchCrop => eachBranchCrop.referencedCropId === eachCrop.id)
                                )

                                const newRecommendations = await makeCropRecommendations({
                                    branch,
                                    crops: cropsInArea,
                                    monitorEvents: branch.branchEvents
                                })

                                recommendationsSet(prev => [
                                    ...prev,
                                    ...newRecommendations.newRecommendations
                                ])
                            }}
                        >
                            Generate Recommendations
                        </button>

                        {recommendations.length > 0 && (
                            <div className="grid gap-4 md:grid-cols-2">
                                {recommendations.map(eachRec => {

                                    const seenCrop = crops.find(c => c.id === eachRec.cropId)
                                    if (!seenCrop) return null

                                    const type = eachRec.typeObj.type

                                    const badgeColors: Record<string, string> = {
                                        elevation: "bg-yellow-100 text-yellow-700",
                                        "soil-condition": "bg-amber-100 text-amber-700",
                                        humidity: "bg-blue-100 text-blue-700",
                                        temperature: "bg-red-100 text-red-700"
                                    }

                                    return (
                                        <div
                                            key={eachRec.id}
                                            className="border border-border/40 rounded-lg p-5 bg-card shadow-sm space-y-3"
                                        >
                                            {/* Header */}
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-lg text-foreground">
                                                    {seenCrop.name}
                                                </h4>

                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColors[type]}`}
                                                >
                                                    {type.replace("-", " ")}
                                                </span>
                                            </div>

                                            {/* Recommendation */}
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {eachRec.recommendation}
                                            </p>

                                            {/* Adjustment Button (if applicable) */}
                                            {type === "humidity" && (
                                                <button
                                                    className="mt-2 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
                                                    onClick={() => {
                                                        branchSet(prevBranch => {
                                                            const newBranch = { ...prevBranch }

                                                            //@ts-expect-error type
                                                            newBranch.branchEvents = newBranch.branchEvents.map(eachBE => {

                                                                if (eachBE.typeObj.type === "humidity") {
                                                                    return {
                                                                        ...eachBE,
                                                                        typeObj: {
                                                                            ...eachBE.typeObj,
                                                                            humidity: `${eachRec.typeObj.recommendedVal}`
                                                                        }
                                                                    }
                                                                }

                                                                return eachBE
                                                            })

                                                            return newBranch
                                                        })

                                                    }}
                                                >
                                                    Apply Recommended Humidity
                                                </button>

                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                        )}
                    </div>
                </div>

                <div>
                    {isLoaded && (
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={25}
                            center={{
                                lat: branch.boundingPins[0].coordinates.latitude,
                                lng: branch.boundingPins[0].coordinates.longitude,
                            }}
                            onClick={handleMapClick}
                        >
                            {/* Boundary Polygon */}
                            {branch.boundingPins.length > 2 && (
                                <div style={{ pointerEvents: "none" }}>
                                    <Polygon
                                        path={pins}
                                        options={{
                                            fillColor: "#4ade80",
                                            fillOpacity: 0.25,
                                            strokeColor: "#16a34a",
                                            strokeWeight: 2,
                                            clickable: false
                                        }}
                                    />
                                </div>
                            )}

                            {/* markers */}
                            {pins.map((pin, i) => (
                                <Marker
                                    key={i}
                                    position={pin}
                                    zIndex={999}
                                />
                            ))}

                            {/* crop markers */}
                            {branch.cropIds.map((eachCropIdObj, cropIndex) => {
                                const seenCrop = crops.find(eachCropFind => eachCropFind.id === eachCropIdObj.referencedCropId)
                                if (seenCrop === undefined) return null

                                const seenCropIcon = getCropIcon(seenCrop.name)

                                return (
                                    <Marker
                                        key={eachCropIdObj.id}
                                        position={{
                                            lat: eachCropIdObj.corrdinates.latitude,
                                            lng: eachCropIdObj.corrdinates.longitude
                                        }}
                                        zIndex={1000}
                                        label={seenCropIcon === undefined ? undefined : {
                                            text: getCropIcon(seenCrop.name) ?? "",
                                            fontSize: "20px"
                                        }}
                                        draggable
                                        onDragEnd={(e) => {
                                            if (!e.latLng) return

                                            updateCropPosition(cropIndex, e.latLng.lat(), e.latLng.lng())
                                        }}
                                    />
                                )
                            })}


                            {branch.branchEvents.map((event) => {

                                const style = getMonitorStyle(event)

                                return (
                                    <Circle
                                        key={event.id}
                                        center={{
                                            lat: event.coordinates.latitude,
                                            lng: event.coordinates.longitude
                                        }}
                                        radius={event.size}
                                        options={{
                                            fillColor: style.fillColor,
                                            fillOpacity: 0.35,
                                            strokeColor: style.strokeColor,
                                            strokeWeight: 2,
                                            clickable: true
                                        }}
                                    />
                                )
                            })}
                        </GoogleMap>
                    )}
                </div>
            </div>
        </div>
    )
}
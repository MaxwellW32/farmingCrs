"use client"
import { branchSchema, branchType, cropType, branchEventType, recommendationType } from '@/types'
import { consoleAndToastError } from '@/utility/consoleErrorWithToast'
import { useEffect, useRef, useState } from 'react'
import { GoogleMap, Marker, Polygon, useLoadScript, Circle } from "@react-google-maps/api"
import styles from "./styles.module.css"
import { getCrops } from '@/serverFunctions/handleCrops'
import { updateBranch } from '@/serverFunctions/handleBranches'
import { getCropIcon } from '@/lib/crop'
import { generateBranchEvents, makeCropRecommendations } from '@/serverFunctions/handleGpt'
import toast from 'react-hot-toast'
import { RealtimeSession } from '@openai/agents/realtime';
import { RealtimeAgent } from '@openai/agents/realtime';
import { makeEKKey } from '@/serverFunctions/handleEkKey'
import { getCropsSeenInBranch, getSizeFromCoords } from '@/utility/contextHelpers'

export default function ReadBranch({ seenBranch }: { seenBranch: branchType }) {
    const [branch, branchSet] = useState({ ...seenBranch })

    const syncBranchToServerDebounce = useRef<{ [key: string]: NodeJS.Timeout | undefined }>({})
    const [syncBranchToServerKeys, syncBranchToServerKeysSet] = useState<(keyof branchType)[] | undefined>(undefined)

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
    const [audioSession, audioSessionSet] = useState<RealtimeSession | null>(null)

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

    //generate branch events - as an example
    useEffect(() => {
        const search = async () => {
            try {
                //only run if no branch events
                if (branch.branchEvents.length !== 0) return

                //get api test
                const newBranchEvents = await generateBranchEvents({ branch })

                branchSet(prev => ({
                    ...prev,
                    branchEvents: [...newBranchEvents.newBranchEvents]
                }))

                console.log(`$newBranchEvents`, newBranchEvents);

                //sync to server
                syncBranchToServerKeysSet(["branchEvents"])

            } catch (error) {
                consoleAndToastError(error)
            }
        }

        search()

    }, [])

    //crop suggestions python api
    useEffect(() => {
        const search = async () => {
            try {
                //get api test
                const base = process.env.NEXT_PUBLIC_PY_API;

                const pin = branch.boundingPins[0]

                const rcCropsRes = await fetch(`${base}/recommendations?lat=${pin.coordinates.latitude}&lon=${pin.coordinates.longitude}`);
                const recCrops = await rcCropsRes.json()
                console.log(`$recCrops`, recCrops);

                toast.success(`${recCrops.suggestions[Math.floor(Math.random() * recCrops.suggestions.length)]["crop_name"]} would be good in this area!`)

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

    function getMonitorStyle(event: branchEventType) {
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
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <p>{branch.name}</p>

                        <button style={{}}
                            onClick={async () => {
                                if (audioSession !== null) {
                                    //close session
                                    audioSession.close()

                                    //reset
                                    audioSessionSet(null)

                                } else {
                                    const cropsInBranch = getCropsSeenInBranch(crops, branch)

                                    console.log(`$cropsInBranch`, cropsInBranch);

                                    //start session
                                    const agent = new RealtimeAgent({
                                        name: "Assistant",
                                        instructions: `Talk in english at all times. You are a helpful assistant. Please give advice on what crops you'd recommend planting in my areas based on all the stats.

Latitude: ${seenBranch.boundingPins[0].coordinates.latitude}
Longitude: ${seenBranch.boundingPins[0].coordinates.longitude}

All Crops:
${JSON.stringify(crops)}

Crops in this farm branch:
${JSON.stringify(cropsInBranch)}

Look at any branch events as active alerts suggest ways to handle them.

Branch Size:
${getSizeFromCoords(seenBranch.boundingPins).metersSquared.toFixed(2)} meters squared.

Branch Events:
${JSON.stringify(seenBranch.branchEvents)}`,
                                        voice: "coral"
                                    })

                                    const session = new RealtimeSession(agent, {
                                        model: "gpt-realtime"
                                    })

                                    const seenEkKey = await makeEKKey()

                                    await session.connect({ apiKey: seenEkKey })

                                    // listening to the history_updated event
                                    session.on('history_updated', (history) => {
                                        // returns the full history of the session
                                        console.log(history);
                                    });

                                    session.on("audio_start", (hey) => {
                                    });

                                    //set
                                    audioSessionSet(session)
                                }
                            }}
                        >
                            <svg className='svgIcon' fill={audioSession ? "green" : ""} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C267 64 224 107 224 160L224 288C224 341 267 384 320 384C373 384 416 341 416 288L416 160C416 107 373 64 320 64zM176 248C176 234.7 165.3 224 152 224C138.7 224 128 234.7 128 248L128 288C128 385.9 201.3 466.7 296 478.5L296 528L248 528C234.7 528 224 538.7 224 552C224 565.3 234.7 576 248 576L392 576C405.3 576 416 565.3 416 552C416 538.7 405.3 528 392 528L344 528L344 478.5C438.7 466.7 512 385.9 512 288L512 248C512 234.7 501.3 224 488 224C474.7 224 464 234.7 464 248L464 288C464 367.5 399.5 432 320 432C240.5 432 176 367.5 176 288L176 248z" /></svg>
                        </button>
                    </div>

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

                                const cropsInBranch = getCropsSeenInBranch(crops, branch)

                                const newRecommendations = await makeCropRecommendations({
                                    branch,
                                    crops: cropsInBranch,
                                    branchEvents: branch.branchEvents
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
                            <div style={{ display: "grid", alignContent: "flex-start", gap: "1rem" }}>
                                {recommendations.map(eachRec => {
                                    const seenCrop = crops.find(c => c.id === eachRec.cropId)
                                    if (!seenCrop) return null

                                    const badgeColors: Record<string, string> = {
                                        elevation: "bg-yellow-100 text-yellow-700",
                                        "soil-condition": "bg-amber-100 text-amber-700",
                                        humidity: "bg-blue-100 text-blue-700",
                                        temperature: "bg-red-100 text-red-700"
                                    }

                                    return (
                                        <div key={eachRec.id}
                                            className="border border-border/40 rounded-lg p-5 bg-card shadow-sm space-y-3"
                                        >
                                            {/* Header */}
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-lg text-foreground">
                                                    {seenCrop.name}
                                                </h4>

                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColors[eachRec.typeObj.type]}`}
                                                >
                                                    {eachRec.typeObj.type.replace("-", " ")}
                                                </span>
                                            </div>

                                            {/* Recommendation */}
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {eachRec.recommendation}
                                            </p>

                                            {/* Adjustment Button (if applicable) */}
                                            <button className="mt-2 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
                                                onClick={() => {
                                                    branchSet(prevBranch => {
                                                        const newBranch = { ...prevBranch }

                                                        newBranch.branchEvents = newBranch.branchEvents.map(eachBE => {
                                                            //react
                                                            eachBE = { ...eachBE }

                                                            //react
                                                            eachBE.typeObj = { ...eachBE.typeObj }

                                                            if (eachBE.typeObj.type === "humidity" && eachRec.typeObj.type === "humidity") {
                                                                eachBE.typeObj.humidity = eachRec.typeObj.recommendedVal

                                                            } if (eachBE.typeObj.type === "elevation" && eachRec.typeObj.type === "elevation") {
                                                                eachBE.typeObj.elevation = eachRec.typeObj.recommendedVal

                                                            } if (eachBE.typeObj.type === "soil-condition" && eachRec.typeObj.type === "soil-condition") {
                                                                eachBE.typeObj.status = eachRec.typeObj.recommendedVal

                                                            } if (eachBE.typeObj.type === "temperature" && eachRec.typeObj.type === "temperature") {
                                                                eachBE.typeObj.temperature = eachRec.typeObj.recommendedVal
                                                            }

                                                            return eachBE
                                                        })

                                                        return newBranch
                                                    })

                                                }}
                                            >
                                                Apply Recommended
                                            </button>
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
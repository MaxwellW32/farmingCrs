import { boundingPinType, branchType, coordinatesType, cropType } from "@/types";

export function coordsToString(coordinates: coordinatesType) {
    return `${coordinates.latitude}.${coordinates.longitude}`
}

export function getSizeFromCoords(boundingPins: boundingPinType[]) {
    const R = 6378137 // Earth radius in meters
    const toRad = (deg: number) => (deg * Math.PI) / 180

    const avgLat =
        boundingPins.reduce((sum, p) => sum + p.coordinates.latitude, 0) / boundingPins.length

    const coords = boundingPins.map(p => {
        const x = R * toRad(p.coordinates.longitude) * Math.cos(toRad(avgLat))
        const y = R * toRad(p.coordinates.latitude)
        return { x, y }
    })

    let area = 0

    for (let i = 0; i < coords.length; i++) {
        const j = (i + 1) % coords.length
        area += coords[i].x * coords[j].y
        area -= coords[j].x * coords[i].y
    }

    const metersSquared = Math.abs(area / 2)
    const acres = metersSquared / 4046.8564224

    return {
        metersSquared,
        acres
    }
}

export function getTotalAcres(branches: branchType[]) {
    let totalA = 0

    branches.forEach(eachB => {
        totalA += getSizeFromCoords(eachB.boundingPins).acres
    })

    return totalA
}

export function getCropsSeenInBranch(crops: cropType[], branch: branchType) {
    const cropsInArea = crops.filter(eachCrop => branch.cropIds.some(eachBranchCrop => eachBranchCrop.referencedCropId === eachCrop.id))

    return cropsInArea
}


import { coordinatesType } from "@/types";

export function coordsToString(coordinates: coordinatesType) {
    return `${coordinates.latitude}.${coordinates.longitude}`
}
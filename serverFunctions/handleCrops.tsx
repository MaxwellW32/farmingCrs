"use server"
import { db } from "@/db"
import { crops } from "@/db/schema"
import { cropSchema, cropType, newCropSchema, newCropType, tableFilterTypes } from "@/types"
import { makeWhereClauses } from "@/utility/utility"
import { and, eq, SQLWrapper } from "drizzle-orm"

export async function addCrop(newCropObj: newCropType) {
    //validation
    const validatedCrop = newCropSchema.parse(newCropObj)

    //add new crop
    const [addedCrop] = await db.insert(crops).values({
        ...validatedCrop
    }).returning()

    return addedCrop
}

export async function updateCrop(cropId: cropType["id"], updatedCropObj: Partial<cropType>): Promise<cropType> {
    //validation
    const validatedUpdatedCrop = cropSchema.partial().parse(updatedCropObj)

    //auth
    //cropId

    //update
    const [updatedCrop] = await db.update(crops)
        .set({
            ...validatedUpdatedCrop
        })
        .where(eq(crops.id, cropId)).returning()

    return updatedCrop
}

export async function deleteCrop(cropId: cropType["id"]) {
    //auth check

    //validation
    cropSchema.shape.id.parse(cropId)

    await db.delete(crops).where(eq(crops.id, cropId));
}

export async function getSpecificCrop(cropId: cropType["id"], runAuth = true): Promise<cropType | undefined> {
    if (runAuth) {
        //auth check
    }

    cropSchema.shape.id.parse(cropId)

    const result = await db.query.crops.findFirst({
        where: eq(crops.id, cropId),
    });

    return result
}

export async function getCrops(filter: tableFilterTypes<cropType>, getWith?: { [key in keyof cropType]?: true }, limit = 50, offset = 0): Promise<cropType[]> {
    // Auth check

    //compile filters into proper where clauses
    const whereClauses: SQLWrapper[] = makeWhereClauses(cropSchema.partial(), filter, crops)

    const results = await db.query.crops.findMany({
        where: and(...whereClauses),
        limit,
        offset,
        with: getWith === undefined ? undefined : {
        }
    });

    return results;
}
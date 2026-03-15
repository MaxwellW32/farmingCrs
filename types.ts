import { z } from "zod";
//separate 5 spaces
//50 spaces for large differences

export const dateSchema = z.preprocess((val) => {
    if (val instanceof Date) return val;  // already a Date
    if (typeof val === "string" || typeof val === "number") return new Date(val); // convert string

    return val;
}, z.date());

export const coordinatesSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
})
export type coordinatesType = z.infer<typeof coordinatesSchema>




//other types
//handle search
export type tableFilterTypes<T> = {
    [key in keyof T]?: T[key]
}

export type searchObjType<T> = {
    searchItems: T[],
    loading?: true,
    limit?: number, //how many
    offset?: number, //increaser
    incrementOffsetBy?: number, //how much to increase by
    refreshAll?: boolean
}




export const boundingPinSchema = z.object({
    coordinates: coordinatesSchema,
})
export type boundingPinType = z.infer<typeof boundingPinSchema>

export const monitorEventSchema = z.object({
    id: z.string().min(1),
    typeObj: z.union([
        z.object({
            type: z.literal("elevation"),
            elevation: z.string()
        }),
        z.object({
            type: z.literal("soil-condition"),
            status: z.string()
        }),
        z.object({
            type: z.literal("humidity"),
            humidity: z.number()
        }),
        z.object({
            type: z.literal("temperature"),
            temperature: z.number(),
        }),
    ]),
    coordinates: coordinatesSchema,
    size: z.number()
})
export type monitorEventType = z.infer<typeof monitorEventSchema>

















































//db
export const userSchema = z.object({
    //defaults
    id: z.string().min(1, "please add a user id"),
    companyName: z.string().min(1),
    phoneNumber: z.string(),

    //regular

    //null
    name: z.string().min(1).nullable(),
    email: z.string().email().nullable(),
    emailVerified: dateSchema.nullable(),
    image: z.string().min(1).nullable(),
})
export type userType = z.infer<typeof userSchema> & {
    branches?: branchType[]
}

export const newUserSchema = userSchema.omit({ id: true })
export type newUserType = z.infer<typeof newUserSchema>

export const updateUserSchema = userSchema.omit({ id: true })
export type updateUserType = z.infer<typeof updateUserSchema>




export const branchSchema = z.object({
    id: z.string().min(1, "please add a user id"),
    dateCreated: dateSchema,
    cropIds: z.object({
        id: z.string().min(1),
        referencedCropId: z.string().min(1),
        corrdinates: coordinatesSchema
    }).array(),
    branchEvents: monitorEventSchema.array(),

    userId: userSchema.shape.id,
    name: z.string().min(1, "please enter a branch name"),
    boundingPins: boundingPinSchema.array().min(3),
})
export type branchType = z.infer<typeof branchSchema> & {
    fromUser?: userType,
}

export const newBranchSchema = branchSchema.omit({ id: true, dateCreated: true })
export type newBranchType = z.infer<typeof newBranchSchema>

export const updateBranchSchema = branchSchema.omit({ id: true, dateCreated: true, userId: true })
export type updateBranchType = z.infer<typeof updateBranchSchema>



export const cropSchema = z.object({
    id: z.string().min(1),

    name: z.string().min(1),
    minTemp: z.number(),
    maxTemp: z.number(),
    optLow: z.number(),
    optHigh: z.number(),
    idealHumidity: z.number(),
})
export type cropType = z.infer<typeof cropSchema> & {
}

export const newCropSchema = cropSchema.omit({ id: true })
export type newCropType = z.infer<typeof newCropSchema>

export const updateCropSchema = cropSchema.omit({ id: true })
export type updateCropType = z.infer<typeof updateCropSchema>
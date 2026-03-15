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




//other types




export const boundingPinSchema = z.object({
    coordinates: coordinatesSchema,
})
export type boundingPinType = z.infer<typeof boundingPinSchema>

export const monitorEventSchema = z.object({
    id: z.string().min(1),
    typeObj: z.union([
        z.object({
            type: z.literal("elevation"),
        }),
        z.object({
            type: z.literal("soil-condition")
        }),
    ]),
    coordinates: coordinatesSchema,
    size: z.number()
})
export type branchEventType = z.infer<typeof monitorEventSchema>

















































//db
export const userSchema = z.object({
    //defaults
    id: z.string().min(1, "please add a user id"),
    companyName: z.string().min(1),

    //regular

    //null
    name: z.string().min(1).nullable(),
    email: z.string().email().nullable(),
    emailVerified: dateSchema.nullable(),
    image: z.string().min(1).nullable(),
})
export type userType = z.infer<typeof userSchema> & {
}

export const newUserSchema = userSchema.omit({ id: true })
export type newUserType = z.infer<typeof newUserSchema>

export const updateUserSchema = userSchema.omit({ id: true })
export type updateUserType = z.infer<typeof updateUserSchema>




export const branchSchema = z.object({
    id: z.string().min(1, "please add a user id"),
    dateCreated: dateSchema,
    cropIds: z.object({
        cropId: z.string().min(1),
    }).array(),
    branchEvents: monitorEventSchema.array(),

    userId: userSchema.shape.id,
    name: z.string().min(1),
    boundingPins: boundingPinSchema.array().min(3),
})
export type branchType = z.infer<typeof branchSchema> & {
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
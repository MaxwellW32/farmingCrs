import { relations } from "drizzle-orm";
import { boolean, timestamp, pgTable, text, primaryKey, integer, index, json } from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "@auth/core/adapters"
import { branchType } from "@/types";
import { defaultText } from "@/lib/defaultData";

export const users = pgTable("users", {
    //defaults
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    companyName: text("companyName").notNull().default(defaultText),

    //regular

    //null
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }), //convert to obj on server whenever used
    image: text("image"),
})
export const userRelations = relations(users, ({ many }) => ({
    branches: many(branches),
}));




export const branches = pgTable("branches", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    dateCreated: timestamp("dateCreated", { mode: "date" }).notNull().defaultNow(),
    cropIds: json("cropIds").$type<branchType["cropIds"]>().default([]).notNull(),
    branchEvents: json("branchEvents").$type<branchType["branchEvents"]>().default([]).notNull(),

    userId: text("userId").notNull().references(() => users.id),
    name: text("name").notNull(),
    boundingPins: json("boundingPins").$type<branchType["boundingPins"]>().default([]).notNull(),
},
    (table) => {
        return {
            branchUserIdIndex: index("branchUserIdIndex").on(table.userId),
        };
    })
export const branchRelations = relations(branches, ({ one, many }) => ({
    fromUser: one(users, {
        fields: [branches.userId],
        references: [users.id]
    }),
}));




export const crops = pgTable("crops", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),

    name: text("name").notNull(),
    minTemp: integer("minTemp").notNull(),
    maxTemp: integer("maxTemp").notNull(),
    optLow: integer("optLow").notNull(),
    optHigh: integer("optHigh").notNull(),
    idealHumidity: integer("idealHumidity").notNull(),
},
    (table) => {
        return {
            cropNameIndex: index("cropNameIndex").on(table.name),
        };
    })
export const cropRelations = relations(crops, ({ }) => ({
}));



















export const accounts = pgTable("account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        },
    ]
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable("verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => [
        {
            compositePk: primaryKey({
                columns: [verificationToken.identifier, verificationToken.token],
            }),
        },
    ]
)

export const authenticators = pgTable("authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => [
        {
            compositePK: primaryKey({
                columns: [authenticator.userId, authenticator.credentialID],
            }),
        },
    ]
)
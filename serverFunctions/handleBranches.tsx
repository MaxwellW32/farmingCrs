"use server"
import { db } from "@/db"
import { branches } from "@/db/schema"
import { branchSchema, branchType, newBranchSchema, newBranchType, tableFilterTypes } from "@/types"
import { makeWhereClauses } from "@/utility/utility"
import { and, eq, SQLWrapper } from "drizzle-orm"

export async function addBranch(newBranchObj: newBranchType) {
    //validation
    const validatedBranch = newBranchSchema.parse(newBranchObj)

    //add new branch
    const [addedBranch] = await db.insert(branches).values({
        ...validatedBranch
    }).returning()

    return addedBranch
}

export async function updateBranch(branchId: branchType["id"], updatedBranchObj: Partial<branchType>) {
    //validation
    const validatedUpdatedBranch = branchSchema.partial().parse(updatedBranchObj)

    //auth
    //userId

    //update
    await db.update(branches)
        .set({
            ...validatedUpdatedBranch
        })
        .where(eq(branches.id, branchId))
}

export async function deleteBranch(branchId: branchType["id"]) {
    //auth check

    //validation
    branchSchema.shape.id.parse(branchId)

    await db.delete(branches).where(eq(branches.id, branchId));
}

export async function getSpecificBranch(branchId: branchType["id"], runAuth = true): Promise<branchType | undefined> {
    if (runAuth) {
        //auth check
    }

    branchSchema.shape.id.parse(branchId)

    const result = await db.query.branches.findFirst({
        where: eq(branches.id, branchId),
    });

    return result
}

export async function getBranches(filter: tableFilterTypes<branchType>, getWith?: { [key in keyof branchType]?: true }, limit = 50, offset = 0): Promise<branchType[]> {
    // Auth check

    //compile filters into proper where clauses
    const whereClauses: SQLWrapper[] = makeWhereClauses(branchSchema.partial(), filter, branches)

    const results = await db.query.branches.findMany({
        where: and(...whereClauses),
        limit,
        offset,
        // orderBy: [desc(branches.dateCreated)],
        with: getWith === undefined ? undefined : {
            fromUser: getWith.fromUser,
        }
    });

    return results;
}
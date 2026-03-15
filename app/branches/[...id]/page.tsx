import { auth } from "@/auth/auth"
import { getSpecificBranch } from "@/serverFunctions/handleBranches"

export default async function Page({ params }: { params: Promise<{ id: string[] }> }) {
    const { id } = await params
    const branchId = id[0]

    const seenBranch = await getSpecificBranch(branchId)
    if (seenBranch === undefined) return (<p>not seeing branch by id</p>)

    const session = await auth();
    if (session === null) return null

    return (
        <>{seenBranch.name}</>
        // <ReaddBranch seenUser={session.user} seendBranch={seendBranch} />
    )
}
import ReadBranch from "@/components/branches/ReadBranch"
import { getSpecificBranch } from "@/serverFunctions/handleBranches"

export default async function Page({ params }: { params: Promise<{ id: string[] }> }) {
    const { id } = await params
    const branchId = id[0]

    const seenBranch = await getSpecificBranch(branchId)
    if (seenBranch === undefined) return (<p>not seeing branch by id</p>)

    return (
        <ReadBranch seenBranch={seenBranch} />
    )
}
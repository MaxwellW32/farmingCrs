"use client"
import { addBranch, getBranches } from '@/serverFunctions/handleBranches'
import { branchType, newBranchType, userType } from '@/types'
import { consoleAndToastError } from '@/utility/consoleErrorWithToast'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { v4 } from "uuid"

export default function ViewProfile({ seenUser }: { seenUser: userType }) {
    const [branches, branchesSet] = useState<branchType[] | undefined>(undefined)

    //get branches
    useEffect(() => {
        const search = async () => {
            try {
                const branches = await getBranches({ userId: seenUser.id })
                branchesSet(branches)
                console.log(`$branches`, branches);

            } catch (error) {
                consoleAndToastError(error)
            }
        }

        search()
    }, [])

    return (
        <div>
            {branches !== undefined && branches.map(eachBranch => {
                return (
                    <div key={eachBranch.id}>
                        <p>{eachBranch.name}</p>

                        <Link href={`/branches/${eachBranch.id}`}>visit</Link>
                    </div>
                )
            })}

            <button
                onClick={async () => {
                    const newBranch: newBranchType = {
                        cropIds: [],
                        branchEvents: [],
                        userId: seenUser.id,
                        name: `new branch ${v4()}`,
                        boundingPins: [
                            {
                                coordinates: {
                                    latitude: 0,
                                    longitude: 0,
                                }
                            },
                            {
                                coordinates: {
                                    latitude: 0,
                                    longitude: 0,
                                }
                            },
                            {
                                coordinates: {
                                    latitude: 0,
                                    longitude: 0,
                                }
                            },
                            {
                                coordinates: {
                                    latitude: 0,
                                    longitude: 0,
                                }
                            },
                        ]
                    }

                    await addBranch({ ...newBranch })

                    toast.success("working")
                }}
            >add branch</button>
        </div>
    )
}
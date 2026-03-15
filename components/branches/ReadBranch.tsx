"use client"
import { branchType } from '@/types'
import { consoleAndToastError } from '@/utility/consoleErrorWithToast'
import { useEffect, useState } from 'react'

export default function ReadBranch({ seenBranch }: { seenBranch: branchType }) {
    const [rec, recSet] = useState<unknown | undefined>(undefined)

    //best times of year yield / plant different things
    //live alerts
    //show recommended crops along with viability
    //add crops to the branch
    //ai looks at crop fullness time, gives advice on whether can stay go

    useEffect(() => {
        const search = async () => {
            try {
                //get api test
                const base = process.env.NEXT_PUBLIC_PY_API;
                console.log(`$base`, base);

                const pin = seenBranch.boundingPins[0]

                const rcCropsRes = await fetch(
                    `${base}/recommendations?lat=${pin.coordinates.latitude}&lon=${pin.coordinates.latitude}`
                );
                const recCrops = await rcCropsRes.json()
                console.log(`$recCrops`, recCrops);

                recSet(recCrops)

            } catch (error) {
                consoleAndToastError(error)
            }
        }

        search()

    }, [])

    return (
        <div>
            <div>
                <p>{seenBranch.name}</p>

                <p>crops</p>

                <p>recommendations</p>
                {rec !== undefined && (
                    <>
                        {JSON.stringify(rec, null, 2)}
                    </>
                )}
            </div>

            <div></div>
        </div>
    )
}
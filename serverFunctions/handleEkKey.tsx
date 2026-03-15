"use server"
import dotenv from 'dotenv';

dotenv.config({ path: ".env.local" });

export async function makeEKKey(): Promise<string> {
    //send off to gpt api
    const response = await fetch(`https://api.openai.com/v1/realtime/client_secrets`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "session": {
                "type": "realtime",
                "model": "gpt-realtime"
            }
        })
    })

    const seenVal = await response.json()

    return seenVal.value
}
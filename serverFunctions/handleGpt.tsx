"use server"

import { chosenGptModel, openai } from "@/lib/openai";
import { branchType, cropRecommendationsResponseSchema, cropRecommendationsResponseType, cropType, makeMonitorEventResponseSchema, makeMonitorEventResponseType, monitorEventType } from "@/types";
import { zodTextFormat } from "openai/helpers/zod";

export async function generateMonitorEvents({ branch }: { branch: branchType }): Promise<makeMonitorEventResponseType> {
    const instructions = `Generate monitor events for this plot of land - look at the branch stats and using the latitude/longitude choose elevation, soil-condition, humidity and temperature events that would be realistic for this plot of land. 
   
    Latitude: ${branch.boundingPins[0].coordinates.latitude}
    Longitude: ${branch.boundingPins[0].coordinates.longitude}

    sometime include areas of high humidity or temperature were using it as testing data to recommend status updates on crops in the area
   `
    console.log(`$instructions`, instructions);

    const response = await openai.responses.parse({
        model: chosenGptModel,
        instructions: instructions,
        input: `Please generate realistic monitor events`,
        text: {
            format: zodTextFormat(makeMonitorEventResponseSchema, "makeMonitorEventResponseSchema"),
        },
    });

    //validate
    const validatedResponse = makeMonitorEventResponseSchema.parse(response.output_parsed)

    return validatedResponse
}

export async function makeCropRecommendations({ branch, crops, monitorEvents }: { branch: branchType; crops: cropType[], monitorEvents: monitorEventType[] }): Promise<cropRecommendationsResponseType> {
    const instructions = `Please monitor the current events affecting this plot of land
   
    Latitude: ${branch.boundingPins[0].coordinates.latitude}
    Longitude: ${branch.boundingPins[0].coordinates.longitude}

  Based on the humidiy, temperature, elevation and soil conditions please recommend any changes to the crops in the area. Look at the array below to see what the crops prefer. Our goal is to ensure crops stay healthy and produce the best yield possible. 
  monitorEvents:
  ${JSON.stringify(monitorEvents)}

  Crops:
  ${JSON.stringify(crops)}

  do not hallucinate crop id's they are used to match back the crop later, please take exactly from the crops array
   `
    console.log(`$instructions`, instructions);

    const response = await openai.responses.parse({
        model: chosenGptModel,
        instructions: instructions,
        input: `Please generate recomendations for the if any crops are afefcted by adverse monitor events.`,
        text: {
            format: zodTextFormat(cropRecommendationsResponseSchema, "cropRecommendationsResponse"),
        },
    });

    //validate
    const validatedResponse = cropRecommendationsResponseSchema.parse(response.output_parsed)

    return validatedResponse
}
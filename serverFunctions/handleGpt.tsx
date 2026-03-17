"use server"

import { chosenGptModel, openai } from "@/lib/openai";
import { branchType, cropRecommendationsResponseSchema, cropRecommendationsResponseType, cropType, makeBranchEventResponseSchema, makeBranchEventResponseType, branchEventType } from "@/types";
import { getSizeFromCoords } from "@/utility/contextHelpers";
import { zodTextFormat } from "openai/helpers/zod";

export async function generateBranchEvents({ branch }: { branch: branchType }): Promise<makeBranchEventResponseType> {
    const instructions = `Generate branch events for this plot of land - look at the branch stats and using the latitude/longitude choose elevation, soil-condition, humidity and temperature events that would be realistic for this plot of land. The size of the event is in meters, and dictates how much of the land is experiencing that event.
   
    Latitude: ${branch.boundingPins[0].coordinates.latitude}
    Longitude: ${branch.boundingPins[0].coordinates.longitude}

    Keep the sizing of each event within the size of this branch land.
    Branch Size: 
    ${getSizeFromCoords(branch.boundingPins).metersSquared} meters squared.

    Sometimes include areas of high humidity or temperature we're using it as testing data to recommend status updates on crops in the area`

    console.log(`$instructions`, instructions);

    const response = await openai.responses.parse({
        model: chosenGptModel,
        instructions: instructions,
        input: `Please generate realistic monitor events`,
        text: {
            format: zodTextFormat(makeBranchEventResponseSchema, "makeBranchEventResponse"),
        },
    });

    //validate
    const validatedResponse = makeBranchEventResponseSchema.parse(response.output_parsed)

    return validatedResponse
}

export async function makeCropRecommendations({ branch, crops, branchEvents }: { branch: branchType; crops: cropType[], branchEvents: branchEventType[] }): Promise<cropRecommendationsResponseType> {
    const instructions = `Please monitor the current events affecting this plot of land
   
    Latitude: ${branch.boundingPins[0].coordinates.latitude}
    Longitude: ${branch.boundingPins[0].coordinates.longitude}

  Based on the humidiy, temperature, elevation and soil conditions please recommend any changes to the crops in the area. Look at the array below to see what the crops prefer. Our goal is to ensure crops stay healthy and produce the best yield possible. 
  branchEvents:
  ${JSON.stringify(branchEvents)}

  Crops:
  ${JSON.stringify(crops)}

  do not hallucinate crop id's they are used to match back the crop later, please take exactly from the crops array
   `
    console.log(`$instructions`, instructions);

    const response = await openai.responses.parse({
        model: chosenGptModel,
        instructions: instructions,
        input: `Please generate recomendations for the if any crops are affected by adverse events in this branch.`,
        text: {
            format: zodTextFormat(cropRecommendationsResponseSchema, "cropRecommendationsResponse"),
        },
    });

    //validate
    const validatedResponse = cropRecommendationsResponseSchema.parse(response.output_parsed)

    return validatedResponse
}
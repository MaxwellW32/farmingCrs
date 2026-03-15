// "use server"

// import { cropType } from "@/types";

// export async function generateMonitorEvents({ crops }: { crops: cropType[] }): Promise<makeGradeInteractiveSubGoalResponseType> {
//     const instructions = `You are evaluating whether the player successfully completed a subGoal during a conversation.

// Your task is to determine if the player achieved the subGoal.

// Evaluation rules:

// 1. The player must clearly attempt to achieve the goal.
// 2. The target character must logically accept or agree.
// 3. The conversation must reach a clear outcome.

// If the character would realistically refuse, the goal is NOT complete.

// Be faithful to the character's personality and motivations.

// Do NOT be generous. Only mark complete if the goal was clearly achieved.

// Player = the user.

// SubGoal:
// ${JSON.stringify(subGoal)}

// Characters:
// ${JSON.stringify(characters)}

// Previous Story Sections:
// ${JSON.stringify(prevSections)}

// Chat Messages:
// ${JSON.stringify(prevChatMessages)}`
//     console.log(`$instructions`, instructions);

//     const response = await openai.responses.parse({
//         model: chosenGptModel,
//         instructions: instructions,
//         input: `Determine whether this subGoal was complete or not`,
//         text: {
//             format: zodTextFormat(makeGradeInteractiveSubGoalResponseSchema, "makeGradeInteractiveSubGoalResponse"),
//         },
//     });

//     //validate
//     const validatedResponse = makeGradeInteractiveSubGoalResponseSchema.parse(response.output_parsed)

//     return validatedResponse
// }
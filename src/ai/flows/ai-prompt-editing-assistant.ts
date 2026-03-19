'use server';
/**
 * @fileOverview An AI editing assistant flow that interprets natural language editing style prompts
 * and suggests relevant edits, effects, or assets for a video/audio project.
 *
 * - aiPromptEditingAssistant - A function that handles interpreting user editing style prompts.
 * - AiPromptEditingAssistantInput - The input type for the aiPromptEditingAssistant function.
 * - AiPromptEditingAssistantOutput - The return type for the aiPromptEditingAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPromptEditingAssistantInputSchema = z.object({
  editingStylePrompt: z
    .string()
    .describe(
      'A natural language prompt describing the desired editing style (e.g., "Make it cinematic", "Add a vlog feel").'
    ),
});
export type AiPromptEditingAssistantInput = z.infer<
  typeof AiPromptEditingAssistantInputSchema
>;

const AiPromptEditingAssistantOutputSchema = z.object({
  appliedStyleDescription: z
    .string()
    .describe('A brief description of the editing style interpreted and applied.'),
  suggestedActions: z
    .array(z.string())
    .describe(
      'A list of concrete editing actions or techniques to achieve the desired style (e.g., "Apply a warm color grade", "Add fast-paced cuts").'
    ),
  suggestedEffects: z
    .array(z.string())
    .describe(
      'A list of specific visual or audio effects to apply (e.g., "Vignette", "Grain effect", "Dynamic transitions", "Reverb").'
    ),
  suggestedAssets: z
    .array(z.string())
    .describe(
      'A list of suggested asset types (e.g., "Upbeat background music", "Cinematic score", "Vlog-style sound effects", "Title card templates").'
    ),
});
export type AiPromptEditingAssistantOutput = z.infer<
  typeof AiPromptEditingAssistantOutputSchema
>;

export async function aiPromptEditingAssistant(
  input: AiPromptEditingAssistantInput
): Promise<AiPromptEditingAssistantOutput> {
  return aiPromptEditingAssistantFlow(input);
}

const aiPromptEditingAssistantPrompt = ai.definePrompt({
  name: 'aiPromptEditingAssistantPrompt',
  input: {schema: AiPromptEditingAssistantInputSchema},
  output: {schema: AiPromptEditingAssistantOutputSchema},
  prompt: `You are an AI video and audio editing assistant for the NeMo mobile app. Your task is to interpret a user's natural language request for an editing style and suggest concrete actions, effects, and assets that would achieve that style.
The output should be a structured JSON object according to the provided schema descriptions.

User request: '{{{editingStylePrompt}}}'

Based on the user's request, provide a clear description of the applied style and a list of specific actions, effects, and assets that NeMo should suggest or apply.`,
});

const aiPromptEditingAssistantFlow = ai.defineFlow(
  {
    name: 'aiPromptEditingAssistantFlow',
    inputSchema: AiPromptEditingAssistantInputSchema,
    outputSchema: AiPromptEditingAssistantOutputSchema,
  },
  async input => {
    const {output} = await aiPromptEditingAssistantPrompt(input);
    return output!;
  }
);

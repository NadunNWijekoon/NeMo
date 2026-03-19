'use server';
/**
 * @fileOverview A Genkit flow for automatically generating subtitles from a video.
 *
 * - generateSubtitles - A function that transcribes audio from a video to generate subtitles.
 * - AutoSubtitleGenerationInput - The input type for the generateSubtitles function.
 * - AutoSubtitleGenerationOutput - The return type for the generateSubtitles function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AutoSubtitleGenerationInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video file, as a data URI that must include a MIME type (e.g., 'video/mp4') and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AutoSubtitleGenerationInput = z.infer<typeof AutoSubtitleGenerationInputSchema>;

const SubtitleEntrySchema = z.object({
  text: z.string().describe('The transcribed speech for this subtitle entry.'),
  start: z.number().describe('The start time of the subtitle entry in seconds.'),
  end: z.number().describe('The end time of the subtitle entry in seconds.'),
});

const AutoSubtitleGenerationOutputSchema = z
  .array(SubtitleEntrySchema)
  .describe('An array of subtitle entries with text and timestamps.');
export type AutoSubtitleGenerationOutput = z.infer<typeof AutoSubtitleGenerationOutputSchema>;

export async function generateSubtitles(
  input: AutoSubtitleGenerationInput
): Promise<AutoSubtitleGenerationOutput> {
  return autoSubtitleGenerationFlow(input);
}

const autoSubtitlePrompt = ai.definePrompt({
  name: 'autoSubtitlePrompt',
  input: { schema: AutoSubtitleGenerationInputSchema },
  output: { schema: AutoSubtitleGenerationOutputSchema },
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are an expert audio transcriber. Your task is to accurately transcribe the audio from the provided video into a JSON array of subtitle objects. Each object must strictly adhere to the following structure:

{
  "text": "The transcribed speech for this subtitle entry.",
  "start": 1.23, // The start time of the subtitle entry in seconds (float).
  "end": 4.56   // The end time of the subtitle entry in seconds (float).
}

Ensure that the output is a valid JSON array and contains only the subtitle data, without any additional text or formatting.

Video: {{media url=videoDataUri}}`,
});

const autoSubtitleGenerationFlow = ai.defineFlow(
  {
    name: 'autoSubtitleGenerationFlow',
    inputSchema: AutoSubtitleGenerationInputSchema,
    outputSchema: AutoSubtitleGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await autoSubtitlePrompt(input);
    if (!output) {
      throw new Error('Failed to generate subtitles.');
    }
    return output;
  }
);

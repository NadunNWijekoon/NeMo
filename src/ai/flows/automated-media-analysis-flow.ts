'use server';
/**
 * @fileOverview This file implements a Genkit flow for automated media analysis.
 * It can analyze video files for scene detection and audio files for speech transcription.
 *
 * - automatedMediaAnalysis - The main function to trigger the media analysis flow.
 * - AutomatedMediaAnalysisInput - The input type for the automatedMediaAnalysis function.
 * - AutomatedMediaAnalysisOutput - The return type for the automatedMediaAnalysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AutomatedMediaAnalysisInputSchema = z.object({
  mediaDataUri: z
    .string()
    .describe(
      "The media file (video or audio) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  mimeType: z
    .string()
    .describe('The MIME type of the uploaded media file (e.g., "video/mp4", "audio/wav").'),
});
export type AutomatedMediaAnalysisInput = z.infer<typeof AutomatedMediaAnalysisInputSchema>;

const AutomatedMediaAnalysisOutputSchema = z.object({
  mediaType: z.enum(['video', 'audio']).describe('The type of media that was analyzed.').optional(),
  sceneDescriptions: z.array(z.string()).describe('A list of descriptions for detected scenes in a video.').optional(),
  transcription: z.string().describe('The transcribed text from an audio file.').optional(),
});
export type AutomatedMediaAnalysisOutput = z.infer<typeof AutomatedMediaAnalysisOutputSchema>;

/**
 * Analyzes an uploaded media file (video or audio) to detect scenes or transcribe speech.
 * @param input - The input containing the media data URI and its MIME type.
 * @returns An object containing scene descriptions for video or transcription for audio.
 */
export async function automatedMediaAnalysis(
  input: AutomatedMediaAnalysisInput
): Promise<AutomatedMediaAnalysisOutput> {
  return automatedMediaAnalysisFlow(input);
}

const automatedMediaAnalysisFlow = ai.defineFlow(
  {
    name: 'automatedMediaAnalysisFlow',
    inputSchema: AutomatedMediaAnalysisInputSchema,
    outputSchema: AutomatedMediaAnalysisOutputSchema,
  },
  async (input) => {
    const { mediaDataUri, mimeType } = input;

    if (mimeType.startsWith('video/')) {
      const { output } = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: [
          { text: 'Analyze this video frame by frame. Identify and concisely describe each distinct scene or significant event. List each scene description on a new line.' },
          { media: { url: mediaDataUri, contentType: mimeType } },
        ],
        config: {
          temperature: 0.1,
        },
      });

      const sceneDescriptions = output?.text
        ? output.text.split(/\n\n|\n\r\n|\r\n|\n/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        : [];

      return {
        mediaType: 'video',
        sceneDescriptions,
      };
    } else if (mimeType.startsWith('audio/')) {
      const { output } = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: [
          { text: 'Transcribe the following audio into text. Do not add any introductory phrases, just the transcribed text.' },
          { media: { url: mediaDataUri, contentType: mimeType } },
        ],
        config: {
          temperature: 0.1,
        },
      });

      return {
        mediaType: 'audio',
        transcription: output?.text || '',
      };
    } else {
      throw new Error(`Unsupported media type: ${mimeType}`);
    }
  }
);

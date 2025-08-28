// src/ai/flows/generate-hero-text.ts
'use server';

/**
 * @fileOverview Generates hero text for the landing page based on the topic and target audience.
 *
 * - generateHeroText - A function that generates the hero text.
 * - GenerateHeroTextInput - The input type for the generateHeroText function.
 * - GenerateHeroTextOutput - The return type for the generateHeroText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHeroTextInputSchema = z.object({
  topic: z.string().describe('The topic of the hero section.'),
  targetAudience: z.string().describe('The target audience for the hero section.'),
});
export type GenerateHeroTextInput = z.infer<typeof GenerateHeroTextInputSchema>;

const GenerateHeroTextOutputSchema = z.object({
  headline: z.string().describe('The main headline for the hero section.'),
  description: z.string().describe('A brief description for the hero section.'),
  callToAction: z.string().describe('A call to action for the hero section.'),
});
export type GenerateHeroTextOutput = z.infer<typeof GenerateHeroTextOutputSchema>;

export async function generateHeroText(input: GenerateHeroTextInput): Promise<GenerateHeroTextOutput> {
  return generateHeroTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeroTextPrompt',
  input: {schema: GenerateHeroTextInputSchema},
  output: {schema: GenerateHeroTextOutputSchema},
  prompt: `You are a marketing expert specializing in creating engaging hero section text for landing pages.

  Based on the topic and target audience, generate a compelling headline, a brief description, and a clear call to action.

  Topic: {{{topic}}}
  Target Audience: {{{targetAudience}}}

  Ensure the generated text is concise, attention-grabbing, and aligned with the overall brand message.
  The generated text should be appropriate for AmulyaX India.
  Output the values in JSON format with keys 'headline', 'description', and 'callToAction'.`, // Output should be a valid json string.
});

const generateHeroTextFlow = ai.defineFlow(
  {
    name: 'generateHeroTextFlow',
    inputSchema: GenerateHeroTextInputSchema,
    outputSchema: GenerateHeroTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

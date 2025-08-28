// src/app/actions/subscribe.ts
'use server';

import { Client } from '@notionhq/client';
import { z } from 'zod';

const subscribeSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
});

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

type SubscribeState = {
  status: 'idle' | 'pending' | 'success' | 'error';
  message?: string;
}

export async function subscribeToNewsletter(
    prevState: SubscribeState,
    formData: FormData
): Promise<SubscribeState> {
    if (!process.env.NOTION_API_KEY || !databaseId) {
        console.error("Notion API credentials are not configured.");
        return { status: 'error', message: 'Notion API is not configured.' };
    }

    const parsed = subscribeSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
    });

    if (!parsed.success) {
        // Concatenate all error messages
        const message = parsed.error.errors.map(e => e.message).join(', ');
        return { status: 'error', message };
    }
    
    try {
        await notion.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties: {
                // This assumes your Notion database's "Title" property is named "Name".
                // This is case-sensitive.
                Name: {
                    title: [
                        {
                            text: {
                                content: parsed.data.name,
                            },
                        },
                    ],
                },
                // This assumes you have an "Email" property of type "Email".
                // This is case-sensitive.
                Email: {
                    email: parsed.data.email,
                },
                // This assumes you have a "Subscribed At" property of type "Date".
                // This is case-sensitive.
                "Subscribed At": {
                    date: {
                        start: new Date().toISOString(),
                    }
                }
            },
        });
        
        return { status: 'success', message: 'Successfully subscribed!' };
    } catch (error: any) {
        console.error("Failed to add subscriber to Notion:", error.body || error);
        // Provide a generic error message to the user for security.
        return { status: 'error', message: 'Could not subscribe. Please try again later.' };
    }
}

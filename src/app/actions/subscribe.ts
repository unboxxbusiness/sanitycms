// src/app/actions/subscribe.ts
'use server';

import { Client } from '@notionhq/client';
import { z } from 'zod';

const subscribeSchema = z.object({
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
        return { status: 'error', message: 'Notion API is not configured.' };
    }

    const parsed = subscribeSchema.safeParse({
        email: formData.get('email'),
    });

    if (!parsed.success) {
        return { status: 'error', message: parsed.error.errors[0].message };
    }
    
    try {
        await notion.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties: {
                // This assumes your Notion database's "Title" property is named "Email".
                // This is case-sensitive.
                Email: {
                    title: [
                        {
                            text: {
                                content: parsed.data.email,
                            },
                        },
                    ],
                },
            },
        });
        
        return { status: 'success' };
    } catch (error: any) {
        console.error("Failed to add subscriber to Notion:", error);
        // Provide a generic error message to the user for security.
        return { status: 'error', message: 'Could not subscribe. Please try again later.' };
    }
}

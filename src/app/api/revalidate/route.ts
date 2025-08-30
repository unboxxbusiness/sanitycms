// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Define the secret from environment variables
const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
    try {
        if (!REVALIDATE_SECRET) {
            return new NextResponse('Missing SANITY_REVALIDATE_SECRET', { status: 401 });
        }

        const { body, isValidSignature } = await parseBody<{ _type: string, slug?: { current: string }}>(
            req,
            REVALIDATE_SECRET,
        );

        if (!isValidSignature) {
            return new NextResponse('Invalid signature', { status: 401 });
        }

        if (!body?._type) {
            return new NextResponse('Bad Request: Missing _type in body', { status: 400 });
        }

        // Revalidate the tags associated with the updated document type
        const tagsToRevalidate = [body._type];
        
        // If the document type has a slug, revalidate the specific page tag as well
        if (body.slug?.current) {
            tagsToRevalidate.push(`${body._type}:${body.slug.current}`);
        }
        
        // Revalidate all tags
        tagsToRevalidate.forEach(tag => revalidateTag(tag));

        console.log(`Revalidated tags: ${tagsToRevalidate.join(', ')}`);
        
        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            revalidatedTags: tagsToRevalidate,
        });

    } catch (err: any) {
        console.error('Error during revalidation:', err);
        return new NextResponse(err.message, { status: 500 });
    }
}

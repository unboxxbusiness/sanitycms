// src/app/api/revalidate/route.ts
<<<<<<< HEAD
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
=======
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  try {
    if (!SANITY_WEBHOOK_SECRET) {
      console.error('Sanity webhook secret is not configured.');
      return new NextResponse('Sanity webhook secret is not configured', { status: 500 });
    }
    
    const { body, isValidSignature } = await parseBody<{ _type: string, slug?: { current: string } }>(
      req,
      SANITY_WEBHOOK_SECRET,
    )

    if (!isValidSignature) {
      const message = 'Invalid signature'
      console.log(message)
      return new Response(JSON.stringify({ message, isValidSignature, body }), { status: 401 })
    }

    if (!body?._type) {
      const message = 'Bad Request: Missing _type in body'
      console.log(message)
      return new Response(message, { status: 400 })
    }

    // Revalidate the tag for the document type
    const tag = body._type
    revalidateTag(tag)

    console.log(`Revalidated tag: ${tag}`)

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })

  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
}

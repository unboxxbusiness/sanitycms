// src/app/api/revalidate/route.ts
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
}

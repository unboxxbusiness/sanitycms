// src/app/studio/[[...tool]]/page.tsx
'use client'

/**
 * This route is responsible for the built-in authoring environment for Sanity Studio.
 * All routes under /studio will be handled by this file.
 **/
import {NextStudio} from 'next-sanity/studio'
import config from '../../../../sanity.config'
import {Suspense} from 'react'
import dynamic from 'next/dynamic'

const NextStudioDynamically = dynamic(() => import('next-sanity/studio').then(mod => mod.NextStudio), { ssr: false })


export default function StudioPage() {
  return (
    <Suspense>
      <NextStudioDynamically config={config} />
    </Suspense>
  )
}

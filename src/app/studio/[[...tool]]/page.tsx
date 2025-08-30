// src/app/studio/[[...tool]]/page.tsx
'use client'

/**
 * This route is responsible for the built-in authoring environment for Sanity Studio.
 * All routes under /studio will be handled by this file.
 **/
import {NextStudio} from 'next-sanity/studio'
import config from '../../../../sanity.config'
import {Suspense} from 'react'

export default function StudioPage() {
  return (
    <Suspense>
      <NextStudio config={config} />
    </Suspense>
  )
}

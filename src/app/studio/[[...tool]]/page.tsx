// src/app/studio/[[...tool]]/page.tsx

'use client'

import {NextStudio} from 'next-sanity/studio'
import config from '../../../../sanity.config'
import {Suspense} from 'react'
import dynamic from 'next/dynamic'

const Studio = dynamic(() => import('next-sanity/studio').then((mod) => mod.NextStudio), {
  ssr: false,
})

export default function StudioPage() {
  return (
    <Suspense>
      <Studio config={config} />
    </Suspense>
  )
}

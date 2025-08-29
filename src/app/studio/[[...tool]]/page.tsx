// src/app/studio/[[...tool]]/page.tsx

'use client'

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

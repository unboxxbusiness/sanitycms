// src/components/blocks/video-block.tsx
'use client'

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface VideoBlockProps {
  heading?: string;
  subheading?: string;
  youtubeUrl: string;
  showCtaButton?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

// Function to extract video ID from various YouTube URL formats
const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export function VideoBlock({ heading, subheading, youtubeUrl, showCtaButton, ctaText, ctaLink }: VideoBlockProps) {
  const videoId = getYouTubeId(youtubeUrl);

  if (!videoId) {
    return (
        <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 text-center">
                <p className="text-red-500">Invalid YouTube URL provided.</p>
            </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {heading && (
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
            </div>
        )}
        <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={heading || 'YouTube video player'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-xl"
          ></iframe>
        </div>
        {showCtaButton && ctaText && ctaLink && (
            <div className="mt-8 text-center">
                <Button asChild size="lg">
                    <Link href={ctaLink}>{ctaText}</Link>
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}

// src/components/blocks/video-block.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { urlFor } from '@/lib/sanity-image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface VideoBlockProps {
  heading?: string;
  subheading?: string;
  youtubeUrl: string;
  thumbnail?: SanityImageSource;
  showCtaButton?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export function VideoBlock({ heading, subheading, youtubeUrl, thumbnail, showCtaButton, ctaText, ctaLink }: VideoBlockProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoId = getYouTubeId(youtubeUrl);
  
  // We need to use useEffect to avoid hydration errors with the Dialog component
  // when the dialog is controlled.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';

  const thumbnailSrc = thumbnail 
    ? urlFor(thumbnail).width(1280).height(720).url() 
    : videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
    : '';

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  if (!videoId) {
    return (
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Invalid YouTube URL provided.</p>
        </div>
      </section>
    );
  }

  if (!thumbnailSrc) {
    return (
        <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 text-center">
                <p className="text-red-500">Could not determine video thumbnail.</p>
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
        <div className="relative max-w-4xl mx-auto">
          <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
            <DialogTrigger asChild>
                <div
                    className="relative cursor-pointer group"
                >
                    <img
                    src={thumbnailSrc}
                    alt={heading || "Video thumbnail"}
                    width={1280}
                    height={720}
                    className="w-full transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md shadow-lg border"
                    />
                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl">
                    <div className="bg-primary/10 flex items-center justify-center rounded-full backdrop-blur-md size-28">
                        <div
                        className={`flex items-center justify-center bg-gradient-to-b from-primary/30 to-primary shadow-md rounded-full size-20 transition-all ease-out duration-200 relative group-hover:scale-[1.2] scale-100`}
                        >
                        <Play
                            className="size-8 text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                            style={{
                            filter:
                                "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                            }}
                        />
                        </div>
                    </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-11/12 p-0 bg-transparent border-0">
                <DialogHeader>
                  <DialogTitle className="sr-only">{heading || 'Video Player'}</DialogTitle>
                </DialogHeader>
                <div className="aspect-video">
                  {isVideoOpen && (
                      <iframe
                          src={embedUrl}
                          className="size-full rounded-lg"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      ></iframe>
                  )}
                </div>
            </DialogContent>
          </Dialog>
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

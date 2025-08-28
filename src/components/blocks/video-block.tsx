// src/components/blocks/video-block.tsx
'use client'

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { urlFor } from '@/lib/sanity-image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Button } from '../ui/button';
import Link from 'next/link';

interface VideoBlockProps {
  heading?: string;
  subheading?: string;
  youtubeUrl: string;
  thumbnail?: SanityImageSource;
  showCtaButton?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

const animationVariants = {
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
};

const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export function VideoBlock({ heading, subheading, youtubeUrl, thumbnail, showCtaButton, ctaText, ctaLink }: VideoBlockProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoId = getYouTubeId(youtubeUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';

  const thumbnailSrc = thumbnail 
    ? urlFor(thumbnail).width(1280).height(720).url() 
    : videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
    : '';

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
          <div
            className="relative cursor-pointer group"
            onClick={() => setIsVideoOpen(true)}
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
          <AnimatePresence>
            {isVideoOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
                onClick={() => setIsVideoOpen(false)}
              >
                <motion.div
                  initial={animationVariants['from-center'].initial}
                  animate={animationVariants['from-center'].animate}
                  exit={animationVariants['from-center'].exit}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="relative w-full max-w-4xl aspect-video mx-4 md:mx-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsVideoOpen(false)}
                    className="absolute -top-10 right-0 text-white text-xl bg-neutral-900/50 ring-1 backdrop-blur-md rounded-full p-2 dark:bg-neutral-100/50 dark:text-black"
                  >
                    <X className="size-5" />
                    <span className="sr-only">Close video</span>
                  </button>
                  <div className="size-full border-2 border-white rounded-2xl overflow-hidden isolate z-[1] relative">
                    <iframe
                      src={embedUrl}
                      className="size-full rounded-2xl"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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

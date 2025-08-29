// src/components/blocks/animated-blog-post-carousel.tsx
'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export interface AnimatedPost {
  title: string;
  excerpt: string;
  imageUrl: string;
  href: string;
}

const randomRotateY = () => {
  return Math.floor(Math.random() * 21) - 10;
};

const CarouselItem = ({ post, isActive, index, totalPosts }: { post: AnimatedPost; isActive: boolean; index: number; totalPosts: number; }) => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        // Set rotation only on the client side after mount
        setRotation(randomRotateY());
    }, []);

    return (
        <motion.div
            key={`${post.href}-${index}`}
            initial={{
            opacity: 0,
            scale: 0.9,
            z: -100,
            rotate: rotation,
            }}
            animate={{
            opacity: isActive ? 1 : 0.7,
            scale: isActive ? 1 : 0.95,
            z: isActive ? 0 : -100,
            rotate: isActive ? 0 : rotation,
            zIndex: isActive ? 999 : totalPosts + 2 - index,
            y: isActive ? [0, -40, 0] : 0,
            }}
            exit={{
            opacity: 0,
            scale: 0.9,
            z: 100,
            rotate: rotation,
            }}
            transition={{
            duration: 0.4,
            ease: "easeInOut",
            }}
            className="absolute inset-0 origin-bottom"
        >
            <Link href={post.href}>
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-lg"
                />
            </Link>
        </motion.div>
    );
};


export function AnimatedBlogPostCarousel({
  posts,
  autoplay = false,
  className,
}: {
  posts: AnimatedPost[];
  autoplay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + posts.length) % posts.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, posts.length]);

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {posts.map((post, index) => (
                <CarouselItem 
                    key={`${post.href}-${index}`} 
                    post={post} 
                    isActive={index === active} 
                    index={index} 
                    totalPosts={posts.length}
                />
            ))}
          </AnimatePresence>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold text-foreground">
                <Link href={posts[active].href}>{posts[active].title}</Link>
            </h3>
            <motion.p className="text-lg text-muted-foreground mt-4">
              {posts[active].excerpt.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
            <Button asChild className="mt-6">
                <Link href={posts[active].href}>Read More</Link>
            </Button>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

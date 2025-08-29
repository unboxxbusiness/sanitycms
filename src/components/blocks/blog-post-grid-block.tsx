// src/components/blocks/blog-post-grid-block.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    coverImage: any;
    author: {
        name: string;
    };
    _createdAt: string;
}

interface BlogPostGridBlockProps {
    heading?: string;
    subheading?: string;
    posts: Post[]; // These are references, so we'll need to fetch the full data
}

interface AnimatedPost {
  title: string;
  excerpt: string;
  imageUrl: string;
  href: string;
}

async function fetchPosts(postReferences: {_ref: string}[]): Promise<Post[]> {
    if (!postReferences || postReferences.length === 0) {
        return [];
    }

    const postIds = postReferences.map(ref => ref._ref);
    const query = `*[_type == "post" && _id in $postIds]{
        _id,
        title,
        slug,
        excerpt,
        coverImage,
        author->{name},
        _createdAt
    }`;
    const data = await client.fetch(query, { postIds });
    
    // Reorder fetched posts to match the order in Sanity
    return postIds.map(id => data.find((post: Post) => post._id === id)).filter(Boolean);
}

const AnimatedPostCarousel = ({
  posts,
  autoplay = false,
  className,
}: {
  posts: AnimatedPost[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, posts.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post.imageUrl}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index) ? 999 : posts.length + 2 - index,
                  y: isActive(index) ? [0, -40, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
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


export async function BlogPostGridBlock({ heading, subheading, posts: postRefs }: BlogPostGridBlockProps) {
    const posts = await fetchPosts(postRefs as any);

    if (!posts || posts.length === 0) {
        return null;
    }

    const animatedPosts: AnimatedPost[] = posts.map(post => ({
        title: post.title,
        excerpt: post.excerpt,
        imageUrl: urlFor(post.coverImage).width(500).height(500).url(),
        href: `/blog/${post.slug.current}`
    }));

    return (
        <section className="py-20 md:py-28 bg-secondary/20">
            <div className="container mx-auto px-4">
                {(heading || subheading) && (
                    <div className="text-center mb-16">
                        {heading && <h2 className="text-4xl md:text-5xl font-bold">{heading}</h2>}
                        {subheading && (
                            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                                {subheading}
                            </p>
                        )}
                    </div>
                )}
                
                <AnimatedPostCarousel posts={animatedPosts} autoplay={true} />

            </div>
        </section>
    );
}
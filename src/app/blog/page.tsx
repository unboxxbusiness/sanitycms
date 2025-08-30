// src/app/blog/page.tsx
'use client'

import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { MoveRight, User } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

interface SanityPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    coverImage: any;
    author: {
        name: string;
        picture?: any;
    };
    categories?: { title: string }[];
    _createdAt: string;
    views?: number;
    readTime?: number;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  href: string;
  views: number;
  readTime?: number;
  authorName: string;
  className?: string;
}

async function getPosts(): Promise<SanityPost[]> {
    const query = `*[_type == "post"] | order(_createdAt desc){
        _id,
        title,
        slug,
        excerpt,
        coverImage,
        author->{name, picture},
        "categories": categories[]->{title},
        _createdAt,
        views,
        readTime
    }`;
    const data = await client.fetch(query);
    return data;
}

const GridSection = ({
    title,
    description,
    backgroundLabel,
    backgroundPosition = "left",
    posts = [],
    className,
  }: {
  title: string;
  description: string;
  backgroundLabel?: string;
  backgroundPosition?: "left" | "right";
  posts?: BlogPost[];
  className?: string;
}) => {

  return (
    <section className={cn(
      "container relative my-20 py-10 mx-auto px-4",
      className
    )}>
      <h1 className="text-center text-4xl font-semibold capitalize !leading-[1.4] md:text-5xl lg:text-6xl mb-2">
        {title}
      </h1>
      
      {backgroundLabel && (
        <span
          className={cn(
            "absolute -top-10 -z-50 select-none text-[180px] font-extrabold leading-[1] text-black/[0.03] md:text-[250px] lg:text-[400px] text-foreground/[0.025]",
            backgroundPosition === "left" ? "-left-[18%]" : "-right-[28%]"
          )}
        >
          {backgroundLabel}
        </span>
      )}
      
      <p className="mx-auto max-w-[800px] text-center text-xl !leading-[2] text-foreground/50 md:text-2xl mb-8">
        {description}
      </p>
      
      <div className="grid h-auto grid-cols-1 gap-5 md:h-[650px] md:grid-cols-2 lg:grid-cols-[1fr_0.5fr]">
        {posts.map((post, index) => {
          const {
            id,
            title: postTitle,
            category,
            imageUrl,
            href,
            views,
            readTime,
            authorName,
            className: postClassName
          } = post;
          
          const isPrimary = index === 0;

          return (
            <Link
              key={id || index}
              href={href}
              style={{ backgroundImage: `url(${imageUrl})` }}
              className={cn(
                "group relative row-span-1 flex size-full cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat p-5 text-white max-md:h-[300px] transition-all duration-300 hover:scale-[0.98] hover:rotate-[0.3deg]",
                isPrimary && "col-span-1 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-1",
                postClassName
              )}
            >
              <div className="absolute inset-0 -z-0 h-[130%] w-full bg-gradient-to-t from-black/80 to-transparent transition-all duration-500 group-hover:h-full" />
              
              <article className="relative z-0 flex items-end">
                <div className="flex flex-1 flex-col gap-3">
                  <h1 className="text-3xl font-semibold md:text-4xl">
                    {postTitle}
                  </h1>
                  <div className="flex flex-col gap-3">
                    <span className="text-base capitalize py-px px-2 rounded-md bg-white/40 w-fit text-white backdrop-blur-md">{category}</span>
                    <div className="flex items-center gap-4 text-lg font-thin">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <span>{authorName}</span>
                        </div>
                        <span>•</span>
                        <span>{views} Views</span>
                    </div>
                    {readTime && (
                      <div className="text-xl font-semibold">
                        {readTime} min read
                      </div>
                    )}
                  </div>
                </div>
                <MoveRight
                  className="transition-all duration-300 group-hover:translate-x-2"
                  color="white"
                  width={40}
                  height={40}
                  strokeWidth={1.25}
                />
              </article>
            </Link>
          );
        })}
      </div>
    </section>  
    );
};


export default function BlogIndexPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    
    useEffect(() => {
        const fetchAndSetPosts = async () => {
            const sanityPosts = await getPosts();
            const formattedPosts = sanityPosts.map((post, index) => ({
                id: post._id,
                title: post.title,
                category: post.categories?.[0]?.title || 'Insight',
                imageUrl: post.coverImage ? urlFor(post.coverImage).width(800).height(600).url() : 'https://picsum.photos/800/600',
                href: `/blog/${post.slug.current}`,
                views: post.views || Math.floor(Math.random() * 2000) + 100, // Use Sanity data or fallback
                authorName: post.author?.name || "AmulyaX Team",
                readTime: post.readTime, // Use Sanity data
                className: index === 1 ? 'lg:col-start-2' : ''
            }));
            setPosts(formattedPosts);
        };
        fetchAndSetPosts();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full">
                <GridSection
                    title="Latest Articles"
                    description="Explore our latest articles, insights, and stories. We cover a range of topics from technology to social impact."
                    posts={posts.slice(0, 3)} // We are only showing 3 posts in this layout
                    backgroundLabel="Blog"
                />
            </main>
            <Footer />
        </div>
    )
}

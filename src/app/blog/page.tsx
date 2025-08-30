// src/app/blog/page.tsx
'use client'

import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { MoveRight, User, ArrowLeft, ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PostCard, type PostCardData } from '@/components/post-card';
import { SocialShare } from '@/components/social-share';

interface SanityPost extends PostCardData {
    excerpt: string;
    readTime?: number;
    views?: number;
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

interface BlogPageSettings {
    blogPageHeading?: string;
    blogPageSubheading?: string;
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

async function getSettings(): Promise<BlogPageSettings> {
    const query = `*[_type == "settings"][0]{
        blogPageHeading,
        blogPageSubheading
    }`;
    const data = await client.fetch(query);
    return data || {};
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
            "absolute -top-10 -z-50 select-none text-[180px] font-extrabold leading-[1] text-foreground/[0.025] md:text-[250px] lg:text-[400px]",
            backgroundPosition === "left" ? "-left-[18%]" : "-right-[28%]"
          )}
        >
          {backgroundLabel}
        </span>
      )}
      
      <p className="mx-auto max-w-[800px] text-center text-xl !leading-[2] text-muted-foreground md:text-2xl mb-8">
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
              className={cn(
                "group relative row-span-1 flex size-full cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-white max-md:h-[300px] transition-all duration-300 hover:scale-[0.98] hover:rotate-[0.3deg]",
                isPrimary && "col-span-1 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-1",
                postClassName
              )}
            >
              <Image 
                src={imageUrl} 
                alt={postTitle} 
                fill 
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 -z-0 h-[130%] w-full bg-gradient-to-t from-black/80 to-transparent transition-all duration-500 group-hover:h-full" />
              
              <article className="relative z-0 flex items-end p-5 text-white">
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
    const [allPosts, setAllPosts] = useState<SanityPost[]>([]);
    const [settings, setSettings] = useState<BlogPageSettings>({});
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;
    
    useEffect(() => {
        const fetchAndSetData = async () => {
            const [sanityPosts, sanitySettings] = await Promise.all([getPosts(), getSettings()]);
            setAllPosts(sanityPosts);
            setSettings(sanitySettings);
        };
        fetchAndSetData();
    }, []);

    const featuredPosts: BlogPost[] = allPosts.slice(0, 3).map((post, index) => ({
        id: post._id,
        title: post.title,
        category: post.categories?.[0]?.title || 'Insight',
        imageUrl: post.coverImage ? urlFor(post.coverImage).width(800).height(600).url() : 'https://picsum.photos/800/600',
        href: `/blog/${post.slug.current}`,
        views: post.views || Math.floor(Math.random() * 2000) + 100, // Fallback
        authorName: post.author?.name || "AmulyaX Team",
        readTime: post.readTime,
        className: index === 1 ? 'lg:col-start-2' : ''
    }));

    const olderPosts = allPosts.slice(3);
    const totalOlderPosts = olderPosts.length;
    const totalPages = Math.ceil(totalOlderPosts / postsPerPage);
    const paginatedPosts = olderPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full">
                <GridSection
                    title={settings?.blogPageHeading || "Latest Articles"}
                    description={settings?.blogPageSubheading || "Explore our latest articles, insights, and stories. We cover a range of topics from technology to social impact."}
                    posts={featuredPosts}
                    backgroundLabel="Blog"
                />

                {olderPosts.length > 0 && (
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Older Posts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedPosts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-12">
                                    <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="outline">
                                        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="outline">
                                        Next <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </main>
            <Footer />
            <SocialShare />
        </div>
    )
}

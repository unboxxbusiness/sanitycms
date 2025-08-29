// src/app/blog/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PostCard, type Post } from '@/components/post-card';
import { Skeleton } from '@/components/ui/skeleton';

async function getPosts(): Promise<Post[]> {
    const query = `*[_type == "post"] | order(_createdAt desc){
        _id,
        title,
        slug,
        excerpt,
        coverImage,
        author->{name, picture},
        "categories": categories[]->{title},
        _createdAt
    }`;
    const data = await client.fetch(query);
    return data;
}

export default function BlogIndexPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const featuredPost = !loading && posts.length > 0 ? posts[0] : null;
    const otherPosts = !loading && posts.length > 1 ? posts.slice(1) : [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full py-20 lg:py-32">
                <div className="container mx-auto flex flex-col gap-16 px-4">
                    <div className="flex w-full flex-col text-center items-center gap-4">
                        <h1 className="text-4xl md:text-6xl tracking-tighter max-w-2xl font-bold">
                            Our Blog
                        </h1>
                        <p className="text-lg max-w-2xl text-muted-foreground">
                           Latest news, insights, and stories from our mission to empower students across India.
                        </p>
                    </div>
                    
                    {loading && (
                        <>
                            <div className="w-full">
                                <div className="flex flex-col md:flex-row md:gap-8">
                                    <Skeleton className="aspect-video rounded-md md:w-1/2" />
                                    <div className="md:w-1/2 flex flex-col justify-center gap-4 mt-4 md:mt-0">
                                        <Skeleton className="h-6 w-1/4" />
                                        <Skeleton className="h-8 w-full" />
                                        <Skeleton className="h-8 w-5/6" />
                                        <Skeleton className="h-20 w-full" />
                                        <div className="flex items-center gap-4 mt-4">
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                            <Skeleton className="h-6 w-1/3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border-b my-8" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex flex-col gap-4">
                                        <Skeleton className="aspect-video rounded-md" />
                                        <Skeleton className="h-6 w-1/4" />
                                        <Skeleton className="h-8 w-full" />
                                        <Skeleton className="h-20 w-full" />
                                        <div className="flex items-center gap-4 mt-4">
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                            <Skeleton className="h-6 w-1/3" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    
                    {!loading && featuredPost && (
                        <div className="w-full">
                            <PostCard post={featuredPost} featured={true} />
                        </div>
                    )}
                    
                    {!loading && otherPosts.length > 0 && <div className="w-full border-b my-8" />}

                    {!loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {otherPosts.map((post) => (
                               <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                    )}

                    {!loading && posts.length === 0 && (
                        <p className="text-center text-muted-foreground">No blog posts found.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

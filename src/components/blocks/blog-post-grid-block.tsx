// src/components/blocks/blog-post-grid-block.tsx
import React from 'react';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import Image from 'next/image';
import Link from 'next/link';

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

export async function BlogPostGridBlock({ heading, subheading, posts: postRefs }: BlogPostGridBlockProps) {
    const posts = await fetchPosts(postRefs as any);

    if (!posts || posts.length === 0) {
        return null;
    }

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block">
                            <div className="bg-card rounded-lg overflow-hidden shadow-md h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                                {post.coverImage && (
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={urlFor(post.coverImage).width(400).height(250).url()}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                                    <p className="text-muted-foreground text-sm flex-1">{post.excerpt}</p>
                                    <div className="mt-4 text-xs text-muted-foreground">
                                        <span>By {post.author?.name || 'AmulyaX Team'}</span> | <span>{new Date(post._createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

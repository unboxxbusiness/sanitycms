// src/app/blog/page.tsx
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';

export const revalidate = 60 // revalidate at most every minute

export const metadata: Metadata = {
    title: 'Blog | AmulyaX India',
    description: 'Read the latest articles and insights from the team at AmulyaX India.',
};

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

async function getPosts(): Promise<Post[]> {
    const query = `*[_type == "post"] | order(_createdAt desc){
        _id,
        title,
        slug,
        excerpt,
        coverImage,
        author->{name},
        _createdAt
    }`;
    const data = await client.fetch(query);
    return data;
}

export default async function BlogIndexPage() {
    const posts = await getPosts();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 py-24 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold">Our Blog</h1>
                        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                            Latest news, insights, and stories from our mission to empower students across India.
                        </p>
                    </div>

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
                                        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
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
            </main>
            <Footer />
        </div>
    )
}
// src/app/blog/page.tsx
import { client } from '@/lib/sanity';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';
import { PostCard, type Post } from '@/components/post-card';

export const revalidate = 60 // revalidate at most every minute

export const metadata: Metadata = {
    title: 'Blog | AmulyaX India',
    description: 'Read the latest articles and insights from the team at AmulyaX India.',
};

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

export default async function BlogIndexPage() {
    const posts = await getPosts();
    const featuredPost = posts.length > 0 ? posts[0] : null;
    const otherPosts = posts.length > 1 ? posts.slice(1) : [];

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
                    
                    {featuredPost && (
                        <div className="w-full">
                            <PostCard post={featuredPost} featured={true} />
                        </div>
                    )}
                    
                    {otherPosts.length > 0 && <div className="w-full border-b my-8" />}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {otherPosts.map((post) => (
                           <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
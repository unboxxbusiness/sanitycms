// src/app/blog/page.tsx
import { client } from '@/lib/sanity';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PostCard, type PostCardData } from '@/components/post-card';
import type { Metadata } from 'next';

export const revalidate = 60 // revalidate at most every minute

export const metadata: Metadata = {
    title: 'Blog | AmulyaX India',
    description: 'Read the latest articles and insights from the team at AmulyaX India.',
};

async function getPosts(): Promise<PostCardData[]> {
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
            <main className="flex-1 w-full py-20 lg:py-40">
                <div className="container mx-auto flex flex-col gap-14">
                    <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
                        <h1 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
                            Latest articles
                        </h1>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredPost && (
                            <div className="md:col-span-2">
                                <PostCard post={featuredPost} featured={true} />
                            </div>
                        )}
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
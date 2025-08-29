// src/app/blog/page.tsx
import { client } from '@/lib/sanity';
import { PostCard, type Post } from '@/components/post-card';
import type { Metadata } from 'next';

const POSTS_PER_PAGE = 9;

interface BlogPageData {
    posts: Post[];
    total: number;
    heading?: string;
    subheading?: string;
}

async function getPaginatedPosts(page: number): Promise<BlogPageData> {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    
    const query = `{
        "posts": *[_type == "post"] | order(_createdAt desc)[${start}...${end}]{
            _id,
            title,
            slug,
            excerpt,
            coverImage,
            author->{name, picture},
            "categories": categories[]->{title},
            _createdAt
        },
        "total": count(*[_type == "post"]),
        "heading": *[_type == "settings"][0].blogPageHeading,
        "subheading": *[_type == "settings"][0].blogPageSubheading
    }`;
    const data = await client.fetch(query);
    return data;
}

export async function generateMetadata(): Promise<Metadata> {
    const settings = await client.fetch(`*[_type == "settings"][0]{ blogPageHeading, blogPageSubheading }`);
    return {
        title: settings?.blogPageHeading || 'Blog',
        description: settings?.blogPageSubheading || 'Latest news, insights, and stories.',
    };
}

export default async function BlogIndexPage() {
    const { posts, total, heading, subheading } = await getPaginatedPosts(1);

    const featuredPost = posts.length > 0 ? posts[0] : null;
    const otherPosts = posts.length > 1 ? posts.slice(1) : [];

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 w-full py-20 lg:py-32">
                <div className="container mx-auto flex flex-col gap-12 px-4">
                    <div className="flex w-full flex-col text-center items-center gap-4">
                        <h1 className="text-4xl md:text-6xl tracking-tighter max-w-3xl font-bold">
                            {heading || 'Our Blog'}
                        </h1>
                        <p className="text-lg max-w-2xl text-muted-foreground">
                           {subheading || 'Latest news, insights, and stories from our mission to empower students across India.'}
                        </p>
                    </div>
                    
                    {posts.length === 0 ? (
                        <p className="text-center text-muted-foreground">No blog posts found.</p>
                    ) : (
                        <>
                            {featuredPost && (
                                <>
                                    <div className="w-full">
                                        <PostCard post={featuredPost} featured={true} />
                                    </div>
                                    <div className="w-full border-b my-8" />
                                </>
                            )}
                            
                            {otherPosts.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                    {otherPosts.map((post) => (
                                       <PostCard key={post._id} post={post} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

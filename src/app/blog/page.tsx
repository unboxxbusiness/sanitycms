// src/app/blog/page.tsx
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
        picture?: any;
    };
    categories?: { title: string }[];
    _createdAt: string;
}

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

const PostCard = ({ post, featured = false }: { post: Post, featured?: boolean }) => {
    return (
        <Link href={`/blog/${post.slug.current}`} className="flex flex-col gap-4 hover:opacity-75 cursor-pointer group">
            {post.coverImage ? (
                 <div className="relative bg-muted rounded-md aspect-video overflow-hidden">
                    <Image 
                        src={urlFor(post.coverImage).url()} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            ) : (
                <div className="bg-muted rounded-md aspect-video"></div>
            )}
            <div className="flex flex-row gap-4 items-center">
                {post.categories && post.categories[0] && (
                    <Badge variant="secondary">{post.categories[0].title}</Badge>
                )}
                <p className="flex flex-row gap-2 text-sm items-center">
                    <span className="text-muted-foreground">By</span>{" "}
                    <Avatar className="h-6 w-6">
                        {post.author.picture ? (
                           <AvatarImage src={urlFor(post.author.picture).width(24).height(24).url()} />
                        ) : (
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${post.author.name}&size=24`} />
                        )}
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{post.author.name}</span>
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className={featured ? "max-w-3xl text-4xl tracking-tight" : "max-w-3xl text-2xl tracking-tight"}>
                    {post.title}
                </h3>
                <p className="max-w-3xl text-muted-foreground text-base">
                    {post.excerpt}
                </p>
            </div>
        </Link>
    )
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

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
    const postDate = new Date(post._createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <article className={cn(
            "flex flex-col group",
            featured ? "md:flex-row md:gap-8" : "gap-4"
        )}>
            {post.coverImage && (
                <Link href={`/blog/${post.slug.current}`} className={cn(
                    "block overflow-hidden rounded-md",
                    featured ? "md:w-1/2" : ""
                )}>
                    <div className={cn(
                        "relative bg-muted aspect-video",
                    )}>
                        <Image
                            src={urlFor(post.coverImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </Link>
            )}
            <div className={cn(
                "flex flex-col",
                featured ? "md:w-1/2 justify-center" : "gap-2"
            )}>
                {post.categories && post.categories[0] && (
                     <div className="flex gap-2">
                        <Link href="#">
                            <Badge variant="secondary">{post.categories[0].title}</Badge>
                        </Link>
                     </div>
                )}
                <h3 className={cn(
                    "font-bold tracking-tight",
                    featured ? "text-3xl lg:text-4xl" : "text-2xl"
                )}>
                    <Link href={`/blog/${post.slug.current}`} className="hover:text-primary transition-colors">
                        {post.title}
                    </Link>
                </h3>
                <p className={cn("text-muted-foreground", featured ? "text-base mt-2" : "text-sm")}>
                    {post.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                         <Avatar className="h-8 w-8">
                            {post.author.picture ? (
                               <AvatarImage src={urlFor(post.author.picture).width(32).height(32).url()} />
                            ) : (
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${post.author.name}&size=32`} />
                            )}
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{post.author.name}</span>
                    </div>
                    <time dateTime={post._createdAt} className="text-muted-foreground">{postDate}</time>
                </div>
            </div>
        </article>
    )
}

export default async function BlogIndexPage() {
    const posts = await getPosts();
    const featuredPost = posts.length > 0 ? posts[0] : null;
    const otherPosts = posts.length > 1 ? posts.slice(1) : [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full py-20 lg:py-32">
                <div className="container mx-auto flex flex-col gap-16">
                    <div className="flex w-full flex-col text-center items-center gap-4">
                        <h1 className="text-4xl md:text-6xl tracking-tighter max-w-2xl font-bold">
                            AmulyaX Blog
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
                    
                    {otherPosts.length > 0 && <div className="w-full border-b" />}

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

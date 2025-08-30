// src/components/post-card.tsx
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity-image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface PostCardData {
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

interface PostCardProps {
    post: PostCardData;
    featured?: boolean;
}

export const PostCard = ({ post, featured = false }: PostCardProps) => {
    return (
        <Link href={`/blog/${post.slug.current}`} className="flex flex-col gap-4 hover:opacity-75 cursor-pointer group">
            {post.coverImage ? (
                 <div className="relative bg-muted rounded-md aspect-video overflow-hidden">
                    <Image 
                        src={urlFor(post.coverImage).url()} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint="blog image"
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
                <h3 className={featured ? "max-w-3xl text-3xl md:text-4xl tracking-tight" : "max-w-3xl text-2xl tracking-tight"}>
                    {post.title}
                </h3>
                <p className="max-w-3xl text-muted-foreground text-base">
                    {post.excerpt}
                </p>
            </div>
        </Link>
    )
}
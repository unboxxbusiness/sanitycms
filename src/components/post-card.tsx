// src/components/post-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity-image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

export interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    coverImage: any;
    author: {
        name:string;
        picture?: any;
    };
    categories?: { title: string }[];
    _createdAt: string;
}

export const PostCard = ({ post, featured = false }: { post: Post, featured?: boolean }) => {
    const postDate = new Date(post._createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const truncatedExcerpt = post.excerpt && post.excerpt.length > 150
        ? post.excerpt.substring(0, 150) + '...'
        : post.excerpt;

    return (
        <article key={post._id} className={cn(
            "flex flex-col group",
            featured ? "md:flex-row md:gap-8" : "gap-4"
        )}>
            {post.coverImage && (
                <Link
                    href={`/blog/${post.slug.current}`}
                    className={cn(
                        "block overflow-hidden rounded-md relative aspect-video",
                        featured ? "md:w-1/2" : ""
                    )}
                >
                    <Image
                        src={urlFor(post.coverImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            )}
            <div className={cn(
                "flex flex-col",
                featured ? "md:w-1/2 justify-center" : "gap-2 mt-4"
            )}>
                {post.categories && post.categories[0] && (
                     <div className="flex gap-2">
                        <Badge variant="secondary">{post.categories[0].title}</Badge>
                     </div>
                )}
                <h3 className={cn(
                    "font-bold tracking-tight",
                    featured ? "text-3xl lg:text-4xl" : "text-xl"
                )}>
                    <Link href={`/blog/${post.slug.current}`} className="hover:text-primary transition-colors">
                        {post.title}
                    </Link>
                </h3>
                <p className={cn("text-muted-foreground", featured ? "text-base mt-2" : "text-sm")}>
                    {truncatedExcerpt}
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

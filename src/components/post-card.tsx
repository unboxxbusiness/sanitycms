// src/components/post-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity-image';
<<<<<<< HEAD
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Badge } from './ui/badge';

export interface PostCardData {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage: SanityImageSource;
  author: {
    name: string;
    picture?: SanityImageSource;
  };
  categories?: { title: string }[];
  _createdAt: string;
}

interface PostCardProps {
  post: PostCardData;
}

export function PostCard({ post }: PostCardProps) {
  const postUrl = `/blog/${post.slug.current}`;

  return (
    <Link href={postUrl} className="group block overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-video">
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).width(400).height(225).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <span className="text-sm text-muted-foreground">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        {post.categories && post.categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((cat) => (
              <Badge key={cat.title} variant="secondary">
                {cat.title}
              </Badge>
            ))}
          </div>
        )}
        <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
            </p>
        )}
        <div className="mt-4 flex items-center text-xs text-muted-foreground">
          {post.author?.picture && (
            <Image
              src={urlFor(post.author.picture).width(24).height(24).url()}
              alt={post.author.name}
              width={24}
              height={24}
              className="mr-2 rounded-full"
            />
          )}
          <span className="font-medium">{post.author?.name || 'AmulyaX Team'}</span>
          <span className="mx-1.5">•</span>
          <time dateTime={post._createdAt}>
            {new Date(post._createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>
    </Link>
  );
=======
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
            featured ? "gap-4 md:flex-row md:gap-8" : "gap-4"
        )}>
            {post.coverImage && (
                <Link
                    href={`/blog/${post.slug.current}`}
                    className={cn(
                        "block overflow-hidden rounded-md relative aspect-video shrink-0",
                        featured ? "md:w-1/2" : ""
                    )}
                >
                    <Image
                        src={urlFor(post.coverImage).width(800).height(450).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            )}
            <div className={cn(
                "flex flex-col",
                featured ? "md:w-1/2 justify-center" : "gap-2"
            )}>
                {post.categories && post.categories[0] && (
                     <div className="flex gap-2">
                        <Badge variant="secondary">{post.categories[0].title}</Badge>
                     </div>
                )}
                <h3 className={cn(
                    "font-bold tracking-tight mt-2",
                    featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl"
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
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
}

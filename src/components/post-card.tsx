// src/components/post-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity-image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Badge } from './ui/badge';

export interface PostCardData {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
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
}

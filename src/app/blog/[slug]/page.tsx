// src/app/blog/[slug]/page.tsx
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PortableText } from '@portabletext/react';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BlockRenderer } from '@/components/block-renderer';
import { AuthorBio } from '@/components/author-bio';
import { PostCard, type PostCardData } from '@/components/post-card';
import { SocialShare } from '@/components/social-share';

export const revalidate = 60

interface PostData {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: any;
  author: {
    name: string;
    picture?: any;
    bio?: string;
  };
  categories: { title: string }[];
  _createdAt: string;
  content: any[];
  excerpt?: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  recommendedPosts: PostCardData[];
}

interface PostProps {
  params: {
    slug: string;
  };
}

async function getPostData(slug: string): Promise<PostData> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    coverImage,
    author->{name, picture, bio},
    "categories": categories[]->{title},
    _createdAt,
    excerpt,
    content[]{
      ...,
      _type == 'reference' => @->{
        ...,
        content[]{
          ...,
          _type == 'ctaBlock' => {
            ...
          },
          _type == 'donationBlock' => {
            ...,
            "donationTiers": donationTiers[]->{
              ...
            }
          }
        }
      }
    },
    seo,
    // Fetch 2 most recent posts that are not the current post
    "recommendedPosts": *[_type == "post" && slug.current != $slug] | order(_createdAt desc)[0...2]{
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      author->{name, picture},
      "categories": categories[]->{title},
      _createdAt
    }
  }`;

  const data = await client.fetch(query, { slug });
  return data;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
    const post = await getPostData(params.slug);
    if (!post) {
      return {
        title: 'Post Not Found',
      }
    }
    
    const title = post.seo?.metaTitle || post.title;
    const description = post.seo?.metaDescription || post.excerpt;

    const openGraphImages = post.coverImage ? [
        {
          url: urlFor(post.coverImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [];

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `/blog/${post.slug.current}`,
        images: openGraphImages,
      }
    };
}

const portableTextComponents = {
    types: {
        image: ({ value }: any) => (
            <div className="my-8">
                <Image 
                    src={urlFor(value).url()} 
                    alt={value.alt || 'Blog post image'} 
                    width={800} 
                    height={450}
                    className="rounded-lg mx-auto"
                />
            </div>
        ),
        reusableBlock: ({ value }: any) => {
          if (!value?.content) {
            return null;
          }
          // The reusableBlock content is an array of blocks, so we render it with our main block renderer.
          return <BlockRenderer blocks={value.content} />;
        },
        videoBlock: ({ value }: any) => {
            return <BlockRenderer blocks={[value]} />;
        },
        donationBlock: ({ value }: any) => {
            return <BlockRenderer blocks={[value]} />;
        }
    },
    block: {
      h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-12 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-3">{children}</h3>,
      h4: ({ children }: any) => <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>,
      blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-lg">{children}</blockquote>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 my-4 pl-4">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 my-4 pl-4">{children}</ol>,
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
            return <a href={value.href} rel={rel} className="text-primary underline hover:no-underline">{children}</a>;
        }
    }
};

export default async function BlogPostPage({ params }: PostProps) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-24 md:py-32">
        <article className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8">
              <Button asChild variant="ghost">
                <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to all posts</span>
                </Link>
              </Button>
            </div>
            {post.coverImage && (
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={urlFor(post.coverImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 896px"
                    />
                </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-8">
                {post.author?.picture && (
                    <Image
                        src={urlFor(post.author.picture).width(40).height(40).url()}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                    />
                )}
                <span>By {post.author?.name || 'AmulyaX Team'}</span>
                <span className="mx-2">|</span>
                <span>{new Date(post._createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                {post.categories && (
                    <>
                        <span className="mx-2">|</span>
                        <div className="flex gap-2">
                            {post.categories.map(cat => (
                                <span key={cat.title} className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">{cat.title}</span>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className={cn(
                "prose prose-lg max-w-none dark:prose-invert",
                "prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ol:text-muted-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
            )}>
                <PortableText value={post.content} components={portableTextComponents} />
            </div>

            {post.author?.bio && (
              <>
                <hr className="my-12" />
                <AuthorBio author={post.author} />
              </>
            )}

            {post.recommendedPosts?.length > 0 && (
                <aside className="mt-16 pt-12 border-t">
                    <h2 className="text-3xl font-bold mb-8 text-center">Read Next</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {post.recommendedPosts.map(recPost => (
                            <PostCard key={recPost._id} post={recPost} />
                        ))}
                    </div>
                </aside>
            )}
        </article>
      </main>
      <Footer />
      <SocialShare />
    </div>
  );
}


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

export const revalidate = 60

interface PostData {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: any;
  author: {
    name: string;
    picture?: any;
  };
  categories: { title: string }[];
  _createdAt: string;
  content: any[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  }
}

interface PostProps {
  params: {
    slug: string;
  };
}

// Function to generate static paths
export async function generateStaticParams() {
    const posts = await client.fetch<Pick<PostData, 'slug'>[]>(`*[_type == "post" && defined(slug.current)]{ slug }`);
    return posts.map(post => ({
        slug: post.slug.current,
    }));
}

async function getPostData(slug: string): Promise<PostData> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    coverImage,
    author->{name, picture},
    "categories": categories[]->{title},
    _createdAt,
    content,
    seo
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
    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription,
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
        )
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
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8">
                <Button asChild variant="ghost">
                    <Link href="/blog">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all posts
                    </Link>
                </Button>
            </div>
            <article>
                {post.coverImage && (
                    <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={urlFor(post.coverImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
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
                    <span>By {post.author?.name || 'AmulyaX India Team'}</span>
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
            </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// src/components/blocks/blog-post-grid-block.tsx
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import { AnimatedBlogPostCarousel, type AnimatedPost } from './animated-blog-post-carousel';

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    coverImage: any;
    author: {
        name: string;
    };
    _createdAt: string;
}

interface BlogPostGridBlockProps {
    heading?: string;
    subheading?: string;
    posts: Post[]; // These are references, so we'll need to fetch the full data
}

async function fetchPosts(postReferences: {_ref: string}[]): Promise<Post[]> {
    if (!postReferences || postReferences.length === 0) {
        return [];
    }

    const postIds = postReferences.map(ref => ref._ref);
    const query = `*[_type == "post" && _id in $postIds]{
        _id,
        title,
        slug,
        excerpt,
        coverImage,
        author->{name},
        _createdAt
    }`;
    const data = await client.fetch(query, { postIds });
    
    // Reorder fetched posts to match the order in Sanity
    return postIds.map(id => data.find((post: Post) => post._id === id)).filter(Boolean) as Post[];
}


export async function BlogPostGridBlock({ heading, subheading, posts: postRefs }: BlogPostGridBlockProps) {
    const posts = await fetchPosts(postRefs as any);

    if (!posts || posts.length === 0) {
        return null;
    }

    const animatedPosts: AnimatedPost[] = posts.map(post => {
        const truncatedExcerpt = post.excerpt.length > 50 
            ? post.excerpt.substring(0, 50) + '...' 
            : post.excerpt;
        
        return {
            title: post.title,
            excerpt: truncatedExcerpt,
            imageUrl: urlFor(post.coverImage).width(500).height(500).url(),
            href: `/blog/${post.slug.current}`
        }
    });

    return (
        <section className="py-20 md:py-28 bg-secondary/20">
            <div className="container mx-auto px-4">
                {(heading || subheading) && (
                    <div className="text-center mb-16">
                        {heading && <h2 className="text-4xl md:text-5xl font-bold">{heading}</h2>}
                        {subheading && (
                            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                                {subheading}
                            </p>
                        )}
                    </div>
                )}
                
                <AnimatedBlogPostCarousel posts={animatedPosts} autoplay={true} />

            </div>
        </section>
    );
}

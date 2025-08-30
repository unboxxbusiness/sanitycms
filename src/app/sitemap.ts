// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://amulyax.com';

interface Post {
    slug: { current: string };
    _updatedAt: string;
}

interface Page {
    slug: { current: string };
    _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all posts and pages
    const query = `
    {
        "posts": *[_type == "post" && defined(slug.current)]{ slug, _updatedAt },
        "pages": *[_type == "page" && defined(slug.current)]{ slug, _updatedAt }
    }
    `;
    const { posts, pages } = await client.fetch<{ posts: Post[], pages: Page[] }>(query);

    const postUrls = posts.map(post => ({
        url: `${BASE_URL}/blog/${post.slug.current}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const pageUrls = pages.map(page => ({
        url: `${BASE_URL}/${page.slug.current}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // Add static pages
    const staticUrls = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ];

    return [
        ...staticUrls,
        ...postUrls,
        ...pageUrls,
    ];
}

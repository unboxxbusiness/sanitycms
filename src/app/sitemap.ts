// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

<<<<<<< HEAD
interface Page {
    slug: { current: string };
    _updatedAt: string;
}
=======
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://amulyax.com';
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33

interface Post {
    slug: { current: string };
    _updatedAt: string;
}

<<<<<<< HEAD
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Get all pages
  const pages: Page[] = await client.fetch(`*[_type == "page" && defined(slug.current)]{slug, _updatedAt}`);
  
  // Get all blog posts
  const posts: Post[] = await client.fetch(`*[_type == "post" && defined(slug.current)]{slug, _updatedAt}`);

  const pageRoutes = pages.map(page => ({
    url: `${siteUrl}/${page.slug.current}`,
    lastModified: new Date(page._updatedAt).toISOString(),
  }));

  const postRoutes = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt).toISOString(),
  }));

  const staticRoutes = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date().toISOString(),
    }
  ];

  return [
    ...staticRoutes,
    ...pageRoutes,
    ...postRoutes
  ];
=======
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
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
}

// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

interface Page {
    slug: { current: string };
    _updatedAt: string;
}

interface Post {
    slug: { current: string };
    _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Get all pages
  const pages: Page[] = await client.fetch(`*[_type == "page" && defined(slug.current)]{slug, _updatedAt}`);
  
  // Get all blog posts
  const posts: Post[] = await client.fetch(`*[_type == "post" && defined(slug.current)]{slug, _updatedAt}`);

  const pageRoutes = pages.map(page => ({
    url: `${siteUrl}/${page.slug.current}`,
    lastModified: new Date(page._updatedAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const postRoutes = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
  ];

  return [
    ...staticRoutes,
    ...pageRoutes,
    ...postRoutes
  ];
}

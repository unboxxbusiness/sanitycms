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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-production-url.com';
  
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
}

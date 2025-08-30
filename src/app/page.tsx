// src/app/page.tsx
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/components/block-renderer';
import type { Metadata } from 'next';
import { client } from '@/lib/sanity';


export interface HomePageData {
  _id: string;
  title: string;
  pageBuilder: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  }
}

const getHomePageData = () => {
    return sanityFetch<HomePageData>({
        query: `*[_type == "homePage"][0]{
            _id,
            title,
            pageBuilder[]{
              ...,
              _type == 'heroBlock' => {
                ...,
                image {
                  ...,
                  asset->
                }
              },
              _type == 'testimonialsBlock' => {
                ...,
                "testimonials": testimonials[]->{
                  ...,
                  image {
                    ...,
                    asset->
                  }
                }
              },
              _type == 'programCardsBlock' => {
                ...,
                "programs": programs[]->{
                  ...
                }
              },
              _type == 'partnerLogoBlock' => {
                ...,
                "partners": partners[]->{
                  ...,
                  logo {
                    ...,
                    asset->
                  }
                }
              },
              _type == 'impactMetricsBlock' => {
                ...,
                "metrics": metrics[]->
              },
              _type == 'donationBlock' => {
                ...,
                "donationTiers": donationTiers[]->{
                  ...
                }
              }
            }
        }`,
        tags: ['homePage'],
    });
};


export async function generateMetadata(): Promise<Metadata> {
    const page = await getHomePageData();
    const settings = await client.fetch(`*[_type == "settings"][0]{ defaultMetaTitle, defaultMetaDescription }`);
  
    if (!page) {
      return {
        title: settings?.defaultMetaTitle || 'AmulyaX India',
        description: settings?.defaultMetaDescription || 'Innovative Solutions for India',
      };
    }
  
    return {
      title: page.seo?.metaTitle || page.title || settings?.defaultMetaTitle,
      description: page.seo?.metaDescription || settings?.defaultMetaDescription,
    };
}

export default async function Home() {
  const data = await getHomePageData();

  if (!data) {
    // This is a fallback for when Sanity data is not available
    return (
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to AmulyaX India</h1>
        <p>Content is being loaded. Please set up your Sanity project.</p>
        <p className="mt-4">
          <Link href="/studio" className="text-blue-500 hover:underline">
            Go to Sanity Studio
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <BlockRenderer blocks={data.pageBuilder} />
    </main>
  );
}

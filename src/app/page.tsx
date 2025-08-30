// src/app/page.tsx
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/components/block-renderer';
import { SocialShare } from '@/components/social-share';

export interface HomePageData {
  _id: string;
  title: string;
  pageBuilder: any[];
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


export default async function Home() {
  const data = await getHomePageData();

  if (!data || !data.pageBuilder) {
    // This is a fallback for when Sanity data is not available
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to AmulyaX India</h1>
        <p>Content is being loaded. Please set up your Sanity project.</p>
        <p className="mt-4">
          <Link href="/studio" className="text-blue-500 hover:underline">
            Go to Sanity Studio
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BlockRenderer blocks={data.pageBuilder} />
      </main>
      <Footer />
      <SocialShare />
    </div>
  );
}

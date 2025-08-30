// src/app/[slug]/page.tsx
import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlockRenderer } from '@/components/block-renderer';
import type { Metadata } from 'next';
import { SocialShare } from '@/components/social-share';
import { urlFor } from '@/lib/sanity-image';

export const revalidate = 60 // revalidate at most every 60 seconds

interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  pageBuilder: any[];
  heroImage?: any;
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPageData(slug: string): Promise<PageData> {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    "heroImage": pageBuilder[_type == "heroBlock"][0].image,
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
  }`;

  const data = await client.fetch(query, { slug });
  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageData(params.slug);
  if (!page) {
    return {};
  }

  const title = page.seo?.metaTitle || page.title;
  const description = page.seo?.metaDescription;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const openGraphImages = page.heroImage ? [
    {
      url: urlFor(page.heroImage).width(1200).height(630).url(),
      width: 1200,
      height: 630,
      alt: title,
    }
  ] : [];

  return {
    title,
    description,
    alternates: {
        canonical: `${siteUrl}/${page.slug.current}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${page.slug.current}`,
      images: openGraphImages,
    }
  };
}

export default async function Page({ params }: PageProps) {
  const page = await getPageData(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BlockRenderer blocks={page.pageBuilder} />
      </main>
      <Footer />
      <SocialShare />
    </div>
  );
}

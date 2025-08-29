// src/app/[slug]/page.tsx
import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/components/block-renderer';
import type { Metadata } from 'next';

export const revalidate = 60 // revalidate at most every 60 seconds

interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  pageBuilder: any[];
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
  const settings = await client.fetch(`*[_type == "settings"][0]{ defaultMetaTitle, defaultMetaDescription }`);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.seo?.metaTitle || page.title || settings?.defaultMetaTitle,
    description: page.seo?.metaDescription || settings?.defaultMetaDescription,
  };
}

export default async function Page({ params }: PageProps) {
  const page = await getPageData(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <BlockRenderer blocks={page.pageBuilder} />
  );
}

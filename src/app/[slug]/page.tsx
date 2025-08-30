// src/app/[slug]/page.tsx
import { sanityFetch } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/components/block-renderer';
import type { Metadata } from 'next';
import { urlFor } from '@/lib/sanity-image';

interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  pageBuilder: any[];
  heroImage?: any;
}

interface PageProps {
  params: {
    slug: string;
  };
}

const getPageData = (slug: string) => {
    return sanityFetch<PageData>({
        query: `*[_type == "page" && slug.current == $slug][0]{
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
        }`,
        params: { slug },
        tags: [`page:${slug}`],
    });
};

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
    <main className="flex-1">
      <BlockRenderer blocks={page.pageBuilder} />
    </main>
  );
}

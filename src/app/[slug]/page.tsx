// src/app/[slug]/page.tsx
import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlockRenderer } from '@/components/block-renderer';
import type { Metadata } from 'next';

export const revalidate = 30 // revalidate at most every 30 seconds

interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  seo: {
    metaTitle: string;
    metaDescription: string;
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
      }
    }
  }`;

  const data = await client.fetch(query, { slug });
  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageData(params.slug);
  if (!page || !page.seo) {
    return {
      title: 'AmulyaX India',
      description: 'Innovative Solutions for India',
    };
  }
  return {
    title: page.seo.metaTitle,
    description: page.seo.metaDescription,
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
    </div>
  );
}

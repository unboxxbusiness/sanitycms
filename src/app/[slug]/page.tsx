// src/app/[slug]/page.tsx

import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { AboutSection } from '@/components/slices/about-section';
import { CtaSection } from '@/components/slices/cta-section';
import { FeaturesSection } from '@/components/slices/features-section';
import { ImpactSection } from '@/components/slices/impact-section';
import { PartnersSection } from '@/components/slices/partners-section';
import { TestimonialsSection } from '@/components/slices/testimonials-section';
import { RichTextBlock } from '@/components/slices/rich-text-block';
import { ContactForm } from '@/components/contact-form';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

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

// Reusable components map
const componentMap: { [key: string]: React.ComponentType<any> } = {
  about: AboutSection,
  cta: CtaSection,
  features: FeaturesSection,
  impact: ImpactSection,
  partners: PartnersSection,
  testimonials: TestimonialsSection,
  richTextBlock: RichTextBlock,
  contactForm: ContactForm,
};

async function getPageData(slug: string): Promise<PageData> {
  // This query is now much more powerful.
  // It fetches the page and then expands all the references in the pageBuilder array.
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    pageBuilder[]{
      ...,
      // This is the key to resolving the references and getting the full content
      _type == 'reference' => @->{
        ...,
        // If the referenced item itself has references, we expand them too
        "features": features[]->,
        "testimonials": testimonials[]->,
        "impact": impact[]->,
        "partners": partners[]->,
        "about": about->
      }
    }
  }`;

  const data = await client.fetch(query, { slug }, {
    next: { revalidate: 60 }
  });
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
        {page.pageBuilder && page.pageBuilder.map((slice: any) => {
          // The slice could be a direct object (like richTextBlock) or a resolved reference
          const sliceData = slice._type === 'reference' ? slice.dereferenced : slice;
          const Component = componentMap[sliceData?._type] || componentMap[slice._type];
          
          if (!Component) {
            // It's useful to log when a component is missing
            console.warn(`No component found for slice type: ${slice._type}`);
            return null;
          }

          // We pass the whole slice data as props. The component will know what to do with it.
          // Note that for sections that were on the homepage, they might expect the data in a specific prop.
          // e.g., FeaturesSection might expect a 'features' prop.
          const props = {
            features: slice.features,
            testimonials: slice.testimonials,
            about: slice.about,
            impact: slice.impact,
            partners: slice.partners,
            cta: slice.cta,
            ...slice
          };
          
          return <Component key={slice._key || slice._id} {...props} />;
        })}
      </main>
      <Footer />
    </div>
  );
}

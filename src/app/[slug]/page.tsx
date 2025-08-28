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
  featureSection: FeaturesSection,
  impactSection: ImpactSection,
  partnerSection: PartnersSection,
  testimonialSection: TestimonialsSection,
  richTextBlock: RichTextBlock,
  contactForm: ContactForm,
};

async function getPageData(slug: string): Promise<PageData> {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    pageBuilder[]{
      ...,
      _type == 'reference' => @->{
        ...,
        _type == 'featureSection' => {
          "features": features[]->
        },
        _type == 'testimonialSection' => {
          "testimonials": testimonials[]->
        },
        _type == 'impactSection' => {
          "impact": impact[]->
        },
        _type == 'partnerSection' => {
          "partners": partners[]->
        }
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
          const sliceType = slice._type === 'reference' ? slice._ref : slice._type;
          const componentName = slice._type === 'reference' ? (Object.keys(slice).find(k => k !== '_ref' && k !== '_key' && k !== '_type' && k !== 'features' && k !== 'testimonials' && k !== 'impact' && k !== 'partners' && k !== 'about' && k !== 'cta') || sliceType) : slice._type;
          
          let Component;
          let props: any = { ...slice };

          if (slice._type === 'reference' && slice.features) {
            Component = componentMap['featureSection'];
            props = { features: slice.features };
          } else if (slice._type === 'reference' && slice.testimonials) {
            Component = componentMap['testimonialSection'];
            props = { testimonials: slice.testimonials };
          } else if (slice._type === 'reference' && slice.impact) {
            Component = componentMap['impactSection'];
            props = { impact: slice.impact };
          } else if (slice._type === 'reference' && slice.partners) {
            Component = componentMap['partnerSection'];
            props = { partners: slice.partners };
          } else if (slice._type === 'reference') {
            Component = componentMap[sliceType];
            props = { ...slice };
          } else {
            Component = componentMap[slice._type];
          }

          if (Component) {
            return <Component key={slice._key || slice._id} {...props} />;
          }

          if (slice.features) {
            return <FeaturesSection key={slice._key || slice._id} features={slice.features} />;
          }
          if (slice.testimonials) {
            return <TestimonialsSection key={slice._key || slice._id} testimonials={slice.testimonials} />;
          }
          if (slice.impact) {
            return <ImpactSection key={slice._key || slice._id} impact={slice.impact} />;
          }
          if (slice.partners) {
            return <PartnersSection key={slice._key || slice._id} partners={slice.partners} />;
          }

          return null;
        })}
      </main>
      <Footer />
    </div>
  );
}

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { HeroSection } from '@/components/slices/hero-section';
import { FeaturesSection } from '@/components/slices/features-section';
import { AboutSection } from '@/components/slices/about-section';
import { ImpactSection } from '@/components/slices/impact-section';
import { TestimonialsSection } from '@/components/slices/testimonials-section';
import { PartnersSection } from '@/components/slices/partners-section';
import { CtaSection } from '@/components/slices/cta-section';

export interface HomePageData {
  hero: {
    headline: string;
    description: string;
    callToAction: string;
    image: SanityImageSource;
    imageAlt: string;
  };
  features: {
    _key: string;
    icon: string;
    title: string;
    description: string;
    dataAiHint: string;
  }[];
  testimonials: {
    _key: string;
    quote: string;
    author: string;
    title: string;
    image: SanityImageSource;
  }[];
  about: {
    title: string;
    description: string;
    image: SanityImageSource;
    imageAlt: string;
  };
  impact: {
    _key: string;
    stat: string;
    description: string;
    icon: string;
  }[];
  partners: {
    _key: string;
    name: string;
    logo: SanityImageSource;
    website: string;
  }[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

async function getHomePageData(): Promise<HomePageData> {
  const query = `*[_type == "homePage"][0]{
    hero,
    "features": features[]->{_id, _key, title, description, icon, dataAiHint},
    "testimonials": testimonials[]->{_id, _key, quote, author, title, image},
    "about": about->{title, description, image, imageAlt},
    "impact": impact[]->{_id, _key, stat, description, icon},
    "partners": partners[]->{_id, _key, name, logo, website},
    "cta": cta->{title, description, buttonText, buttonLink}
  }`;
  const data = await client.fetch(query, {}, {
    // With this cache setting, the page will be statically generated at build time and revalidated every 60 seconds.
    next: { revalidate: 60 }
  });
  return data;
}

export default async function Home() {
  const data = await getHomePageData();

  if (!data) {
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

  const { hero, features, testimonials, about, impact, partners, cta } = data;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection {...hero} />
        <FeaturesSection features={features} />
        {about && <AboutSection {...about} />}
        {impact?.length > 0 && <ImpactSection impact={impact} />}
        <TestimonialsSection testimonials={testimonials} />
        {partners?.length > 0 && <PartnersSection partners={partners} />}
        {cta && <CtaSection {...cta} />}
      </main>
      <Footer />
    </div>
  );
}

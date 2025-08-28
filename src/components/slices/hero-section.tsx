// src/components/slices/hero-section.tsx
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface HeroSectionProps {
    headline: string;
    description: string;
    callToAction: string;
    image?: SanityImageSource;
    imageAlt?: string;
}

export function HeroSection({ headline, description, callToAction, image, imageAlt }: HeroSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary">
              {headline}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="#contact">{callToAction}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          {image && (
            <div className="animate-fade-in">
              <Image
                src={urlFor(image).width(800).height(600).url()}
                alt={imageAlt || 'Hero Image'}
                width={800}
                height={600}
                className="rounded-xl shadow-2xl"
                data-ai-hint="abstract technology"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

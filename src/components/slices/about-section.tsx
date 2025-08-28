// src/components/slices/about-section.tsx
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/lib/sanity';

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface AboutSectionProps {
    title: string;
    description: string;
    image: SanityImageSource;
    imageAlt: string;
}

export function AboutSection({ title, description, image, imageAlt }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Image
              src={urlFor(image).width(800).height(600).url()}
              alt={imageAlt}
              width={800}
              height={600}
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div className="space-y-6 text-center md:text-left animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

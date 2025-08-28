// src/components/slices/partners-section.tsx
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface Partner {
    _key: string;
    name: string;
    logo: SanityImageSource;
    website: string;
}

interface PartnersSectionProps {
    partners: Partner[];
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <section id="partners" className="py-20 md:py-28 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Partners & Supporters</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We are grateful for the support of our partners who share our vision.</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {partners.map((partner) => (
            <Link key={partner._key} href={partner.website} target="_blank" rel="noopener noreferrer" className="grayscale hover:grayscale-0 transition-all">
                <Image 
                src={urlFor(partner.logo).height(60).url()}
                alt={`${partner.name} logo`}
                width={150}
                height={60}
                className="object-contain"
                />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

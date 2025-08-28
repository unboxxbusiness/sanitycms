// src/components/blocks/partner-logo-block.tsx
import Image from 'next/image';
import Link from 'next/link';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity-image';

interface Partner {
    _id: string;
    name: string;
    logo: SanityImageSource;
    website: string;
}

interface PartnerLogoBlockProps {
    heading?: string;
    partners: Partner[];
}

export function PartnerLogoBlock({ heading, partners }: PartnerLogoBlockProps) {
  return (
    <section id="partners" className="py-20 md:py-28 bg-secondary/20">
      <div className="container mx-auto px-4">
        {heading && (
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
            </div>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {partners.map((partner) => (
            <Link key={partner._id} href={partner.website || '#'} target="_blank" rel="noopener noreferrer" className="grayscale hover:grayscale-0 transition-all" title={partner.name}>
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

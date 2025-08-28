// src/components/blocks/partner-logo-block.tsx
"use client";

import Image from "next/image";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity-image';
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Partner {
    _id: string;
    name: string;
    logo: SanityImageSource;
    website?: string;
}

interface PartnerLogoBlockProps {
    heading?: string;
    partners: Partner[];
}

export function PartnerLogoBlock({ heading, partners }: PartnerLogoBlockProps) {
    if (!partners || partners.length === 0) {
        return null;
    }

    const formattedLogos = partners.map(partner => ({
        id: partner._id,
        name: partner.name,
        src: urlFor(partner.logo).height(80).url(),
        href: partner.website,
    }));

    // Duplicate logos to create a seamless loop
    const extendedLogos = [...formattedLogos, ...formattedLogos];

    return (
        <section id="partners" className="py-20 md:py-28 bg-secondary/20">
            <div className="container mx-auto px-4">
                {heading && (
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
                    </div>
                )}
                <div className="relative w-full overflow-hidden">
                    <div className="group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)] flex-row">
                        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                            {extendedLogos.map((logo, i) => {
                                const LogoImage = (
                                    <Image
                                        key={`${logo.id}-${i}`}
                                        src={logo.src}
                                        alt={logo.name}
                                        width={160}
                                        height={60}
                                        className="h-auto w-auto max-h-[60px] max-w-[160px] object-contain grayscale hover:grayscale-0 transition-all"
                                    />
                                );

                                if (logo.href) {
                                    return (
                                        <Link key={`${logo.id}-${i}-link`} href={logo.href} target="_blank" rel="noopener noreferrer">
                                            {LogoImage}
                                        </Link>
                                    );
                                }
                                return LogoImage;
                            })}
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-secondary/20 to-transparent sm:block" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-secondary/20 to-transparent sm:block" />
                </div>
            </div>
        </section>
    );
}
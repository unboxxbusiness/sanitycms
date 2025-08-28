// src/components/blocks/partner-logo-block.tsx
"use client";

import Image from "next/image";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity-image';
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";

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

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: "blur(12px)",
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
};

export function PartnerLogoBlock({ heading, partners }: PartnerLogoBlockProps) {
    if (!partners || partners.length === 0) {
        return null;
    }

    const formattedLogos = partners.map(partner => ({
        src: urlFor(partner.logo).height(40).url(),
        alt: partner.name,
        href: partner.website,
    }));

    return (
        <section className="bg-background pb-16 pt-16 md:pb-28">
            <div className="container mx-auto px-4">
                {heading && (
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
                    </div>
                )}
                <div className="group relative m-auto max-w-5xl px-6">
                    <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                        <Link
                            href="/partners" // You might want to make this link configurable in Sanity
                            className="block text-sm duration-150 hover:opacity-75"
                        >
                            <span>Meet Our Partners</span>
                            <ChevronRight className="ml-1 inline-block size-3" />
                        </Link>
                    </div>
                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.25,
                                    },
                                },
                            },
                            ...transitionVariants,
                        }}
                        className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-center gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 group-hover:blur-sm"
                    >
                        {formattedLogos.map((logo, index) => (
                            <div key={index} className="flex h-12 justify-center">
                                <Image
                                    className="mx-auto h-full w-auto object-contain dark:invert"
                                    src={logo.src}
                                    alt={logo.alt}
                                    height={40}
                                    width={160}
                                />
                            </div>
                        ))}
                    </AnimatedGroup>
                </div>
            </div>
        </section>
    );
}
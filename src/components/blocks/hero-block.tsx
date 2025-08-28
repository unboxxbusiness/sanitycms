// src/components/blocks/hero-block.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity-image';


interface ButtonProps {
    text: string;
    link: string;
}

interface HeroBlockProps {
    headline: string;
    subheadline?: string;
    image: SanityImageSource;
    imageAlt: string;
    buttons?: ButtonProps[];
}

export function HeroBlock({ headline, subheadline, image, imageAlt, buttons }: HeroBlockProps) {
  return (
    <section className="relative h-[600px] md:h-[700px] w-full flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
            <Image
                src={urlFor(image).url()}
                alt={imageAlt}
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl text-center mx-auto animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                {headline}
                </h1>
                {subheadline && 
                    <p className="text-lg md:text-xl text-white/80 mt-4">
                        {subheadline}
                    </p>
                }
                {buttons && buttons.length > 0 &&
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        {buttons.map((button, index) => (
                            <Button key={index} asChild size="lg" variant={index === 0 ? 'default' : 'secondary'} className={index === 0 ? 'bg-accent hover:bg-accent/90' : ''}>
                                <Link href={button.link}>{button.text}</Link>
                            </Button>
                        ))}
                    </div>
                }
            </div>
        </div>
    </section>
  );
}

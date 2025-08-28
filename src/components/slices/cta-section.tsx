// src/components/slices/cta-section.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CtaSectionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

export function CtaSection({ title, description, buttonText, buttonLink }: CtaSectionProps) {
  return (
    <section id="cta" className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto text-primary-foreground/80">{description}</p>
        <Button asChild size="lg" variant="secondary" className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
}

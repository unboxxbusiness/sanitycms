// src/components/blocks/cta-block.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ButtonProps {
    text: string;
    link: string;
}

interface CtaBlockProps {
    heading: string;
    supportingText?: string;
    buttons: ButtonProps[];
}

export function CtaBlock({ heading, supportingText, buttons }: CtaBlockProps) {
  return (
    <section id="cta" className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
        {supportingText && <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto text-primary-foreground/80">{supportingText}</p>}
        <div className="flex justify-center gap-4 mt-8">
            {buttons.map((button, index) => (
                <Button key={index} asChild size="lg" variant={index === 0 ? 'secondary' : 'outline'} className={index === 0 ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"}>
                    <Link href={button.link}>{button.text}</Link>
                </Button>
            ))}
        </div>
      </div>
    </section>
  );
}

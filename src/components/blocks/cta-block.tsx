// src/components/blocks/cta-block.tsx
'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from "@/lib/utils"

interface ButtonProps {
    text: string;
    link: string;
}

interface CtaBlockProps {
    heading: string;
    supportingText?: string;
    buttons: ButtonProps[];
    className?: string
}

export function CtaBlock({ heading, supportingText, buttons, className }: CtaBlockProps) {
  const primaryAction = buttons && buttons[0];

  return (
    <section className={cn("overflow-hidden pt-0 md:pt-0", className)}>
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-8 py-20 text-center sm:gap-8 md:py-28">
            <h2 className="text-3xl font-bold sm:text-5xl opacity-0 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                {heading}
            </h2>

            {supportingText && (
                <p className="text-muted-foreground opacity-0 animate-fade-in-up" style={{animationDelay: '300ms'}}>
                    {supportingText}
                </p>
            )}

            {primaryAction && (
                <Button
                    size="lg"
                    className="opacity-0 animate-fade-in-up"
                    style={{animationDelay: '500ms'}}
                    asChild
                >
                    <Link href={primaryAction.link}>{primaryAction.text}</Link>
                </Button>
            )}
            
            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-glow opacity-0 animate-scale-in" style={{animationDelay: '700ms'}} />
       </div>
    </section>
  )
}
    
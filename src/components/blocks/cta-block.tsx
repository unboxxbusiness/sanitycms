// src/components/blocks/cta-block.tsx
'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from "@/lib/utils"
import { AnimatedGroup } from '../ui/animated-group';

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

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    },
};

export function CtaBlock({ heading, supportingText, buttons, className }: CtaBlockProps) {
  const primaryAction = buttons && buttons[0];

  return (
    <section className={cn("py-20 md:py-28", className)}>
        <div className="container mx-auto px-4">
            <AnimatedGroup 
                 variants={{
                    container: {
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2,
                            },
                        },
                    },
                    ...transitionVariants
                }}
                className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-2xl bg-secondary/50 p-12 text-center shadow-lg"
            >
                <div className="absolute -inset-px rounded-2xl shadow-glow opacity-0 animate-scale-in" style={{animationDelay: '700ms'}} />
                <h2 className="text-3xl font-bold sm:text-4xl">
                    {heading}
                </h2>

                {supportingText && (
                    <p className="text-muted-foreground max-w-2xl">
                        {supportingText}
                    </p>
                )}

                {primaryAction && (
                    <Button
                        size="lg"
                        asChild
                        className="mt-4"
                    >
                        <Link href={primaryAction.link}>{primaryAction.text}</Link>
                    </Button>
                )}
            </AnimatedGroup>
       </div>
    </section>
  )
}
    
// src/components/blocks/hero-block.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { urlFor } from '@/lib/sanity-image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

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
    showAnnouncementBanner?: boolean;
    announcementText?: string;
    announcementLink?: string;
}

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroBlock({ headline, subheadline, image, imageAlt, buttons, showAnnouncementBanner, announcementText, announcementLink }: HeroBlockProps) {
    return (
        <main className="overflow-hidden">
            <section>
                <div className="relative pt-24 md:pt-36">
                    <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,hsl(var(--background))_75%)]" />
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                            <AnimatedGroup variants={transitionVariants}>
                                {showAnnouncementBanner && announcementText && (
                                <Link
                                    href={announcementLink || '#'}
                                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                                    <span className="text-foreground text-sm">{announcementText}</span>
                                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                                        <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                )}
                                <h1
                                    className="mt-8 max-w-4xl mx-auto text-balance text-5xl font-bold md:text-6xl lg:mt-16 xl:text-7xl">
                                    {headline}
                                </h1>
                                {subheadline && <p
                                    className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                                    {subheadline}
                                </p>}
                            </AnimatedGroup>
                                <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                {buttons && buttons.map((button, index) => (
                                    <Button
                                        key={index}
                                        asChild
                                        size="lg"
                                        variant={index === 0 ? 'default' : 'ghost'}
                                        className="rounded-xl px-5 text-base">
                                        <Link href={button.link}>
                                            <span className="text-nowrap">{button.text}</span>
                                        </Link>
                                    </Button>
                                ))}
                            </AnimatedGroup>
                        </div>
                    </div>
                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.75,
                                    },
                                },
                            },
                            ...transitionVariants,
                        }}>
                        <div className="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20">
                            <div
                                aria-hidden
                                className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                            />
                            <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-black/15 ring-1">
                                {image && (
                                    <Image
                                        className="bg-background aspect-video relative rounded-2xl"
                                        src={urlFor(image).url()}
                                        alt={imageAlt || "App screen"}
                                        width={2700}
                                        height={1440}
                                    />
                                )}
                            </div>
                        </div>
                    </AnimatedGroup>
                </div>
            </section>
        </main>
    )
}

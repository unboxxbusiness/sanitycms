// src/components/layout/header.tsx
'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Menu as AnimatedMenu, MenuItem, HoveredLink } from '@/components/ui/navbar-menu';
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo';
import { sanityFetch } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity-image';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Menu } from 'lucide-react';


interface NavLink {
    _key: string;
    text: string;
    link: string;
}

interface NavItem {
  _key: string;
  text: string;
  link?: string;
  children?: NavLink[];
}

interface Cta {
  text: string;
  link: string;
}

interface Settings {
  logoLight?: SanityImageSource;
  logoDark?: SanityImageSource;
  mainNavigation?: NavItem[];
  headerCta?: Cta;
}

const getSettings = () => {
    return sanityFetch<Settings>({
        query: `*[_type == "siteSettings"][0]{ 
            logoLight, 
            logoDark, 
            mainNavigation[]{
              ...,
              children[]{...}
            }, 
            headerCta 
        }`,
        tags: ['siteSettings']
    })
}

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [settings, setSettings] = useState<Settings>({});
    const { resolvedTheme } = useTheme();
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndSetData = async () => {
            const sanitySettings = await getSettings();
            setSettings(sanitySettings || {});
        }
        fetchAndSetData();
    }, []);

    const navLinks = settings?.mainNavigation || [];

    const logo = useMemo(() => {
        if (!settings) return null;
        const logoToUse = resolvedTheme === 'dark' ? settings.logoDark : settings.logoLight;
        if (!logoToUse) {
            // Fallback to the other logo if one is not set
            return settings.logoLight || settings.logoDark;
        }
        return logoToUse;
    }, [settings, resolvedTheme]);

    
    return (
        <header key="header">
            <nav
                aria-label="Main navigation"
                className="fixed top-0 z-50 w-full transition-all duration-300 bg-background/80 backdrop-blur-lg border-b"
            >
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                {logo ? (
                                    <Image src={urlFor(logo).height(24).url()} alt="Logo" width={94} height={24} className="h-6 w-auto" priority />
                                ) : (
                                    <Logo />
                                )}
                            </Link>
                        </div>
                        
                        <div className="hidden lg:flex lg:items-center lg:space-x-2">
                           <AnimatedMenu setActive={setActive}>
                                {navLinks.map((item) => (
                                    <React.Fragment key={item._key}>
                                        {item.children && item.children.length > 0 ? (
                                            <MenuItem setActive={setActive} active={active} item={item.text}>
                                                <div className="flex flex-col space-y-4 text-sm">
                                                    {item.children.map((child) => (
                                                        <HoveredLink key={child._key} href={child.link || '#'}>{child.text}</HoveredLink>
                                                    ))}
                                                </div>
                                            </MenuItem>
                                        ) : (
                                            <MenuItem setActive={setActive} active={active} item={item.text} href={item.link || '#'} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </AnimatedMenu>
                        </div>

                        <div className="flex items-center space-x-2">
                           <ThemeToggle />
                           <div className="hidden lg:flex">
                             {settings?.headerCta?.link && (
                                <Button asChild>
                                    <Link href={settings.headerCta.link}>
                                        {settings.headerCta.text || 'Get Started'}
                                    </Link>
                                </Button>
                            )}
                           </div>
                           <div className="lg:hidden">
                               <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                    <SheetTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="relative z-40 -m-2.5 block cursor-pointer p-2.5"
                                          aria-label="Toggle mobile menu"
                                        >
                                          <Menu className="h-6 w-6" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-[80vw]">
                                        <SheetHeader>
                                            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                        </SheetHeader>
                                        <div className="flex flex-col h-full py-6">
                                            <div className="flex flex-col items-start space-y-2">
                                                {navLinks.map((item) => (
                                                    <React.Fragment key={item._key}>
                                                        {item.children && item.children.length > 0 ? (
                                                            <Accordion type="single" collapsible className="w-full">
                                                                <AccordionItem value={item._key} className="border-b-0">
                                                                    <AccordionTrigger className="text-foreground/80 hover:text-foreground font-semibold py-2 px-4 hover:no-underline">
                                                                        {item.text}
                                                                    </AccordionTrigger>
                                                                    <AccordionContent>
                                                                        <div className="flex flex-col space-y-2 pl-8 pt-2">
                                                                            {item.children.map((child) => (
                                                                                <SheetClose key={child._key} asChild>
                                                                                    <Link href={child.link || '#'} className="text-muted-foreground hover:text-foreground">{child.text}</Link>
                                                                                </SheetClose>
                                                                            ))}
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            </Accordion>
                                                        ) : (
                                                            <SheetClose asChild>
                                                                <Link href={item.link || '#'} className="text-foreground/80 hover:text-foreground px-4 py-2 font-semibold">
                                                                    {item.text}
                                                                </Link>
                                                            </SheetClose>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div className="mt-auto">
                                            {settings?.headerCta?.link && (
                                                <SheetClose asChild>
                                                    <Button
                                                        asChild
                                                        size="sm"
                                                        className="w-full"
                                                        >
                                                        <Link href={settings.headerCta.link}>
                                                            <span>{settings.headerCta.text || 'Get Started'}</span>
                                                        </Link>
                                                    </Button>
                                                </SheetClose>
                                            )}
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

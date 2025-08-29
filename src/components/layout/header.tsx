// src/components/layout/header.tsx
'use client';

import React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo';
import { client } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity-image';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';


interface NavLink {
  _key: string;
  text: string;
  link: string;
}

interface Cta {
    text: string;
    link:string;
}

interface Settings {
  logoLight: SanityImageSource;
  logoDark: SanityImageSource;
  mainNavigation: NavLink[];
  headerCta: Cta;
}

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [settings, setSettings] = React.useState<Settings | null>(null);

    React.useEffect(() => {
        const fetchSettings = async () => {
          const query = `*[_type == "settings"][0]{ logoLight, logoDark, mainNavigation, headerCta }`;
          const data = await client.fetch(query);
          setSettings(data);
        };
        fetchSettings();
    }, []);

    const navLinks = settings?.mainNavigation || [];


    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <header key="header">
            <nav
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-300",
                    isScrolled ? "bg-background/80 backdrop-blur-lg" : ""
                )}
            >
                <div className="container mx-auto max-w-6xl px-6 lg:px-12">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="relative z-30 flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                {settings?.logoLight ? (
                                    <>
                                        <Image src={urlFor(settings.logoLight).height(20).url()} alt="Logo" width={78} height={20} className="h-5 w-auto dark:hidden" />
                                        <Image src={urlFor(settings.logoDark || settings.logoLight).height(20).url()} alt="Logo" width={78} height={20} className="h-5 w-auto hidden dark:block" />
                                    </>
                                ) : (
                                    <Logo />
                                )}
                            </Link>
                            <div className="flex items-center lg:hidden">
                                <ThemeToggle />
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="relative z-40 -m-2.5 block cursor-pointer p-2.5 lg:hidden">
                                            <Menu className="m-auto size-6" />
                                            <span className="sr-only">Open Menu</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                                        <SheetTitle className="sr-only">Menu</SheetTitle>
                                        <div className="flex flex-col h-full">
                                            <div className="flex-1">
                                                <ul className="flex flex-col items-start space-y-6 text-base mt-8">
                                                    {navLinks.map((item) => (
                                                        <li key={item._key}>
                                                            <SheetClose asChild>
                                                                <Link
                                                                    href={item.link}
                                                                    className="text-foreground/80 hover:text-foreground block duration-150">
                                                                    <span>{item.text}</span>
                                                                </Link>
                                                            </SheetClose>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {settings?.headerCta?.link && (
                                                <div className="mt-auto">
                                                    <SheetClose asChild>
                                                        <Button asChild size="lg" className="w-full">
                                                            <Link href={settings.headerCta.link}>
                                                                <span>{settings.headerCta.text || 'Get Started'}</span>
                                                            </Link>
                                                        </Button>
                                                    </SheetClose>
                                                </div>
                                            )}
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                        <div className={cn("hidden w-full flex-col items-center justify-center gap-6 p-6 lg:static lg:w-fit lg:flex-row lg:gap-8 lg:space-y-0 lg:p-0 lg:flex")}>
                            <ul className="flex flex-col gap-6 text-base lg:flex-row lg:gap-8 lg:text-sm">
                                {navLinks.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.link}
                                            className="text-foreground/80 hover:text-foreground block duration-150">
                                            <span>{item.text}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="flex w-full flex-col space-y-3 sm:w-fit sm:flex-row sm:items-center sm:gap-3 sm:space-y-0">
                                <div className="hidden lg:flex items-center gap-3">
                                    <ThemeToggle />
                                </div>
                                {settings?.headerCta?.link && (
                                    <Button
                                        asChild
                                        size="sm">
                                        <Link href={settings.headerCta.link}>
                                            <span>{settings.headerCta.text || 'Get Started'}</span>
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

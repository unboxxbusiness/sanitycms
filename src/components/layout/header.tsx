
// src/components/layout/header.tsx
'use client';

import React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo';
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
  logoLight?: SanityImageSource;
  logoDark?: SanityImageSource;
  mainNavigation: NavLink[];
  headerCta: Cta;
}

interface HeaderProps {
    settings: Settings | null;
}

export function Header({ settings }: HeaderProps) {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const navLinks = settings?.mainNavigation || [];

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!isMounted) {
        return (
            <header key="header">
                <nav className="fixed top-0 z-50 w-full">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                             <div className="h-6 w-[94px] bg-muted rounded"></div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
    
    return (
        <header key="header">
            <nav
                aria-label="Main navigation"
                className={cn(
                    "fixed top-0 z-50 w-full transition-all duration-300",
                    isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : ""
                )}
            >
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                {settings?.logoLight ? (
                                    <>
                                        <Image src={urlFor(settings.logoLight).height(24).url()} alt="Logo" width={94} height={24} className="h-6 w-auto dark:hidden" priority />
                                        <Image src={urlFor(settings.logoDark || settings.logoLight).height(24).url()} alt="Logo" width={94} height={24} className="h-6 w-auto hidden dark:block" priority />
                                    </>
                                ) : (
                                    <Logo />
                                )}
                            </Link>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:space-x-8">
                            {navLinks.map((item) => (
                                <Link
                                    key={item._key}
                                    href={item.link}
                                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                                    {item.text}
                                </Link>
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:space-x-4">
                            <ThemeToggle />
                            {settings?.headerCta?.link && (
                                <Button asChild>
                                    <Link href={settings.headerCta.link}>
                                        {settings.headerCta.text || 'Get Started'}
                                    </Link>
                                </Button>
                            )}
                        </div>
                        <div className="flex items-center lg:hidden">
                            <ThemeToggle />
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="ml-2">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Open Menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                                    <SheetTitle className="sr-only">Menu</SheetTitle>
                                     <div className="flex h-full flex-col">
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
                </div>
            </nav>
        </header>
    )
}

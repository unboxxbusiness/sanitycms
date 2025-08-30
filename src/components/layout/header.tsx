// src/components/layout/header.tsx
'use client';

import React from 'react'
import Link from 'next/link'
import { Menu, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo';
import { client } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity-image';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { useTheme } from 'next-themes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface NavLink {
  _key: string;
  text: string;
  link?: string;
  children?: NavLink[];
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
    const { theme } = useTheme();

    React.useEffect(() => {
        const fetchSettings = async () => {
          const query = `*[_type == "settings"][0]{ logoLight, logoDark, mainNavigation, headerCta }`;
          const data = await client.fetch(query);
          setSettings(data);
        };
        fetchSettings();
    }, []);

    const navLinks = settings?.mainNavigation || [];

    const logo = React.useMemo(() => {
        if (!settings) return null;
        return theme === 'dark' ? settings.logoDark : settings.logoLight;
    }, [settings, theme]);

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
                className="fixed z-50 group w-full px-2">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="relative z-30 flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                {logo ? (
                                    <Image src={urlFor(logo).height(20).url()} alt="Logo" width={78} height={20} className="h-5 w-auto" />
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
                                            <div className="flex-1 mt-8">
                                                <Accordion type="single" collapsible className="w-full">
                                                {navLinks.map((item) => (
                                                    <React.Fragment key={item._key}>
                                                        {item.children && item.children.length > 0 ? (
                                                            <AccordionItem value={item._key} className="border-b">
                                                                <AccordionTrigger className="text-base py-4">
                                                                    {item.text}
                                                                </AccordionTrigger>
                                                                <AccordionContent className="pl-4">
                                                                    <ul className="flex flex-col space-y-4 text-base mt-2">
                                                                    {item.children.map((child) => (
                                                                        <li key={child._key}>
                                                                            <SheetClose asChild>
                                                                                <Link href={child.link || '#'} className="text-foreground/80 hover:text-foreground block duration-150">
                                                                                    {child.text}
                                                                                </Link>
                                                                            </SheetClose>
                                                                        </li>
                                                                    ))}
                                                                    </ul>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        ) : (
                                                            <div className="border-b">
                                                                <SheetClose asChild>
                                                                    <Link href={item.link || '#'} className="text-foreground/80 hover:text-foreground flex items-center py-4 text-base w-full">
                                                                        {item.text}
                                                                    </Link>
                                                                </SheetClose>
                                                            </div>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                                </Accordion>
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
                        <div className={cn("hidden w-full flex-col items-center justify-center gap-6 bg-background p-6 shadow-2xl shadow-zinc-300/20 dark:shadow-none lg:static lg:w-fit lg:flex-row lg:gap-0 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent lg:flex")}>
                            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {navLinks.map((item) => (
                                        <li key={item._key}>
                                            {item.children && item.children.length > 0 ? (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-foreground focus:outline-none">
                                                        <span>{item.text}</span>
                                                        <ChevronDown className="h-4 w-4" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        {item.children.map((child) => (
                                                            <DropdownMenuItem key={child._key} asChild>
                                                                <Link href={child.link || '#'}>{child.text}</Link>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            ) : (
                                                <Link
                                                    href={item.link || '#'}
                                                    className="text-foreground/80 hover:text-foreground block duration-150">
                                                    <span>{item.text}</span>
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
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

// src/components/layout/header.tsx
'use client';

import React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo';
import { client } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity-image';
import Image from 'next/image';


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
  logo: SanityImageSource;
  mainNavigation: NavLink[];
  headerCta: Cta;
}

export function Header() {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [settings, setSettings] = React.useState<Settings | null>(null);

    React.useEffect(() => {
        const fetchSettings = async () => {
          const query = `*[_type == "settings"][0]{ logo, mainNavigation, headerCta }`;
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
        <header>
            <nav
                data-state={menuState ? 'active' : 'inactive'}
                className="fixed z-20 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                {settings?.logo ? (
                                    <Image src={urlFor(settings.logo).height(20).url()} alt="Logo" width={78} height={20} className="h-5 w-auto" />
                                ) : (
                                    <Logo />
                                )}
                            </Link>
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>
                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {navLinks.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.link}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.text}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cn("mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border bg-background p-6 shadow-2xl shadow-zinc-300/20 dark:shadow-none md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent", menuState ? "flex flex-col lg:flex-row" : "hidden lg:flex")}>
                            <ul className="flex flex-col space-y-6 text-base lg:hidden">
                                {navLinks.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.link}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.text}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
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

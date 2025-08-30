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
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import { Menu as AnimatedMenu, MenuItem, HoveredLink } from '@/components/ui/navbar-menu';


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
    const { resolvedTheme } = useTheme();
    const [active, setActive] = React.useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);


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
        return resolvedTheme === 'dark' ? settings.logoDark : settings.logoLight;
    }, [settings, resolvedTheme]);

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
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="relative z-40 -m-2.5 block cursor-pointer p-2.5 lg:hidden"
                                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                  aria-label="Toggle mobile menu"
                                >
                                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </Button>
                            </div>
                        </div>
                        <div className={cn(
                            "w-full flex-col items-center justify-center gap-6 bg-transparent p-6 shadow-none lg:static lg:w-fit lg:flex-row lg:gap-0 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent lg:flex",
                            isMobileMenuOpen ? 'flex' : 'hidden'
                        )}>
                             <AnimatedMenu setActive={setActive} className={isScrolled ? '!bg-transparent !shadow-none !border-none' : ''}>
                                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
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
                                                <Link href={item.link || '#'} className="cursor-pointer text-foreground/80 hover:text-foreground">
                                                    {item.text}
                                                </Link>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </AnimatedMenu>
                            
                            <div className="flex w-full flex-col space-y-3 sm:w-fit sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 lg:pl-8">
                                <div className="hidden lg:flex items-center gap-3">
                                    <ThemeToggle />
                                </div>
                                {settings?.headerCta?.link && (
                                    <Button
                                        asChild
                                        size="sm"
                                        className="w-full lg:w-auto"
                                        >
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


<<<<<<< HEAD
import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo';
<<<<<<< HEAD
import { client } from '@/lib/sanity'
import { type SanityImageSource } from '@sanity/image-url/lib/types/types';
=======
import { sanityFetch } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
=======
// src/components/layout/header.tsx
import Link from 'next/link'
import { client } from '@/lib/sanity';
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
>>>>>>> c4cc470a0fdf5b24d94ed31983a1e13e8e384852
import { urlFor } from '@/lib/sanity-image';
import Image from 'next/image';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';
<<<<<<< HEAD
import { useTheme } from 'next-themes';
import { Menu as AnimatedMenu, MenuItem, HoveredLink } from '@/components/ui/navbar-menu';
<<<<<<< HEAD
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
=======
<<<<<<< HEAD
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
=======
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
>>>>>>> 52fa0daee24ea2519dbd7df6f951774d92954df2
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
=======
import { Button } from '@/components/ui/button';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
>>>>>>> c4cc470a0fdf5b24d94ed31983a1e13e8e384852

interface NavItem {
  _key: string;
  text: string;
<<<<<<< HEAD
  link?: string;
  children?: NavLink[];
=======
  link: string;
  submenu?: NavItem[];
}

interface Cta {
  text: string;
  link: string;
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
}

export interface HeaderSettings {
  siteTitle?: string;
  logoLight?: SanityImageSource;
  logoDark?: SanityImageSource;
  mainNavigation?: NavItem[];
  headerCta?: Cta;
}

<<<<<<< HEAD
interface Settings {
  logoLight: SanityImageSource;
  logoDark: SanityImageSource;
  mainNavigation: NavLink[];
  headerCta: Cta;
}

const getSettings = () => {
    return sanityFetch<Settings>({
        query: `*[_type == "settings"][0]{ logoLight, logoDark, mainNavigation, headerCta }`,
        tags: ['settings']
    })
}

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [settings, setSettings] = useState<Settings | null>(null);
    const { resolvedTheme } = useTheme();
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndSetData = async () => {
            const sanitySettings = await getSettings();
            setSettings(sanitySettings);
        }
        fetchAndSetData();
    }, []);

    const navLinks = settings?.mainNavigation || [];

    const logo = useMemo(() => {
        if (!settings) return null;
        return resolvedTheme === 'dark' ? settings.logoDark : settings.logoLight;
    }, [settings, resolvedTheme]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
=======
async function getHeaderSettings(): Promise<HeaderSettings> {
  const query = `*[_type == "settings"][0]{ 
    siteTitle,
    logoLight,
    logoDark, 
    mainNavigation[]{
      ...,
      submenu[]{...}
    }, 
    headerCta
  }`;
  try {
      const data = await client.fetch(query, {}, {
          next: {
              tags: ['settings']
          }
      });
      return data;
  } catch (error) {
      console.error("Failed to fetch settings:", error);
      return {};
  }
}

export async function Header() {
    const settings = await getHeaderSettings();
    const navItems = settings?.mainNavigation || [];

>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
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
<<<<<<< HEAD
                                {logo ? (
                                    <Image src={urlFor(logo).height(20).url()} alt="Logo" width={78} height={20} className="h-5 w-auto" />
                                ) : (
                                    <Logo />
                                )}
                            </Link>
                            <div className="flex items-center lg:hidden">
                                <ThemeToggle />
<<<<<<< HEAD
                                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
=======
                                <Sheet>
>>>>>>> c4cc470a0fdf5b24d94ed31983a1e13e8e384852
                                    <SheetTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
<<<<<<< HEAD
                                          className="relative z-40 -m-2.5 block cursor-pointer p-2.5 lg:hidden"
=======
                                          className="relative z-40 -m-2.5 block cursor-pointer p-2.5"
>>>>>>> c4cc470a0fdf5b24d94ed31983a1e13e8e384852
                                          aria-label="Toggle mobile menu"
                                        >
                                          <Menu className="h-6 w-6" />
                                        </Button>
                                    </SheetTrigger>
<<<<<<< HEAD
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
                                                                                <Link key={child._key} href={child.link || '#'} onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">{child.text}</Link>
=======
                                    <SheetContent>
<<<<<<< HEAD
                                        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
=======
                                        <SheetHeader>
                                            <SheetTitle className="sr-only">Main Menu</SheetTitle>
                                        </SheetHeader>
>>>>>>> 52fa0daee24ea2519dbd7df6f951774d92954df2
                                        <div className="flex flex-col h-full py-6">
                                            <div className="flex flex-col gap-6 text-lg">
                                                <Accordion type="single" collapsible className="w-full">
                                                    {navLinks.map((item) => (
                                                        <React.Fragment key={item._key}>
                                                            {item.children && item.children.length > 0 ? (
                                                                <AccordionItem value={item.text} className="border-b-0">
                                                                    <AccordionTrigger className="py-2 hover:no-underline text-lg font-semibold">{item.text}</AccordionTrigger>
                                                                    <AccordionContent className="pl-4">
                                                                        <div className="flex flex-col gap-4 mt-2">
                                                                            {item.children.map((child) => (
                                                                                <SheetClose key={child._key} asChild>
                                                                                    <Link href={child.link || '#'} className="text-muted-foreground hover:text-foreground">{child.text}</Link>
                                                                                </SheetClose>
>>>>>>> c4cc470a0fdf5b24d94ed31983a1e13e8e384852
                                                                            ))}
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
<<<<<<< HEAD
                                                            </Accordion>
                                                        ) : (
                                                            <Link href={item.link || '#'} onClick={() => setIsMobileMenuOpen(false)} className="text-foreground/80 hover:text-foreground px-4 py-2 font-semibold">
                                                                {item.text}
                                                            </Link>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div className="mt-auto">
                                            {settings?.headerCta?.link && (
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    className="w-full"
                                                    >
                                                    <Link href={settings.headerCta.link}>
                                                        <span>{settings.headerCta.text || 'Get Started'}</span>
                                                    </Link>
                                                </Button>
                                            )}
                                            </div>
=======
                                                            ) : (
                                                                <SheetClose asChild>
                                                                    <Link href={item.link || '#'} className="py-2 text-lg font-semibold">{item.text}</Link>
                                                                </SheetClose>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </Accordion>
                                            </div>
                                            {settings?.headerCta?.link && (
                                                <div className="mt-auto">
                                                    <Button asChild size="lg" className="w-full">
                                                        <Link href={settings.headerCta.link}>{settings.headerCta.text || 'Get Started'}</Link>
                                                    </Button>
                                                </div>
                                            )}
>>>>>>> c4cc470a0fdf5b24d94ed31983a1e13e8e384852
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
<<<<<<< HEAD
                        <div className="hidden w-full flex-col items-center justify-center gap-6 bg-transparent p-6 shadow-none lg:static lg:w-fit lg:flex-row lg:gap-0 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent lg:flex">
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
=======
                        <div className={cn(
                            "w-full flex-col items-center justify-center gap-6 bg-transparent p-6 shadow-none lg:static lg:w-fit lg:flex-row lg:gap-0 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent lg:flex hidden"
                        )}>
<<<<<<< HEAD
                             <AnimatedMenu setActive={setActive}>
=======
                             <AnimatedMenu setActive={setActive} className={cn('flex-col lg:flex-row lg:space-x-2 lg:border lg:bg-card lg:shadow-input lg:rounded-full', isScrolled && 'lg:border-none lg:bg-transparent lg:shadow-none')}>
>>>>>>> 52fa0daee24ea2519dbd7df6f951774d92954df2
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
                                            <Link href={item.link || '#'} className="cursor-pointer text-foreground/80 hover:text-foreground px-3 py-2">
                                                {item.text}
                                            </Link>
                                        )}
                                    </React.Fragment>
                                ))}
>>>>>>> c4cc470a0fdf5b24d94ed31983a1e13e8e384852
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
=======
                                {settings?.logoLight && (
                                    <>
                                        <Image src={urlFor(settings.logoLight).height(24).url()} alt={settings.siteTitle || 'Logo'} width={94} height={24} className="h-6 w-auto dark:hidden" priority />
                                        <Image src={urlFor(settings.logoDark || settings.logoLight).height(24).url()} alt={settings.siteTitle || 'Logo'} width={94} height={24} className="h-6 w-auto hidden dark:block" priority />
                                    </>
                                )}
                            </Link>
                        </div>
                        
                        <div className="hidden lg:flex lg:items-center lg:space-x-8">
                           <MainNav items={navItems} />
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
                           <MobileNav mainNavItems={navItems} cta={settings?.headerCta} />
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

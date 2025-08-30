
// src/components/layout/header.tsx
import Link from 'next/link'
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import Image from 'next/image';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface NavItem {
  _key: string;
  text: string;
  link: string;
  submenu?: NavItem[];
}

interface Cta {
  text: string;
  link: string;
}

export interface HeaderSettings {
  siteTitle?: string;
  logoLight?: SanityImageSource;
  logoDark?: SanityImageSource;
  mainNavigation?: NavItem[];
  headerCta?: Cta;
}

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
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

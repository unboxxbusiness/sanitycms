
'use client'

import { usePathname } from 'next/navigation';
import './globals.css';
import { cn } from '@/lib/utils';
import { client } from '@/lib/sanity';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SocialShare } from '@/components/social-share';
import React, { useState, useEffect } from 'react';

interface NavLink {
  _key: string;
  text: string;
  link: string;
}

interface Cta {
    text: string;
    link:string;
}

interface SocialLink {
  _key:string;
  platform: 'github' | 'twitter' | 'linkedin';
  url: string;
}

interface SettingsData {
  siteTitle?: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  logoLight?: SanityImageSource;
  logoDark?: SanityImageSource;
  mainNavigation: NavLink[];
  headerCta?: Cta;
  footerDescription?: string;
  footerProductLinks?: NavLink[];
  footerCompanyLinks?: NavLink[];
  footerLegalLinks?: NavLink[];
  socialLinks?: SocialLink[];
  copyrightText?: string;
  showMembershipCta?: boolean;
  membershipCtaText?: string;
  membershipDialogTitle?: string;
  membershipDialogDescription?: string;
  newsletterHeadline?: string;
  newsletterSupportingText?: string;
}

async function getSettings(): Promise<SettingsData | null> {
    const query = `*[_type == "settings"][0]{ 
        siteTitle,
        defaultMetaTitle,
        defaultMetaDescription,
        logoLight,
        logoDark, 
        mainNavigation, 
        headerCta,
        footerDescription,
        footerProductLinks, 
        footerCompanyLinks, 
        footerLegalLinks, 
        socialLinks,
        copyrightText,
        showMembershipCta,
        membershipCtaText,
        membershipDialogTitle,
        membershipDialogDescription,
        newsletterHeadline,
        newsletterSupportingText
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
        return null;
    }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const pathname = usePathname();
  const isStudioPage = pathname.startsWith('/studio');

  useEffect(() => {
    async function fetchData() {
        const data = await getSettings();
        setSettings(data);
    }
    fetchData();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased min-h-screen bg-background flex flex-col")} suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            {!isStudioPage && <Header settings={settings} />}
            <main className="flex-1">
                {children}
            </main>
            {!isStudioPage && <Footer settings={settings} />}
            <Toaster />
            <SocialShare />
        </ThemeProvider>
      </body>
    </html>
  );
}

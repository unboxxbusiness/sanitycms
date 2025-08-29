
'use client'

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '../ui/toaster';
import { SocialShare } from '../social-share';

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

interface AppLayoutProps {
  settings: SettingsData | null;
  children: React.ReactNode;
}

export function AppLayout({ settings, children }: AppLayoutProps) {
  const pathname = usePathname();
  const isStudioPage = pathname.startsWith('/studio');

  return (
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
  );
}

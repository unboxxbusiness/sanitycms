
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SocialShare } from '@/components/social-share';
import { client } from '@/lib/sanity';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

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
    const data = await client.fetch(query, {}, {
        next: {
            tags: ['settings']
        }
    });
    return data;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      template: `%s | ${settings?.siteTitle || 'AmulyaX India'}`,
      default: settings?.defaultMetaTitle || 'AmulyaX India',
    },
    description: settings?.defaultMetaDescription || 'Innovative Solutions for India',
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased min-h-screen bg-background flex flex-col")} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header settings={settings} />
          <main className="flex-1">
            {children}
          </main>
          <Footer settings={settings} />
          <Toaster />
          <SocialShare />
        </ThemeProvider>
      </body>
    </html>
  );
}

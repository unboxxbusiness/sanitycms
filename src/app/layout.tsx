
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SocialShare } from '@/components/social-share';
import { client } from '@/lib/sanity';
import { AppLayout } from '@/components/layout/app-layout';
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

export const metadata: Metadata = {
    title: {
      template: `%s | AmulyaX India`,
      default: 'AmulyaX India',
    },
    description: 'Innovative Solutions for India',
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
      <body className={cn("font-body antialiased min-h-screen bg-background flex flex-col")} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout settings={settings}>
            {children}
          </AppLayout>
          <Toaster />
          <SocialShare />
        </ThemeProvider>
      </body>
    </html>
  );
}

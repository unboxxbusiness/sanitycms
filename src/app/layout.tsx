
import './globals.css';
import { cn } from '@/lib/utils';
import { client } from '@/lib/sanity';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SocialShare } from '@/components/social-share';
import type { Metadata } from 'next';

interface SettingsData {
  siteTitle?: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
}

// This function now only fetches data needed for metadata
async function getSeoSettings(): Promise<SettingsData> {
    const query = `*[_type == "settings"][0]{ 
        siteTitle,
        defaultMetaTitle,
        defaultMetaDescription
    }`;
    const data = await client.fetch(query, {}, {
        next: {
            tags: ['settings']
        }
    });
    return data || {};
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSeoSettings();
  return {
    title: {
      template: `%s | ${settings.siteTitle || 'AmulyaX India'}`,
      default: settings.defaultMetaTitle || settings.siteTitle || 'AmulyaX India',
    },
    description: settings.defaultMetaDescription || 'Innovative Solutions for India',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased min-h-screen bg-background flex flex-col")} suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <Toaster />
            <SocialShare />
        </ThemeProvider>
      </body>
    </html>
  );
}

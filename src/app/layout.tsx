
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { client } from '@/lib/sanity';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SocialShare } from '@/components/social-share';
import { Inter } from 'next/font/google';
import { sanityFetch } from '@/lib/sanity';

<<<<<<< HEAD
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

interface Settings {
=======
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

interface SettingsData {
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
  siteTitle?: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
}

<<<<<<< HEAD
const getSettings = () => {
    return sanityFetch<Settings>({
        query: `*[_type == "settings"][0]{ 
          siteTitle,
          defaultMetaTitle,
          defaultMetaDescription
        }`,
        tags: ['settings'],
    });
}


export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings.defaultMetaTitle || settings.siteTitle || 'AmulyaX India';
  const description = settings.defaultMetaDescription || 'Innovative Solutions for India';
  
  return {
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description: description,
    icons: {
      icon: '/favicon.ico',
    },
=======
async function getSeoSettings(): Promise<SettingsData> {
    const query = `*[_type == "settings"][0]{ 
        siteTitle,
        defaultMetaTitle,
        defaultMetaDescription
    }`;
    try {
      const data = await client.fetch(query, {}, {
        next: {
            tags: ['settings']
        }
    });
      return data || {};
    } catch (error) {
      console.error("Failed to fetch SEO settings:", error);
      return {};
    }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSeoSettings();
  return {
    title: {
      template: `%s | ${settings.siteTitle || 'AmulyaX India'}`,
      default: settings.defaultMetaTitle || settings.siteTitle || 'AmulyaX India',
    },
    description: settings.defaultMetaDescription || 'Innovative Solutions for India',
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
<<<<<<< HEAD
      <body className={cn(inter.variable, "font-body antialiased min-h-screen bg-background flex flex-col")} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
=======
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)} suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <Header />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Footer />
            <Toaster />
            <SocialShare />
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
        </ThemeProvider>
      </body>
    </html>
  );
}

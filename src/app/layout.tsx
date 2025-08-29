
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SocialShare } from '@/components/social-share';
import { client } from '@/lib/sanity';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(`*[_type == "settings"][0]{ siteTitle, defaultMetaTitle, defaultMetaDescription }`);
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

async function getHeaderData() {
    const query = `*[_type == "settings"][0]{ 
        logoLight,
        logoDark, 
        mainNavigation, 
        headerCta 
    }`;
    const data = await client.fetch(query);
    return data;
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerData = await getHeaderData();
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
          <Header settings={headerData} />
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

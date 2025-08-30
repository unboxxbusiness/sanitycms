
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { SocialShare } from '@/components/social-share';
import { Inter } from 'next/font/google';
import { sanityFetch } from '@/lib/sanity';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

interface Settings {
  siteTitle?: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
}

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
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "font-body antialiased min-h-screen bg-background flex flex-col")} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

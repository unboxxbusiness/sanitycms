'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { client } from '@/lib/sanity';

interface NavLink {
  _key: string;
  text: string;
  link: string;
}

interface Settings {
  mainNavigation: NavLink[];
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const query = `*[_type == "settings"][0]{ mainNavigation }`;
      const data = await client.fetch(query);
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const navLinks = settings?.mainNavigation || [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="md:hidden flex-1">
          <Logo />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex md:items-center md:gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link._key}
                href={link.link}
                className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.text}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4 ml-4">
             <Button>Get Started</Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container pb-4 flex flex-col gap-4">
             <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link._key}
                    href={link.link}
                    className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                ))}
             </nav>
             <div className="flex flex-col gap-4 mt-4">
                <Button>Get Started</Button>
             </div>
          </div>
        </div>
      )}
    </header>
  );
}

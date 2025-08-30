// src/components/layout/mobile-nav.tsx
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import type { HeaderSettings } from './header';

interface MobileNavProps {
  mainNavItems?: HeaderSettings['mainNavigation'];
  cta?: HeaderSettings['headerCta'];
}

export function MobileNav({ mainNavItems, cta }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-2">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
          <div className="flex h-full flex-col">
            <div className="flex-1">
              <ul className="flex flex-col items-start space-y-6 text-base mt-8">
                {mainNavItems?.map((item) => (
                  <li key={item._key}>
                    <SheetClose asChild>
                      <Link
                        href={item.link}
                        className="text-foreground/80 hover:text-foreground block duration-150"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{item.text}</span>
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>
            {cta?.link && (
              <div className="mt-auto">
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <Link href={cta.link}>
                      <span>{cta.text || 'Get Started'}</span>
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

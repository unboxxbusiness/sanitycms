// src/components/layout/footer.tsx
<<<<<<< HEAD
'use client'

import React, { useEffect, useMemo, useState } from "react"
import { Logo } from '@/components/logo'
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { sanityFetch } from "@/lib/sanity"
import { type SanityImageSource } from "@sanity/image-url/lib/types/types"
=======
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
import Image from "next/image"
import { urlFor } from "@/lib/sanity-image"
import { MembershipDialog } from "../membership-dialog"
<<<<<<< HEAD
import { useTheme } from "next-themes"
=======
import { client } from "@/lib/sanity"
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33

interface NavLink {
  _key: string;
  text: string;
  link: string;
}

interface SocialLink {
  _key:string;
  platform: 'github' | 'twitter' | 'linkedin';
  url: string;
}

<<<<<<< HEAD
interface Settings {
  logoLight: SanityImageSource;
  logoDark: SanityImageSource;
  footerDescription: string;
  footerProductLinks: NavLink[];
  footerCompanyLinks: NavLink[];
  footerLegalLinks: NavLink[];
  socialLinks: SocialLink[];
=======
interface FooterSettings {
  siteTitle?: string;
  logoLight?: SanityImageSource;
  logoDark?: SanityImageSource;
  footerDescription?: string;
  footerProductLinks?: NavLink[];
  footerCompanyLinks?: NavLink[];
  footerLegalLinks?: NavLink[];
  socialLinks?: SocialLink[];
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
  newsletterHeadline?: string;
  newsletterSupportingText?: string;
  copyrightText?: string;
  showMembershipCta?: boolean;
  membershipCtaText?: string;
  membershipDialogTitle?: string;
  membershipDialogDescription?: string;
}

const iconMap = {
  github: <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />,
  twitter: <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />,
  linkedin: <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />,
}

<<<<<<< HEAD
const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1,
            },
        },
    },
}

const getSettings = () => {
    return sanityFetch<Settings>({
        query: `*[_type == "settings"][0]{ 
            logoLight,
            logoDark, 
            footerDescription,
            footerProductLinks, 
            footerCompanyLinks, 
            footerLegalLinks, 
            socialLinks,
            newsletterHeadline,
            newsletterSupportingText,
            copyrightText,
            showMembershipCta,
            membershipCtaText,
            membershipDialogTitle,
            membershipDialogDescription
        }`,
        tags: ['settings']
    })
}

export function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const fetchAndSetData = async () => {
        const sanitySettings = await getSettings();
        setSettings(sanitySettings);
    }
    fetchAndSetData();
  }, []);
=======
async function getFooterSettings(): Promise<FooterSettings> {
    const query = `*[_type == "settings"][0]{ 
        siteTitle,
        logoLight,
        logoDark, 
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
        return data || {};
    } catch (error) {
        console.error("Failed to fetch footer settings:", error);
        return {};
    }
}

export async function Footer() {
  const settings = await getFooterSettings();
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33

  const logo = useMemo(() => {
    if (!settings) return null;
    return resolvedTheme === 'dark' ? settings.logoDark : settings.logoLight;
  }, [settings, resolvedTheme]);

  return (
<<<<<<< HEAD
    <footer id="contact" className="py-12">
       <AnimatedGroup 
        variants={{
            container: {
                visible: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2,
                    },
                },
            },
            ...transitionVariants
        }}
        className="container mx-auto max-w-6xl rounded-2xl bg-secondary/50 p-6 lg:p-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            {logo ? (
                <Image src={urlFor(logo).height(20).url()} alt="Logo" width={78} height={20} className="h-5 w-auto" />
            ) : (
                <Logo />
=======
    <footer id="contact" className="py-12 bg-secondary/30">
       <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4">
            {settings.logoLight && (
                <Link href="/" aria-label="home">
                  <Image src={urlFor(settings.logoLight).height(24).url()} alt={settings.siteTitle || 'Logo'} width={94} height={24} className="h-6 w-auto dark:hidden" />
                  <Image src={urlFor(settings.logoDark || settings.logoLight).height(24).url()} alt={settings.siteTitle || 'Logo'} width={94} height={24} className="h-6 w-auto hidden dark:block" />
                </Link>
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
            )}
            <p className="text-sm text-muted-foreground max-w-xs">{settings.footerDescription}</p>
            <div className="flex space-x-4">
                {settings.socialLinks?.map(social => (
                  <Link key={social._key} href={social.url} aria-label={`Follow us on ${social.platform}`} target="_blank" rel="noopener noreferrer">
                    {iconMap[social.platform]}
                  </Link>
                ))}
            </div>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-3">
                {settings.footerProductLinks?.map(link => (
                  <li key={link._key}><Link href={link.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.text}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-3">
                {settings.footerCompanyLinks?.map(link => (
                  <li key={link._key}><Link href={link.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.text}</Link></li>
                ))}
              </ul>
            </div>
<<<<<<< HEAD
          </div>
          <div>
            <h3 className="font-semibold mb-4">{settings?.newsletterHeadline || "Stay Updated"}</h3>
            <p className="text-sm text-muted-foreground mb-4">{settings?.newsletterSupportingText || "Subscribe to our newsletter to get the latest updates."}</p>
            {settings?.showMembershipCta && (
              <MembershipDialog
                ctaText={settings.membershipCtaText}
                dialogTitle={settings.membershipDialogTitle}
                dialogDescription={settings.membershipDialogDescription}
              />
            )}
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {settings?.copyrightText || "AmulyaX India. All rights reserved."}</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                {settings?.footerLegalLinks?.map(link => (
                  <li key={link._key}><Link href={link.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.text}</Link></li>
                ))}
=======
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-semibold mb-4 text-foreground">{settings.newsletterHeadline}</h3>
              <p className="text-sm text-muted-foreground mb-4">{settings.newsletterSupportingText}</p>
              {settings.showMembershipCta && (
                <MembershipDialog
                  ctaText={settings.membershipCtaText}
                  dialogTitle={settings.membershipDialogTitle}
                  dialogDescription={settings.membershipDialogDescription}
                />
              )}
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {settings.copyrightText}</p>
            <ul className="flex gap-x-4 gap-y-2 flex-wrap justify-center">
                {settings.footerLegalLinks?.map(link => (
                  <li key={link._key}><Link href={link.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.text}</Link></li>
                ))}
            </ul>
        </div>
      </div>
    </footer>
  )
}

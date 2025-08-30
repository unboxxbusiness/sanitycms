// src/components/layout/footer.tsx
'use client'

import React, { useEffect, useMemo, useState } from "react"
import { Logo } from '@/components/logo'
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { sanityFetch } from "@/lib/sanity"
import { type SanityImageSource } from "@sanity/image-url/lib/types/types"
import Image from "next/image"
import { urlFor } from "@/lib/sanity-image"
import { AnimatedGroup } from "../ui/animated-group"
import { MembershipDialog } from "../membership-dialog"
import { useTheme } from "next-themes"

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

interface Settings {
  logoLight: SanityImageSource;
  logoDark: SanityImageSource;
  footerDescription: string;
  footerProductLinks: NavLink[];
  footerCompanyLinks: NavLink[];
  footerLegalLinks: NavLink[];
  socialLinks: SocialLink[];
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

  const logo = useMemo(() => {
    if (!settings) return null;
    return resolvedTheme === 'dark' ? settings.logoDark : settings.logoLight;
  }, [settings, resolvedTheme]);

  return (
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
            )}
            <p className="text-sm text-muted-foreground">{settings?.footerDescription || "Innovative Solutions for India's future."}</p>
            <div className="flex space-x-4">
                {settings?.socialLinks?.map(social => (
                  <Link key={social._key} href={social.url} aria-label={social.platform} target="_blank" rel="noopener noreferrer">
                    {iconMap[social.platform] || <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />}
                  </Link>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {settings?.footerProductLinks?.map(link => (
                  <li key={link._key}><Link href={link.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.text}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {settings?.footerCompanyLinks?.map(link => (
                  <li key={link._key}><Link href={link.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.text}</Link></li>
                ))}
              </ul>
            </div>
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
            </div>
        </div>
      </AnimatedGroup>
    </footer>
  )
}

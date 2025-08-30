// src/components/layout/footer.tsx
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import Image from "next/image"
import { urlFor } from "@/lib/sanity-image"
import { MembershipDialog } from "../membership-dialog"
import { client } from "@/lib/sanity"

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

interface FooterSettings {
  siteTitle?: string;
  logoLight?: SanityImageSource;
  logoDark?: SanityImageSource;
  footerDescription?: string;
  footerProductLinks?: NavLink[];
  footerCompanyLinks?: NavLink[];
  footerLegalLinks?: NavLink[];
  socialLinks?: SocialLink[];
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

  return (
    <footer id="contact" className="py-12 bg-secondary/30">
       <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4">
            {settings.logoLight && (
                <Link href="/" aria-label="home">
                  <Image src={urlFor(settings.logoLight).height(24).url()} alt={settings.siteTitle || 'Logo'} width={94} height={24} className="h-6 w-auto dark:hidden" />
                  <Image src={urlFor(settings.logoDark || settings.logoLight).height(24).url()} alt={settings.siteTitle || 'Logo'} width={94} height={24} className="h-6 w-auto hidden dark:block" />
                </Link>
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

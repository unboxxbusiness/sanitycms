// src/components/layout/footer.tsx
'use client'

import React, { useEffect, useState } from "react"
import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Logo } from '@/components/logo'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { client } from "@/lib/sanity"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import Image from "next/image"
import { urlFor } from "@/lib/sanity-image"
import { AnimatedGroup } from "../ui/animated-group"
import { subscribeToNewsletter } from "@/app/actions/subscribe"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
})

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
  logo: SanityImageSource;
  footerDescription: string;
  footerProductLinks: NavLink[];
  footerCompanyLinks: NavLink[];
  footerLegalLinks: NavLink[];
  socialLinks: SocialLink[];
  newsletterHeadline?: string;
  newsletterSupportingText?: string;
  copyrightText?: string;
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

function NewsletterForm({ settings }: { settings: Settings | null }) {
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, { status: 'idle' });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Subscribed!",
        description: "Thanks for subscribing to our newsletter.",
      });
      form.reset();
    } else if (state.status === 'error') {
        toast({
            title: "Something went wrong",
            description: state.message || "Could not subscribe. Please try again.",
            variant: "destructive"
        })
    }
  }, [state, toast, form]);

  return (
    <div>
        <h3 className="font-semibold mb-4">{settings?.newsletterHeadline || "Stay Updated"}</h3>
        <p className="text-sm text-muted-foreground mb-4">{settings?.newsletterSupportingText || "Subscribe to our newsletter to get the latest updates."}</p>
        <Form {...form}>
          <form
            action={formAction}
            className="flex gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default" disabled={isPending}>
                {isPending ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </Form>
    </div>
  )
}

export function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const query = `*[_type == "settings"][0]{ 
        logo, 
        footerDescription,
        footerProductLinks, 
        footerCompanyLinks, 
        footerLegalLinks, 
        socialLinks,
        newsletterHeadline,
        newsletterSupportingText,
        copyrightText
      }`;
      const data = await client.fetch(query);
      setSettings(data);
    };
    fetchSettings();
  }, []);

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
            {settings?.logo ? (
                <Image src={urlFor(settings.logo).height(20).url()} alt="Logo" width={78} height={20} className="h-5 w-auto" />
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
          <NewsletterForm settings={settings} />
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {settings?.copyrightText || "AmulyaX India. All rights reserved."}</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                {settings?.footerLegalLinks?.map(link => (
                  <Link key={link._key} href={link.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.text}</Link>
                ))}
            </div>
        </div>
      </AnimatedGroup>
    </footer>
  )
}

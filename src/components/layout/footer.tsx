'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Logo } from '@/components/logo'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"
import { client } from "@/lib/sanity"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import Image from "next/image"
import { urlFor } from "@/lib/sanity-image"

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
  _key: string;
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
}

const iconMap = {
  github: <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />,
  twitter: <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />,
  linkedin: <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />,
}

export function Footer() {
  const { toast } = useToast()
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
        newsletterSupportingText 
      }`;
      const data = await client.fetch(query);
      setSettings(data);
    };
    fetchSettings();
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Subscribed!",
      description: "Thanks for subscribing to our newsletter.",
    })
    form.reset()
  }

  return (
    <footer id="contact" className="bg-secondary/50">
      <div className="container py-12">
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
          <div>
            <h3 className="font-semibold mb-4">{settings?.newsletterHeadline || "Stay Updated"}</h3>
            <p className="text-sm text-muted-foreground mb-4">{settings?.newsletterSupportingText || "Subscribe to our newsletter to get the latest updates."}</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
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
                <Button type="submit" variant="default">Subscribe</Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AmulyaX India. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                {settings?.footerLegalLinks?.map(link => (
                  <Link key={link._key} href={link.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.text}</Link>
                ))}
            </div>
        </div>
      </div>
    </footer>
  )
}

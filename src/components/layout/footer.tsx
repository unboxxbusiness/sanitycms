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

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
})

export function Footer() {
  const { toast } = useToast()
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
            <Logo />
            <p className="text-sm text-muted-foreground">Innovative Solutions for India's future.</p>
            <div className="flex space-x-4">
                <Link href="#" aria-label="Github"><Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
                <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
                <Link href="#" aria-label="Linkedin"><Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" /></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">Subscribe to our newsletter to get the latest updates.</p>
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
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  )
}

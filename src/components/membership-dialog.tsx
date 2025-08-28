// src/components/membership-dialog.tsx
'use client'

import React, { useEffect, useState } from "react"
import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { subscribeToNewsletter } from "@/app/actions/subscribe"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
})

export function MembershipDialog() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, { status: 'idle' });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Welcome aboard!",
        description: "You've successfully joined our community.",
      });
      reset();
      setOpen(false); // Close the dialog on success
    } else if (state.status === 'error') {
        toast({
            title: "Something went wrong",
            description: state.message || "Could not subscribe. Please try again.",
            variant: "destructive"
        })
    }
  }, [state, toast, reset]);
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formAction(formData);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="default">Join for Free</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Join Our Community</DialogTitle>
                <DialogDescription>
                    Become a member for free to get the latest updates, resources, and opportunities from AmulyaX India.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? 'Joining...' : 'Join for Free'}
                </Button>
              </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

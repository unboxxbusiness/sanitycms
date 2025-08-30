// src/components/social-share.tsx
"use client";

import { Copy, Facebook, Linkedin, Mail, Share2, Twitter, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";


const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16,2A13,13,0,0,0,3,15.76V29l4.42-2.31A13,13,0,1,0,16,2Zm7.1,16.55a.81.81,0,0,1-.58.53,3.44,3.44,0,0,1-1.2.16,3.67,3.67,0,0,1-1.39-.28l-.13,0a5.32,5.32,0,0,1-2.07-1.3l-.14,0a10.87,10.87,0,0,1-3-3.9,5.77,5.77,0,0,1-.6-2.58,4,4,0,0,1,1.15-2.61.81.81,0,0,1,.6-.26,1.4,1.4,0,0,1,1,.2l.14,0a1.36,1.36,0,0,1,.45.68.86.86,0,0,1-.08.68,5.4,5.4,0,0,1-.58,1,1.36,1.36,0,0,0-.2,1,4.42,4.42,0,0,0,1.2,1.52,4.64,4.64,0,0,0,1.8,1,1.4,1.4,0,0,0,1.13-.19,1.45,1.45,0,0,0,.68-1.07.89.89,0,0,0-.2-0.78A3.33,3.33,0,0,1,20.4,16a.81.81,0,0,1,.84-.6,2.6,2.6,0,0,1,2,1.38A2.94,2.94,0,0,1,23.1,18.55Z"
        fill="currentColor"
      />
    </svg>
  );

export function SocialShare() {
  const { toast } = useToast();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      setShareTitle(document.title || "AmulyaX India");
    }
  }, [pathname]); // Re-run when pathname changes

  if (!isMounted || pathname.startsWith('/studio')) {
    return null;
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` },
    { name: "Twitter", icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}` },
    { name: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}` },
    { name: "WhatsApp", icon: WhatsAppIcon, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} ${currentUrl}`)}` },
    { name: "Email", icon: Mail, href: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(currentUrl)}` },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({ title: "Link Copied!", description: "The URL has been copied to your clipboard." });
    });
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: currentUrl,
        });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          // User cancelled the share dialog, do nothing.
        } else {
            toast({
                title: "Could not share",
                description: "Sharing was blocked or failed. Please try again.",
                variant: "destructive",
            });
        }
      }
    } else {
        toast({ title: "Share not supported", description: "Your browser does not support this feature.", variant: "destructive" });
    }
  };

  if (isMobile) {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button size="icon" className="rounded-full h-14 w-14 shadow-lg" onClick={handleNativeShare}>
                <Share2 className="h-6 w-6" />
            </Button>
        </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
        <TooltipProvider>
            <Dock direction="vertical" className="p-2 gap-2">
                <DockIcon>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-12 rounded-full" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close share options" : "Open share options"}>
                                {isOpen ? <X className="size-5" /> : <Share2 className="size-5" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Share this page</p>
                        </TooltipContent>
                    </Tooltip>
                </DockIcon>
                
                {isOpen && socialLinks.map((link) => (
                    <DockIcon key={link.name}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${link.name}`}>
                                    <link.icon className="size-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                <p>Share on {link.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                ))}
                {isOpen && (
                    <DockIcon>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button onClick={handleCopy} aria-label="Copy link to clipboard">
                                    <Copy className="size-5" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                <p>Copy Link</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                )}
            </Dock>
        </TooltipProvider>
    </div>
  );
}

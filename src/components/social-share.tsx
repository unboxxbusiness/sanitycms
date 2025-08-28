// src/components/social-share.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, Facebook, Copy, Share2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Types
interface SocialBoxProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  className?: string;
  name: string;
}

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="social-icon h-5 w-5">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        <path d="m16.485 15.35-1.125-.562c-.275-.138-.55-.275-.825-.413s-.413-.069-.55-.069c-.138 0-.275.069-.413.206-.138.138-.206.345-.275.552s-.069.413 0 .62c.069.207.206.413.345.552.138.138.275.206.413.206.138 0 .275-.069.413-.206.138-.138.206-.345.275-.552l.138-.413c.069-.207.069-.413 0-.62a1.85 1.85 0 0 0-.206-.552c-.138-.138-.275-.206-.413-.275-.138-.069-.275-.069-.413 0-.138.069-.275.206-.413.345-.138.138-.206.275-.275.413a.926.926 0 0 0-.069.413c0 .207.069.413.206.552.138.138.275.206.413.206h.413c.138 0 .275-.069.413-.206.138-.138.206-.275.275-.413.069-.138.069-.275 0-.413s-.138-.275-.275-.413a1.85 1.85 0 0 1-.413-.275c-.138-.069-.275-.069-.413 0-.138.069-.275.138-.413.206-.138.069-.206.207-.275.345a.926.926 0 0 0-.069.413c0 .207.069.345.206.483.138.138.275.206.413.206h.413c.138 0 .275-.069.413-.206.138-.138.206-.275.275-.413.069-.138.069-.275 0-.413a1.85 1.85 0 0 0-.275-.552 1.85 1.85 0 0 0-.413-.413 1.85 1.85 0 0 0-.552-.275c-.207-.069-.413-.069-.62 0a1.85 1.85 0 0 0-.552.275c-.138.138-.275.275-.413.413-.138.138-.206.275-.275.413a.926.926 0 0 0-.069.413c0 .207.069.413.206.552.138.138.275.206.413.206.138 0 .275-.069.413-.206.138-.138.206-.275.275-.413l.138-.413c.069-.207.069-.345 0-.552a1.85 1.85 0 0 0-.206-.483 1.85 1.85 0 0 0-.345-.413c-.138-.138-.275-.206-.413-.275-.138-.069-.275-.069-.413 0-.138.069-.275.138-.413.206-.138.069-.206.207-.275.345a.926.926 0 0 0-.069.413c0 .207.069.413.206.552.138.138.345.206.552.206.207 0 .413-.069.552-.206.138-.138.275-.275.413-.413.138-.138.206-.275.275-.413.069-.138.069-.275.069-.413a1.85 1.85 0 0 0-.206-.552 1.85 1.85 0 0 0-.345-.413c-.138-.138-.275-.206-.413-.275-.138-.069-.275-.069-.413 0-.138.069-.275.206-.413.345-.138.138-.206.275-.275.413a.926.926 0 0 0-.069.413c0 .207.069.413.206.552.138.138.275.206.413.206h.413c.138 0 .275-.069.413-.206.138-.138.206-.275.275-.413l.138-.413c.069-.207.069-.345 0-.552a1.85 1.85 0 0 0-.206-.483c-.138-.138-.275-.206-.413-.275-.138-.069-.275-.069-.413 0-.138.069-.275.138-.413.206-.138.069-.206.207-.275.345a.926.926 0 0 0-.069.413c0 .207.069.413.206.552.138.138.345.206.552.206.207 0 .413-.069.552-.206.138-.138.275-.275.413-.413.138-.138.206-.275.275-.413.069-.138.069-.275.069-.413a1.85 1.85 0 0 0-.206-.552 1.85 1.85 0 0 0-.345-.413c-.138-.138-.275-.206-.413-.275-.138-.069-.275-.069-.413 0-.138.069-.275.206-.413.345-.138.138-.206.275-.275.413a.926.926 0 0 0-.069.413c0 .207.069.413.206.552.138.138.275.206.413.206.138 0 .275-.069.413-.206.138-.138.206-.275.275-.413.069-.138.069-.275 0-.413s-.138-.275-.275-.413c-.138-.138-.275-.206-.413-.275a.926.926 0 0 0-.413 0c-.138.069-.275.138-.413.206-.138.069-.206.207-.275.345a.926.926 0 0 0-.069.413c0 .207.069.413.206.552.138.138.345.206.552.206.207 0 .413-.069.552-.206.138-.138.275-.275.413-.413.138-.138.206-.275.275-.413.069-.138.069-.275.069-.413z" />
    </svg>
)

const SocialBox = ({ href, icon, className, name, onClick }: SocialBoxProps) => {
    const commonProps = {
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Share on ${name}`,
        className: cn("social-box", className),
    };

    if (href) {
        return (
            <Link href={href} {...commonProps}>
                <span className="social-icon">{icon}</span>
            </Link>
        );
    }
    
    return (
        <button onClick={onClick} {...commonProps}>
            <span className="social-icon">{icon}</span>
        </button>
    );
};


const SocialCard = ({ title = "Share" }) => {
    const { toast } = useToast();

    const handleShare = async (platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'native') => {
        const url = window.location.href;
        const text = `Check out this amazing app: ${document.title}`;

        let shareUrl = '';
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(document.title)}&summary=${encodeURIComponent(text)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
            case 'native':
                if (navigator.share) {
                    try {
                        await navigator.share({ title: document.title, text, url });
                        return; // Exit after successful native share
                    } catch (error) {
                        console.error("Native share failed:", error);
                        toast({ title: "Could not share", description: "Something went wrong with the share action." });
                    }
                } else {
                    toast({ title: "Not Supported", description: "Your browser does not support native sharing." });
                }
                return; // Exit if native share is attempted
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
    };
    
    const handleCopy = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            toast({ title: "Link Copied!", description: "You can now share it with your friends." });
        }).catch(err => {
            console.error("Failed to copy link: ", err);
            toast({ title: "Failed to Copy", description: "Could not copy the link to your clipboard.", variant: "destructive" });
        });
    };

    const socialLinks = [
        { name: 'Facebook', icon: <Facebook />, onClick: () => handleShare('facebook'), className: 'facebook' },
        { name: 'Twitter', icon: <Twitter />, onClick: () => handleShare('twitter'), className: 'twitter' },
        { name: 'LinkedIn', icon: <Linkedin />, onClick: () => handleShare('linkedin'), className: 'linkedin' },
        { name: 'WhatsApp', icon: <WhatsAppIcon />, onClick: () => handleShare('whatsapp'), className: 'whatsapp' },
        { name: 'Copy Link', icon: <Copy />, onClick: handleCopy, className: 'copy' },
        { name: 'Share', icon: <Share2 />, onClick: () => handleShare('native'), className: 'share' },
    ];
    
    return (
      <div className="social-card">
        <div className="social-links">
            {socialLinks.map((link) => (
              <SocialBox
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                icon={link.icon}
                className={link.className}
                name={link.name}
              />
            ))}
        </div>
        <div className="social-logo">{title}</div>
      </div>
    );
};

export function SocialShare() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SocialCard />
    </div>
  );
};

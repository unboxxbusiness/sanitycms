// src/components/social-share.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Github, Dribbble, Send } from 'lucide-react';

// Types
interface SocialBoxProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
  name: string;
}

interface SocialCardProps {
  title?: string;
  socialLinks?: Array<SocialBoxProps>;
}

// Components
const SocialBox = ({ href, icon, className, name }: SocialBoxProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Share on ${name}`}
    className={`social-box ${className}`}
  >
    <span className="social-icon">{icon}</span>
  </Link>
);

const SocialCard = ({
  title = "Socials",
  socialLinks = [
    { href: "#", icon: <Dribbble />, name: 'Dribbble', className: 'dribbble' },
    { href: "#", icon: <Twitter />, name: 'Twitter', className: 'twitter' },
    { href: "#", icon: <Github />, name: 'GitHub', className: 'github' },
    { href: "#", icon: <Send />, name: 'Telegram', className: 'telegram' },
  ],
}: SocialCardProps) => (
  <div className="social-card">
    <div className="social-logo">{title}</div>
    <div className="social-links">
        {socialLinks.map((link, index) => (
          <SocialBox
            key={index}
            href={link.href}
            icon={link.icon}
            className={link.className}
            name={link.name}
          />
        ))}
    </div>
  </div>
);

export function SocialShare() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SocialCard />
    </div>
  );
};

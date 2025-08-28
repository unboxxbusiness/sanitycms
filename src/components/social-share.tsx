// src/components/social-share.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, Twitter, Github } from 'lucide-react';

// Types
interface SocialBoxProps {
  href: string;
  icon: React.ReactNode;
  className: string;
  delay?: string;
  name: string;
}

interface SocialCardProps {
  title?: string;
  socialLinks?: Array<SocialBoxProps>;
}

// Components
const SocialBox = ({ href, icon, className, delay, name }: SocialBoxProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Share on ${name}`}
    className={`social-box ${className}`}
    style={{ transitionDelay: delay }}
  >
    <span className="social-icon">{icon}</span>
  </Link>
);

const SocialCard = ({
  title = "Share",
  socialLinks = [
    { href: "https://www.linkedin.com/shareArticle?mini=true&url=https://amulyax.com", icon: <Linkedin />, className: "box1", name: 'LinkedIn' },
    { href: "https://twitter.com/intent/tweet?url=https://amulyax.com&text=Check%20out%20AmulyaX%20India", icon: <Twitter />, className: "box2", delay: "0.2s", name: 'Twitter' },
    { href: "https://github.com/your-repo", icon: <Github />, className: "box3", delay: "0.4s", name: 'GitHub' },
  ],
}: SocialCardProps) => (
  <div className="social-card">
    <div className="social-background" />
    <div className="social-logo">{title}</div>

    {socialLinks.map((link, index) => (
      <SocialBox
        key={index}
        href={link.href}
        icon={link.icon}
        className={link.className}
        delay={link.delay}
        name={link.name}
      />
    ))}

    <div className="social-box box4" style={{ transitionDelay: "0.6s" }} />
  </div>
);

export function SocialShare() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SocialCard />
    </div>
  );
};

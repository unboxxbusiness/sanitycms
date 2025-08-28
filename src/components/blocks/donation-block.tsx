// src/components/blocks/donation-block.tsx
'use client'

import React, { useState, useMemo } from "react";
import { Award, BookOpenCheck, GraduationCap, HandCoins, HeartHandshake, Leaf, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import Link from 'next/link';

interface DonationTier {
    _id: string;
    title: string;
    maxAmount: number;
    impactPerUnit: number;
    impactUnitAmount: number;
    impactUnitLabel: string;
    icon: string;
}

interface DonationBlockProps {
    heading: string;
    subheading?: string;
    minAmount: number;
    maxAmount: number;
    donationTiers: DonationTier[];
    primaryCtaText?: string;
    primaryCtaLink?: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
    'HeartHandshake': <HeartHandshake className="h-10 w-10 text-primary" />,
    'Users': <Users className="h-10 w-10 text-primary" />,
    'Leaf': <Leaf className="h-10 w-10 text-primary" />,
    'Award': <Award className="h-10 w-10 text-primary" />,
    'BookOpenCheck': <BookOpenCheck className="h-10 w-10 text-primary" />,
    'GraduationCap': <GraduationCap className="h-10 w-10 text-primary" />,
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

export function DonationBlock({
    heading,
    subheading,
    minAmount = 1000,
    maxAmount = 1000000,
    donationTiers,
    primaryCtaText = "Donate Now",
    primaryCtaLink = "#",
}: DonationBlockProps) {
    const [donationAmount, setDonationAmount] = useState(minAmount);

    const sortedTiers = useMemo(() => {
        return [...(donationTiers || [])].sort((a, b) => a.maxAmount - b.maxAmount);
    }, [donationTiers]);

    const activeTier = useMemo(() => {
        return sortedTiers.find(tier => donationAmount <= tier.maxAmount) || sortedTiers[sortedTiers.length - 1];
    }, [donationAmount, sortedTiers]);

    const studentsImpacted = useMemo(() => {
        if (!activeTier) return 0;
        const impact = (donationAmount / activeTier.impactUnitAmount) * activeTier.impactPerUnit;
        return Math.floor(impact);
    }, [donationAmount, activeTier]);
    
    const ctaLinkWithAmount = `${primaryCtaLink}${primaryCtaLink.includes('?') ? '&' : '?'}amount=${donationAmount}`;

    if (!donationTiers || donationTiers.length === 0) {
        return null;
    }

    return (
        <section className="py-20 md:py-28 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
                    {subheading && <p className="text-muted-foreground mt-4 text-lg">{subheading}</p>}
                </div>

                <div className="max-w-4xl mx-auto mt-12 bg-card rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <div className="mb-4">
                                {activeTier?.icon && (
                                   <div className="mx-auto md:mx-0 bg-primary/10 p-4 rounded-full w-fit mb-4 transition-all duration-300">
                                       {iconMap[activeTier.icon] || <HandCoins className="h-10 w-10 text-primary" />}
                                   </div>
                                )}
                                <p className="text-sm font-semibold uppercase tracking-wider text-primary">{activeTier?.title || 'Supporter'}</p>
                                <p className="text-4xl md:text-5xl font-bold text-foreground mt-2">{formatCurrency(donationAmount)}</p>
                            </div>
                            <div className="mt-4 text-muted-foreground text-lg">
                                Your contribution can provide <span className="font-bold text-primary">{studentsImpacted}</span> {activeTier?.impactUnitLabel || 'students with support'}.
                            </div>
                        </div>

                        <div className="flex flex-col justify-center h-full">
                           <Slider
                                value={[donationAmount]}
                                onValueChange={(value) => setDonationAmount(value[0])}
                                min={minAmount}
                                max={maxAmount}
                                step={(maxAmount - minAmount) / 100}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                <span>{formatCurrency(minAmount)}</span>
                                <span>{formatCurrency(maxAmount)}</span>
                            </div>

                            <Button asChild size="lg" className="w-full mt-8">
                                <Link href={ctaLinkWithAmount}>{primaryCtaText}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

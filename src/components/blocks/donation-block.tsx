// src/components/blocks/donation-block.tsx
'use client'

import React, { useId, useState, useMemo, useEffect } from "react";
import { Award, BookOpenCheck, GraduationCap, HandCoins, HeartHandshake, Leaf, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import Link from 'next/link';
import { cn } from "@/lib/utils";

interface DonationTier {
    _id: string;
    title: string;
    amount: number;
    impact: number;
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
    className?: string;
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
    className
}: DonationBlockProps) {
    const [donationAmount, setDonationAmount] = useState(minAmount);
    const id = useId();
    
    // Defer state initialization to client-side to avoid hydration mismatch
    useEffect(() => {
        setDonationAmount(minAmount);
    }, [minAmount]);

    const sortedTiers = useMemo(() => {
        return [...(donationTiers || [])].sort((a, b) => a.amount - b.amount);
    }, [donationTiers]);

    const presetAmounts = useMemo(() => {
        // Create 3 preset amounts: min, a value in the middle, and max
        if (maxAmount <= minAmount) return [minAmount];
        const midPoint = minAmount + (maxAmount - minAmount) / 2;
        const middleTier = sortedTiers.reduce((prev, curr) => {
            return (Math.abs(curr.amount - midPoint) < Math.abs(prev.amount - midPoint) ? curr : prev);
        });
        
        let amounts = [minAmount, middleTier.amount, maxAmount];
        
        if (minAmount > 5000) {
            // find a tier around 5000 and replace minAmount if it is too high
            const fiveKtier = sortedTiers.reduce((prev, curr) => {
                return (Math.abs(curr.amount - 5000) < Math.abs(prev.amount - 5000) ? curr : prev);
            });
            if (fiveKtier) amounts[0] = fiveKtier.amount;
        }

        // Ensure unique values and sort them
        return [...new Set(amounts)].sort((a, b) => a - b).slice(0,3);

    }, [sortedTiers, minAmount, maxAmount]);

    const activeTier = useMemo(() => {
      return sortedTiers.find(tier => donationAmount <= tier.amount) || sortedTiers[sortedTiers.length - 1] || null;
    }, [donationAmount, sortedTiers]);

    const studentsImpacted = useMemo(() => {
        if (!activeTier || sortedTiers.length === 0) return 0;
        
        const lowerBoundTier = [...sortedTiers].reverse().find(tier => donationAmount >= tier.amount) || { amount: 0, impact: 0 };
        const upperBoundTier = sortedTiers.find(tier => donationAmount <= tier.amount) || sortedTiers[sortedTiers.length - 1];

        if (!upperBoundTier) return 0;

        if (donationAmount >= upperBoundTier.amount) {
            return Math.floor(upperBoundTier.impact);
        }

        const lowerAmount = lowerBoundTier.amount;
        const upperAmount = upperBoundTier.amount;
        const lowerImpact = lowerBoundTier.impact;
        const upperImpact = upperBoundTier.impact;

        if (upperAmount === lowerAmount) {
            return Math.floor(upperImpact);
        }
        
        const amountRange = upperAmount - lowerAmount;
        const impactRange = upperImpact - lowerImpact;
        
        const amountRatio = (donationAmount - lowerAmount) / amountRange;
        const calculatedImpact = lowerImpact + (amountRatio * impactRange);

        return Math.floor(calculatedImpact);
    }, [donationAmount, activeTier, sortedTiers]);
    
    const ctaLinkWithAmount = `${primaryCtaLink}${primaryCtaLink && primaryCtaLink.includes('?') ? '&' : '?'}amount=${donationAmount}`;

    if (!donationTiers || donationTiers.length === 0) {
        return null;
    }

    return (
        <section className={cn("py-20 md:py-28 bg-secondary/20", className)}>
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
                    {subheading && <p className="text-muted-foreground mt-4 text-lg">{subheading}</p>}
                </div>

                <div className="max-w-4xl mx-auto mt-12 bg-card rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="text-center md:text-left">
                            <div className="mb-4">
                                {activeTier?.icon && (
                                   <div className="mx-auto md:mx-0 bg-primary/10 p-4 rounded-full w-fit mb-4 transition-all duration-300">
                                       {iconMap[activeTier.icon] || <HandCoins className="h-10 w-10 text-primary" />}
                                   </div>
                                )}
                                <p className="text-sm font-semibold uppercase tracking-wider text-primary">{activeTier?.title || 'Supporter'}</p>
                                <p id={id} className="text-4xl md:text-5xl font-bold text-foreground mt-2">{formatCurrency(donationAmount)}</p>
                            </div>
                            <div className="mt-4 text-muted-foreground text-lg">
                                Your contribution can provide <span className="font-bold text-primary">{studentsImpacted}</span> {activeTier?.impactUnitLabel || 'students with support'}.
                            </div>
                        </div>

                        <div className="flex flex-col justify-center h-full">
                            <div className="grid grid-cols-3 gap-2 mb-6">
                                {presetAmounts.map((amount) => (
                                    <Button
                                        key={amount}
                                        variant={donationAmount === amount ? "default" : "outline"}
                                        onClick={() => setDonationAmount(amount)}
                                        size="sm"
                                        className="text-xs sm:text-sm"
                                    >
                                        {formatCurrency(amount)}
                                    </Button>
                                ))}
                            </div>
                           <Slider
                                value={[donationAmount]}
                                onValueChange={(value) => setDonationAmount(value[0])}
                                min={minAmount}
                                max={maxAmount}
                                step={(maxAmount - minAmount) / 100}
                                className="w-full"
                                aria-labelledby={id}
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

// src/components/blocks/donation-block.tsx
'use client'

import { Award, BookOpenCheck, GraduationCap, HandCoins, HeartHandshake, Leaf, Users, Goal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DonationTier {
    _id: string;
    title: string;
    amount: number;
    description: string;
    icon: string;
}

interface DonationBlockProps {
    heading: string;
    subheading?: string;
    fundingGoal: number;
    currentAmountRaised: number;
    donationTiers: DonationTier[];
    primaryCtaText?: string;
    primaryCtaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
    'HeartHandshake': <HeartHandshake className="h-8 w-8 text-primary" />,
    'Users': <Users className="h-8 w-8 text-primary" />,
    'Leaf': <Leaf className="h-8 w-8 text-primary" />,
    'Goal': <Goal className="h-8 w-8 text-primary" />,
    'Award': <Award className="h-8 w-8 text-primary" />,
    'BookOpenCheck': <BookOpenCheck className="h-8 w-8 text-primary" />,
    'GraduationCap': <GraduationCap className="h-8 w-8 text-primary" />,
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
    fundingGoal,
    currentAmountRaised,
    donationTiers,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink
}: DonationBlockProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculatedProgress = (currentAmountRaised / fundingGoal) * 100;
        const timer = setTimeout(() => setProgress(calculatedProgress), 500);
        return () => clearTimeout(timer);
    }, [currentAmountRaised, fundingGoal]);

    return (
        <section className="py-20 md:py-28 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
                    {subheading && <p className="text-muted-foreground mt-4">{subheading}</p>}
                </div>

                <Card className="max-w-4xl mx-auto mt-12 bg-card">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Fundraising Progress</CardTitle>
                        <div className="flex justify-between items-end mt-2">
                            <div className="text-left">
                                <p className="text-sm text-muted-foreground">Raised</p>
                                <p className="text-2xl font-bold text-primary">{formatCurrency(currentAmountRaised)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Goal</p>
                                <p className="text-2xl font-bold">{formatCurrency(fundingGoal)}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Progress value={progress} className="w-full h-4" />
                        <p className="text-center text-sm text-muted-foreground mt-2">{progress.toFixed(2)}% of goal raised</p>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                    {donationTiers.map((tier) => (
                        <Card key={tier._id} className="text-center flex flex-col">
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                                    {iconMap[tier.icon] || <HandCoins className="h-8 w-8 text-primary" />}
                                </div>
                                <CardTitle>{tier.title}</CardTitle>
                                <p className="text-2xl font-bold text-primary">{formatCurrency(tier.amount)}</p>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{tier.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    {primaryCtaText && primaryCtaLink && (
                        <Button asChild size="lg">
                            <Link href={primaryCtaLink}>{primaryCtaText}</Link>
                        </Button>
                    )}
                    {secondaryCtaText && secondaryCtaLink && (
                         <Button asChild size="lg" variant="outline">
                            <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}

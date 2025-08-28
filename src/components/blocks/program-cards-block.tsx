// src/components/blocks/program-cards-block.tsx
'use client';

import { Cpu, Fingerprint, Goal, HeartHandshake, IndianRupee, Languages, Leaf, MapPin, Pencil, Settings2, Sparkles, Users, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Program {
    _id: string;
    icon: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
}

interface ProgramCardsBlockProps {
    _key: string;
    heading?: string;
    subheading?: string;
    programs: Program[];
}

const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  'Zap': Zap,
  'Cpu': Cpu,
  'Fingerprint': Fingerprint,
  'Pencil': Pencil,
  'Settings2': Settings2,
  'Sparkles': Sparkles,
  'MapPin': MapPin,
  'Languages': Languages,
  'IndianRupee': IndianRupee,
  'HeartHandshake': HeartHandshake,
  'Users': Users,
  'Leaf': Leaf,
  'Goal': Goal,
};

function GridPattern({ 	width, 	height, 	x, 	y, 	squares, 	...props }: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) { 	
    const patternId = React.useId();  	
    return ( 		
        <svg aria-hidden="true" {...props}> 			
            <defs> 				
                <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}> 					
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" /> 				
                </pattern> 			
            </defs> 			
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} /> 			
            {squares && ( 				
                <svg x={x} y={y} className="overflow-visible"> 					
                    {squares.map(([x, y], index) => ( 						
                        <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} /> 					
                    ))} 				
                </svg> 			
            )} 		
        </svg> 	
    ); 
}

function genRandomPattern(length?: number): number[][] {
    length = length ?? 5;
    return Array.from({ length }, () => [
        Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
        Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
    ]);
}

interface FeatureCardProps extends React.ComponentProps<'div'> {
    program: Program;
}

function FeatureCard({ program, className, ...props }: FeatureCardProps) {
    const [pattern, setPattern] = useState<number[][] | undefined>(undefined);
    const Icon = iconMap[program.icon] || Zap;

    useEffect(() => {
        setPattern(genRandomPattern());
    }, []);


    const cardContent = (
        <div className={cn('relative overflow-hidden p-6 h-full group', className)} {...props}>
            <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
                    <GridPattern
                        width={20}
                        height={20}
                        x="-12"
                        y="4"
                        squares={pattern}
                        className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
                    />
                </div>
            </div>
            <Icon className="text-foreground/75 size-6" strokeWidth={1} aria-hidden />
            <h3 className="mt-10 text-sm md:text-base font-medium">{program.title}</h3>
            <p className="text-muted-foreground relative z-20 mt-2 text-sm">{program.description}</p>
            {program.buttonText && program.buttonLink && (
                <div className="relative z-20 mt-4 text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {program.buttonText}
                    <ArrowRight className="size-4" />
                </div>
            )}
        </div>
    );

    if (program.buttonLink) {
        return <Link href={program.buttonLink}>{cardContent}</Link>;
    }

    return cardContent;
}

export function ProgramCardsBlock({ _key, heading, subheading, programs }: ProgramCardsBlockProps) {
  return (
    <section key={_key} className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
            {heading && (
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">{heading}</h2>
                    {subheading && <p className="text-muted-foreground">{subheading}</p>}
                </div>
            )}
             
            <div className="relative mx-auto grid max-w-2xl lg:max-w-5xl divide-x divide-y border sm:grid-cols-2 lg:grid-cols-3">
                {programs?.map((program) => (
                    <FeatureCard key={program._id} program={program} />
                ))}
            </div>
        </div>
    </section>
  )
}

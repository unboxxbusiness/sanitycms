// src/components/blocks/program-cards-block.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Languages, MapPin, HeartHandshake, Users, Leaf, Goal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Program {
    _id: string;
    icon: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
}

interface ProgramCardsBlockProps {
    heading?: string;
    subheading?: string;
    programs: Program[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  'MapPin': <MapPin className="h-8 w-8 text-primary" />,
  'Languages': <Languages className="h-8 w-8 text-primary" />,
  'IndianRupee': <IndianRupee className="h-8 w-8 text-primary" />,
  'HeartHandshake': <HeartHandshake className="h-8 w-8 text-primary" />,
  'Users': <Users className="h-8 w-8 text-primary" />,
  'Leaf': <Leaf className="h-8 w-8 text-primary" />,
  'Goal': <Goal className="h-8 w-8 text-primary" />,
};

export function ProgramCardsBlock({ heading, subheading, programs }: ProgramCardsBlockProps) {
  return (
    <section id="programs" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
                {heading && <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>}
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs?.map((program) => (
                    <Card key={program._id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card flex flex-col">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                                {iconMap[program.icon] || <Goal className="h-8 w-8 text-primary" />}
                            </div>
                            <CardTitle className="mt-4">{program.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                            <p className="text-muted-foreground flex-grow">{program.description}</p>
                            {program.buttonLink && program.buttonText &&
                                <Button asChild variant="link" className="mt-6">
                                    <Link href={program.buttonLink}>{program.buttonText}</Link>
                                </Button>
                            }
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
}

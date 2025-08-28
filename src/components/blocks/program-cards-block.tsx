// src/components/blocks/program-cards-block.tsx
import { Cpu, Fingerprint, Goal, HeartHandshake, IndianRupee, Languages, Leaf, MapPin, Pencil, Settings2, Sparkles, Users, Zap } from 'lucide-react';

interface Program {
    _id: string;
    icon: string;
    title: string;
    description: string;
}

interface ProgramCardsBlockProps {
    _key: string;
    heading?: string;
    subheading?: string;
    programs: Program[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  'Zap': <Zap className="size-4" />,
  'Cpu': <Cpu className="size-4" />,
  'Fingerprint': <Fingerprint className="size-4" />,
  'Pencil': <Pencil className="size-4" />,
  'Settings2': <Settings2 className="size-4" />,
  'Sparkles': <Sparkles className="size-4" />,
  'MapPin': <MapPin className="size-4" />,
  'Languages': <Languages className="size-4" />,
  'IndianRupee': <IndianRupee className="size-4" />,
  'HeartHandshake': <HeartHandshake className="size-4" />,
  'Users': <Users className="size-4" />,
  'Leaf': <Leaf className="size-4" />,
  'Goal': <Goal className="size-4" />,
};

export function ProgramCardsBlock({ _key, heading, subheading, programs }: ProgramCardsBlockProps) {
  return (
    <section key={_key} className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
            {heading && (
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">{heading}</h2>
                    {subheading && <p>{subheading}</p>}
                </div>
            )}
             
            <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                {programs?.map((program) => (
                    <div key={program._id} className="space-y-3">
                        <div className="flex items-center gap-2">
                            {iconMap[program.icon] || <Zap className="size-4" />}
                            <h3 className="text-sm font-medium">{program.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{program.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

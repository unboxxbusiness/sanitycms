// src/components/slices/impact-section.tsx
import { Goal, HeartHandshake, Leaf, Users } from 'lucide-react';

interface ImpactItem {
    _key: string;
    stat: string;
    description: string;
    icon: string;
}

interface ImpactSectionProps {
    impact: ImpactItem[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  'HeartHandshake': <HeartHandshake className="h-8 w-8 text-primary" />,
  'Users': <Users className="h-8 w-8 text-primary" />,
  'Leaf': <Leaf className="h-8 w-8 text-primary" />,
  'Goal': <Goal className="h-8 w-8 text-primary" />,
};

export function ImpactSection({ impact }: ImpactSectionProps) {
  return (
    <section id="impact" className="py-20 md:py-28 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We are proud of the difference we're making across the nation.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {impact.map((item) => (
            <div key={item._key} className="p-4">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                {iconMap[item.icon] || <Goal className="h-8 w-8 text-primary" />}
            </div>
            <p className="text-4xl font-bold text-primary">{item.stat}</p>
            <p className="text-muted-foreground mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

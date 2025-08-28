// src/components/blocks/impact-metrics-block.tsx
import { Goal, HeartHandshake, Leaf, Users } from 'lucide-react';

interface Metric {
    _id: string;
    value: string;
    label: string;
    icon: string;
}

interface ImpactMetricsBlockProps {
    heading?: string;
    metrics: Metric[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  'HeartHandshake': <HeartHandshake className="h-8 w-8 text-primary" />,
  'Users': <Users className="h-8 w-8 text-primary" />,
  'Leaf': <Leaf className="h-8 w-8 text-primary" />,
  'Goal': <Goal className="h-8 w-8 text-primary" />,
};

export function ImpactMetricsBlock({ heading, metrics }: ImpactMetricsBlockProps) {
  return (
    <section id="impact" className="py-20 md:py-28 bg-secondary/20">
      <div className="container mx-auto px-4">
        {heading && (
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
            </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((item) => (
            <div key={item._id} className="p-4">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    {iconMap[item.icon] || <Goal className="h-8 w-8 text-primary" />}
                </div>
                <p className="text-4xl font-bold text-primary">{item.value}</p>
                <p className="text-muted-foreground mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

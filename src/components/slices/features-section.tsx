// src/components/slices/features-section.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Languages, MapPin, HeartHandshake, Users, Leaf, Goal } from 'lucide-react';

interface Feature {
    _key: string;
    icon: string;
    title: string;
    description: string;
}

interface FeaturesSectionProps {
    features: Feature[];
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

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section id="features" className="py-20 md:py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why Choose AmulyaX India?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Discover the powerful features that make our platform the best choice for your needs in India.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {features?.map((feature) => (
                    <Card key={feature._key} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                                {iconMap[feature.icon] || <MapPin className="h-8 w-8 text-primary" />}
                            </div>
                            <CardTitle className="mt-4">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
}

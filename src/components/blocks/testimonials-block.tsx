// src/components/blocks/testimonials-block.tsx
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity-image';

interface Testimonial {
    _id: string;
    quote: string;
    author: string;
    title: string;
    image: SanityImageSource;
}

interface TestimonialsBlockProps {
    heading?: string;
    subheading?: string;
    testimonials: Testimonial[];
}

export function TestimonialsBlock({ heading, subheading, testimonials }: TestimonialsBlockProps) {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-secondary/10">
        <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
                {heading && <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>}
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials?.map((testimonial) => (
                    <Card key={testimonial._id} className="shadow-lg bg-card">
                        <CardContent className="pt-6">
                            <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-4 border-t pt-4">
                                {testimonial.image &&
                                    <Image src={urlFor(testimonial.image).width(40).height(40).url()} alt={testimonial.author} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                                }
                                <div>
                                    <p className="font-semibold">{testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
}

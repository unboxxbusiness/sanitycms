// src/components/slices/testimonials-section.tsx
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/lib/sanity';

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface Testimonial {
    _key: string;
    quote: string;
    author: string;
    title: string;
    image: SanityImageSource;
}

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Loved by Teams Across India</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">See what our customers have to say about their experience with AmulyaX India.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials?.map((testimonial) => (
                    <Card key={testimonial._key} className="shadow-lg bg-card">
                        <CardContent className="pt-6">
                            <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-4">
                                <Image src={urlFor(testimonial.image).width(40).height(40).url()} alt="Customer photo" width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
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

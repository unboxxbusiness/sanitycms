// src/components/blocks/testimonials-block.tsx
import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { urlFor } from "@/lib/sanity-image"

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

interface TestimonialsSectionProps {
    title: string
    description: string
    testimonials: Array<{
        author: TestimonialAuthor
        text: string
        href?: string
    }>
    className?: string
}

function TestimonialsSection({ title, description, testimonials, className }: TestimonialsSectionProps) {
    return (
        <section className={cn(
            "bg-background text-foreground",
            "py-12 sm:py-24 md:py-32 px-0",
            className
        )}>
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:gap-16">
                <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
                    <h2 className="max-w-[720px] text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight">
                        {title}
                    </h2>
                    <p className="text-md max-w-[600px] text-muted-foreground sm:text-lg">
                        {description}
                    </p>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
                        <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                            {[...Array(4)].map((_, setIndex) => (
                                testimonials.map((testimonial, i) => (
                                    <TestimonialCard
                                        key={`${setIndex}-${i}`}
                                        {...testimonial}
                                    />
                                ))
                            ))}
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
                </div>
            </div>
        </section>
    )
}

export function TestimonialsBlock({ heading, subheading, testimonials: rawTestimonials }: TestimonialsBlockProps) {
    const testimonials = rawTestimonials.map(t => ({
        text: t.quote,
        author: {
            name: t.author,
            title: t.title,
            imageSrc: t.image ? urlFor(t.image).width(40).height(40).url() : `https://ui-avatars.com/api/?name=${t.author}`,
        }
    }))

    return <TestimonialsSection 
        title={heading || "Loved by Teams Across India"}
        description={subheading || "Hear from the people who have experienced the AmulyaX difference."}
        testimonials={testimonials}
    />
}

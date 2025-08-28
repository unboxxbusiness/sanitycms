// src/components/ui/testimonial-card.tsx
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface TestimonialAuthor {
    name: string
    title: string
    imageSrc: string
}

interface TestimonialCardProps {
    author: TestimonialAuthor
    text: string
    href?: string
}

export function TestimonialCard({ author, text, href }: TestimonialCardProps) {
    const cardContent = (
        <div
            className={cn(
                "flex w-80 shrink-0 flex-col gap-4 rounded-xl border bg-card p-6 text-left shadow-sm",
                href && "transition-all duration-300 hover:border-primary hover:shadow-lg"
            )}
        >
            <p className="flex-1 text-muted-foreground">“{text}”</p>
            <div className="flex items-center gap-3">
                <Image
                    src={author.imageSrc}
                    alt={author.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover"
                    data-ai-hint="person portrait"
                />
                <div>
                    <p className="font-semibold">{author.name}</p>
                    <p className="text-sm text-muted-foreground">{author.title}</p>
                </div>
            </div>
        </div>
    )

    if (href) {
        return (
            <Link href={href} target="_blank">
                {cardContent}
            </Link>
        )
    }

    return cardContent
}

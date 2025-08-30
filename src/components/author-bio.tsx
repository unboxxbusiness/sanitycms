// src/components/author-bio.tsx
import Image from 'next/image';
import { urlFor } from '@/lib/sanity-image';
import { Card, CardContent } from './ui/card';

interface Author {
    name: string;
    picture?: any;
    bio?: string;
}

interface AuthorBioProps {
    author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
    if (!author?.bio) {
        return null;
    }

    return (
        <Card className="bg-secondary/50 border-none">
            <CardContent className="p-6">
                <div className="flex items-start gap-6">
                    {author.picture && (
                        <Image
                            src={urlFor(author.picture).width(80).height(80).url()}
                            alt={author.name}
                            width={80}
                            height={80}
                            className="rounded-full flex-shrink-0"
                            data-ai-hint="person portrait"
                        />
                    )}
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold">About {author.name}</h3>
                        <p className="text-muted-foreground">{author.bio}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

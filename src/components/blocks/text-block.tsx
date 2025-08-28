// src/components/blocks/text-block.tsx
import { PortableText } from '@portabletext/react';
import { cn } from '@/lib/utils';

interface TextBlockProps {
  content: any[];
}

const portableTextComponents = {
    block: {
      h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
      h4: ({ children }: any) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
      blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 my-4">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 my-4">{children}</ol>,
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
            return <a href={value.href} rel={rel} className="text-primary underline hover:no-underline">{children}</a>;
        }
    }
};

export function TextBlock({ content }: TextBlockProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className={cn(
            "prose prose-lg max-w-4xl mx-auto dark:prose-invert",
            "prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ol:text-muted-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
        )}>
          <PortableText value={content} components={portableTextComponents} />
        </div>
      </div>
    </section>
  );
}

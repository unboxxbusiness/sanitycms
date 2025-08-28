// src/components/slices/rich-text-block.tsx
import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    h1: ({children}) => <h1 className="text-5xl font-bold my-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-4xl font-bold my-4">{children}</h2>,
    h3: ({children}) => <h3 className="text-3xl font-bold my-4">{children}</h3>,
    h4: ({children}) => <h4 className="text-2xl font-bold my-4">{children}</h4>,
    normal: ({children}) => <p className="text-lg mb-4">{children}</p>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-4 my-4 italic">{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>,
    number: ({children}) => <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="text-lg">{children}</li>,
    number: ({children}) => <li className="text-lg">{children}</li>,
  },
  marks: {
    link: ({children, value}) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </a>
      )
    },
  },
}


interface RichTextBlockProps {
    title?: string;
    content: any;
}

export function RichTextBlock({ title, content }: RichTextBlockProps) {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {title && <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">{title}</h1>}
        <div className="prose prose-lg lg:prose-xl max-w-none">
          <PortableText value={content} components={components} />
        </div>
      </div>
    </section>
  );
}

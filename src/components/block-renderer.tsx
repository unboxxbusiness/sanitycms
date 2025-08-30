// src/components/block-renderer.tsx
import { HeroBlock } from '@/components/blocks/hero-block';
import { CtaBlock } from '@/components/blocks/cta-block';
import { ProgramCardsBlock } from '@/components/blocks/program-cards-block';
import { ImpactMetricsBlock } from '@/components/blocks/impact-metrics-block';
import { TestimonialsBlock } from '@/components/blocks/testimonials-block';
import { PartnerLogoBlock } from '@/components/blocks/partner-logo-block';
import { TextBlock } from '@/components/blocks/text-block';
import { VideoBlock } from '@/components/blocks/video-block';
import { DonationBlock } from '@/components/blocks/donation-block';
import { BlogPostGridBlock } from './blocks/blog-post-grid-block';

// Add other block components here
// import { SomeOtherBlock } from '@/components/blocks/some-other-block';

const componentMap: { [key: string]: React.ComponentType<any> } = {
  heroBlock: HeroBlock,
  ctaBlock: CtaBlock,
  programCardsBlock: ProgramCardsBlock,
  impactMetricsBlock: ImpactMetricsBlock,
  testimonialsBlock: TestimonialsBlock,
  partnerLogoBlock: PartnerLogoBlock,
  textBlock: TextBlock,
  videoBlock: VideoBlock,
  donationBlock: DonationBlock,
  blogPostGridBlock: BlogPostGridBlock,
  // Add other block mappings here
  // someOtherBlock: SomeOtherBlock,
};

interface BlockRendererProps {
  blocks: any[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return <p className="container text-center py-12">No content blocks have been added to this page yet.</p>;
  }

  return (
    <>
      {blocks.map((block: any, index: number) => {
        // The key for the block should be unique, using _key is good, but fallback to index if not available
        const blockKey = block._key || `block-${index}`;
        const Component = componentMap[block._type];

        if (Component) {
          return <Component key={blockKey} {...block} />;
        }
        // This handles standard Portable Text blocks that might be mixed in, especially in reusable content.
        if (block._type === 'block') {
            // We can add a simple renderer here if needed, but for now we assume TextBlock handles this.
            // For now, let's just log a warning if we encounter a raw block where we don't expect it.
             console.warn(`Direct rendering of a raw 'block' type is not fully supported here. Consider wrapping in a Text Block. Block key: ${blockKey}`);
             return null;
        }

        return <p key={blockKey}>Component for "{block._type}" not found.</p>;
      })}
    </>
  );
}
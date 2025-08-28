// src/components/block-renderer.tsx
import { HeroBlock } from '@/components/blocks/hero-block';
import { CtaBlock } from '@/components/blocks/cta-block';
import { ProgramCardsBlock } from '@/components/blocks/program-cards-block';
import { ImpactMetricsBlock } from '@/components/blocks/impact-metrics-block';
import { TestimonialsBlock } from '@/components/blocks/testimonials-block';
import { PartnerLogoBlock } from '@/components/blocks/partner-logo-block';
import { TextBlock } from '@/components/blocks/text-block';

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
      {blocks.map((block: any) => {
        const Component = componentMap[block._type];
        if (Component) {
          return <Component key={block._key} {...block} />;
        }
        return <p key={block._key}>Component for "{block._type}" not found.</p>;
      })}
    </>
  );
}

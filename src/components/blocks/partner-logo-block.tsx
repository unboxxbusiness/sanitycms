// src/components/blocks/partner-logo-block.tsx
"use client"

import React, {
  useCallback,
  useEffect,
  useState,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/lib/sanity-image';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Partner {
  _id: string;
  name: string;
  logo: SanityImageSource;
  website?: string;
}

interface PartnerLogoBlockProps {
  heading?: string;
  subheading?: string;
  partners: Partner[];
}

interface Logo {
  name: string
  id: string
  src: string
}

interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const columns: Logo[][] = Array.from({ length: columnCount }, () => []);
  if (allLogos.length === 0) return columns;

  const shuffled = shuffleArray(allLogos);
  const numRows = Math.ceil(shuffled.length / columnCount) * 2; // Make it longer to ensure smooth looping

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < columnCount; col++) {
      const logoIndex = (row * columnCount + col) % shuffled.length;
      columns[col].push(shuffled[logoIndex]);
    }
  }

  // Shuffle within each column for more randomness
  columns.forEach(col => shuffleArray(col));

  return columns;
};

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 2000
    const columnDelay = index * 200
    
    if (logos.length === 0) return null;

    const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)
    const currentLogo = logos[currentIndex];

    if (!currentLogo) return null;

    return (
      <motion.div
        className="relative h-28 w-48 overflow-hidden md:h-32 md:w-64"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentLogo.id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.5,
              },
            }}
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
              transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.3,
              },
            }}
          >
            <Image 
              src={currentLogo.src}
              alt={currentLogo.name}
              width={200}
              height={100}
              className="h-auto w-auto max-h-[80%] max-w-[80%] object-contain dark:invert"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }
)
LogoColumn.displayName = 'LogoColumn'

interface LogoCarouselProps {
  columnCount?: number
  logos: Logo[]
}

export function LogoCarousel({ columnCount = 4, logos }: LogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const update = () => setCurrentTime(prev => prev + 100);
    const intervalId = setInterval(update, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (logos.length > 0) {
      const distributed = distributeLogos(logos, columnCount)
      setLogoSets(distributed)
    }
  }, [logos, columnCount])

  if (logos.length === 0) return null;

  return (
    <div className="flex justify-center space-x-4">
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  )
}

export function PartnerLogoBlock({ heading, subheading, partners }: PartnerLogoBlockProps) {
    const isMobile = useIsMobile();
    if (!partners || partners.length === 0) {
        return null;
    }

    const formattedLogos: Logo[] = partners
        .filter(partner => partner.logo && (partner.logo as any).asset)
        .map((partner) => ({
            id: partner._id,
            name: partner.name,
            src: urlFor(partner.logo).height(120).url(),
        }));
    
    if (formattedLogos.length === 0) {
        return null;
    }

    return (
        <section className="bg-background py-16 md:py-28">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-12">
                    {heading && <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>}
                    {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
                </div>
<<<<<<< HEAD
                <div className="hidden md:flex justify-center">
                    <LogoCarousel logos={formattedLogos} columnCount={4} />
                </div>
                <div className="flex md:hidden justify-center">
                    <LogoCarousel logos={formattedLogos} columnCount={2} />
=======
                <div className="flex justify-center">
                    <LogoCarousel logos={formattedLogos} columnCount={isMobile ? 2 : 4} />
>>>>>>> eee916f394eb714f19abe46c8560bb48a9176e33
                </div>
            </div>
        </section>
    );
}

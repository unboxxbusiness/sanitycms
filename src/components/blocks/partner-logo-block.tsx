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

interface Partner {
  _id: string;
  name: string;
  logo: SanityImageSource;
  website?: string;
}

interface PartnerLogoBlockProps {
  heading?: string;
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
  const shuffled = shuffleArray(allLogos)
  const columns: Logo[][] = Array.from({ length: columnCount }, () => [])

  if (shuffled.length === 0) return columns;

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  const maxLength = Math.max(...columns.map((col) => col.length))
  columns.forEach((col) => {
    while (col.length > 0 && col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 2000
    const columnDelay = index * 200
    
    if (logos.length === 0) return null;

    const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)
    const currentLogo = logos[currentIndex];

    return (
      <motion.div
        className="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
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
              width={160}
              height={60}
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

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId)
  }, [updateTime])

  useEffect(() => {
    if (logos.length > 0) {
      const distributedLogos = distributeLogos(logos, columnCount)
      setLogoSets(distributedLogos)
    }
  }, [logos, columnCount])

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

export function PartnerLogoBlock({ heading, partners }: PartnerLogoBlockProps) {
    if (!partners || partners.length === 0) {
        return null;
    }

    const formattedLogos: Logo[] = partners.map((partner) => ({
        id: partner._id,
        name: partner.name,
        src: urlFor(partner.logo).height(80).url(),
    }));

    return (
        <section className="bg-background py-16 md:py-28">
            <div className="container mx-auto px-4">
                {heading && (
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
                    </div>
                )}
                <LogoCarousel logos={formattedLogos} />
            </div>
        </section>
    );
}
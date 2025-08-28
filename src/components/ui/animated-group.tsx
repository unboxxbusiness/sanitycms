// src/components/ui/animated-group.tsx
'use client'

import { cn } from '@/lib/utils'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

interface AnimatedGroupContextProps {
    variant: 'hidden' | 'visible'
}

const AnimatedGroupContext = createContext<AnimatedGroupContextProps | null>(null)

export const useAnimatedGroup = () => {
    const context = useContext(AnimatedGroupContext)
    if (!context) {
        throw new Error('useAnimatedGroup must be used within an AnimatedGroup')
    }
    return context
}

interface AnimatedGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    variants: {
        container?: {
            hidden?: React.CSSProperties
            visible?: React.CSSProperties & {
                transition?: {
                    delayChildren?: number
                    staggerChildren?: number
                }
            }
        }
        item?: {
            hidden?: React.CSSProperties
            visible?: React.CSSProperties & {
                transition?: {
                    type?: 'spring' | 'tween'
                    bounce?: number
                    duration?: number
                }
            }
        }
    }
}

export function AnimatedGroup({
    children,
    className,
    variants,
    ...props
}: AnimatedGroupProps) {
    const [variant, setVariant] = useState<'hidden' | 'visible'>('hidden')
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(
                        () => setVariant('visible'),
                        variants.container?.visible?.transition?.delayChildren
                            ? variants.container.visible.transition.delayChildren * 1000
                            : 0
                    )
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [variants])

    const containerStyle =
        variant === 'visible'
            ? variants.container?.visible
            : variants.container?.hidden

    return (
        <div ref={ref} className={className} style={containerStyle} {...props}>
            <AnimatedGroupContext.Provider value={{ variant }}>
                {React.Children.map(children, (child, index) => (
                    <AnimatedChild
                        key={index}
                        variants={variants.item}
                        staggerDelay={
                            (variants.container?.visible?.transition?.staggerChildren ?? 0) *
                            index *
                            1000
                        }>
                        {child}
                    </AnimatedChild>
                ))}
            </AnimatedGroupContext.Provider>
        </div>
    )
}

interface AnimatedChildProps {
    children: React.ReactNode
    variants?: {
        hidden?: React.CSSProperties
        visible?: React.CSSProperties & {
            transition?: {
                type?: 'spring' | 'tween'
                bounce?: number
                duration?: number
            }
        }
    }
    staggerDelay?: number
}

function AnimatedChild({
    children,
    variants,
    staggerDelay = 0,
}: AnimatedChildProps) {
    const { variant } = useAnimatedGroup()
    const [childVariant, setChildVariant] = useState<'hidden' | 'visible'>(
        'hidden'
    )

    useEffect(() => {
        if (variant === 'visible') {
            const timer = setTimeout(() => {
                setChildVariant('visible')
            }, staggerDelay)
            return () => clearTimeout(timer)
        }
    }, [variant, staggerDelay])

    const childStyle =
        childVariant === 'visible' ? variants?.visible : variants?.hidden
    const transitionDuration = variants?.visible?.transition?.duration ?? 0.5
    const transitionTimingFunction =
        variants?.visible?.transition?.type === 'spring'
            ? `cubic-bezier(0.175, 0.885, 0.32, 1.275)`
            : 'ease-out'

    return (
        <div
            style={{
                ...childStyle,
                transition: `all ${transitionDuration}s ${transitionTimingFunction}`,
            }}>
            {children}
        </div>
    )
}

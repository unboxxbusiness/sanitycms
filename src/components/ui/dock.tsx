// src/components/ui/dock.tsx
"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import React, { PropsWithChildren, useRef } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
}

const dockVariants = cva(
  "flex items-center h-full p-2 rounded-full border shadow-lg bg-background/80 backdrop-blur-md"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, direction = "horizontal", ...props }, ref) => {
    const mouseX = useMotionValue(Infinity);
    const mouseY = useMotionValue(Infinity);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if(direction === 'horizontal') {
            mouseX.set(e.pageX);
        } else {
            mouseY.set(e.pageY);
        }
    };

    const onMouseLeave = () => {
        if(direction === 'horizontal') {
            mouseX.set(Infinity);
        } else {
            mouseY.set(Infinity);
        }
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(dockVariants({ className }), className, {
            "flex-col gap-2": direction === "vertical",
            "items-center h-full": direction === "horizontal",
        })}
        {...props}
      >
        {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
                return child;
            }
            return React.cloneElement(child as React.ReactElement<PropsWithChildren<DockIconProps>>, {
                mouseX: direction === 'horizontal' ? mouseX : undefined,
                mouseY: direction === 'vertical' ? mouseY : undefined,
            })
        })}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  className?: string;
  children?: React.ReactNode;
  mouseX?: MotionValue;
  mouseY?: MotionValue;
  [key: string]: any;
}

const DockIcon = ({
  className,
  children,
  mouseX,
  mouseY,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = mouseX || mouseY;

  if (!motionValue) {
    return (
        <div
            ref={ref}
            className={cn(
                "flex aspect-square items-center justify-center rounded-full w-10",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
  }

  const distance = useTransform(motionValue, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
    const center = mouseY ? bounds.y + bounds.height / 2 : bounds.x + bounds.width / 2;
    return val - center;
  });

  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.75, 1]);
  const scale = useSpring(scaleSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className={cn(
        "flex aspect-square items-center justify-center rounded-full w-10",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };

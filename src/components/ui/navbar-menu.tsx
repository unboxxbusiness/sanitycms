// src/components/ui/navbar-menu.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
}) => {
  const hasChildren = React.Children.count(children) > 0;

  const content = (
      <motion.div
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-foreground/80 hover:text-foreground flex items-center gap-1"
      >
        <span>{item}</span>
        {hasChildren && <ChevronDown className="h-4 w-4" />}
      </motion.div>
  );

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {href && !hasChildren ? <Link href={href}>{content}</Link> : content}

      {active !== null && hasChildren && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.0rem)] left-1/2 transform -translate-x-1/2 hidden lg:block">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-card backdrop-blur-sm rounded-2xl overflow-hidden border shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      onMouseLeave={() => setActive(null)} // resets the state
      className={cn("relative flex justify-center py-4", className)}
    >
      {children}
    </div>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-muted-foreground hover:text-foreground"
    >
      {children}
    </Link>
  );
};

// src/components/layout/main-nav.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import type { HeaderSettings } from "./header"

interface MainNavProps {
  items?: HeaderSettings['mainNavigation']
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  if (!items || items.length === 0) {
    return null
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) =>
          item.submenu ? (
            <NavigationMenuItem key={item._key}>
              <NavigationMenuTrigger>{item.text}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {item.submenu.map((subItem) => (
                    <ListItem
                      key={subItem._key}
                      href={subItem.link}
                      title={subItem.text}
                    >
                      {/* You can add a description field in Sanity if needed */}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item._key}>
              <Link href={item.link} passHref>
                <NavigationMenuLink 
                  asChild
                  className={navigationMenuTriggerStyle()}
                  active={pathname === item.link}
                >
                  <a>{item.text}</a>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

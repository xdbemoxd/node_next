"use client"

import * as React from "react"
import Link from "next/link"
import { components } from "../../data/data";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    
    <NavigationMenu viewport={false}>
    
      <NavigationMenuList>
    
        <NavigationMenuItem>
    
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
    
                <Link href="/">Home</Link>
    
            </NavigationMenuLink>
    
        </NavigationMenuItem>
    
        <NavigationMenuItem>
    
          <NavigationMenuTrigger>Urgency</NavigationMenuTrigger>
    
          <NavigationMenuContent>
    
            <ul className="grid w-full gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
    
              {components.map((component) => (
                
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  className="max-sm:bg-amber-500 max-sm:w-[100]"
                >
                
                  {component.description}
                
                </ListItem>
              ))}
            
            </ul>
          
          </NavigationMenuContent>
        
        </NavigationMenuItem>
        
        <NavigationMenuItem>
        
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        
            <Link href="./createUser">About us</Link>
        
          </NavigationMenuLink>
        
        </NavigationMenuItem>

        <NavigationMenuItem>
        
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        
            <Link href="/">Sing In</Link>
        
          </NavigationMenuLink>
        
        </NavigationMenuItem>
      
      </NavigationMenuList>
    
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium ">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

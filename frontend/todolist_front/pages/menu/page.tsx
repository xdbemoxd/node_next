import * as React from "react"
import Link from "next/link"
import { auth } from "@/auth";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ButtonOut from "@/components/ui/buttoOut/page";

export async function NavigationMenuDemo() {
  const session = await auth()
  return (
    
    <NavigationMenu viewport={false}>
    
      <NavigationMenuList>
    
        <NavigationMenuItem>
    
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
    
                <Link href="/">Home</Link>
    
            </NavigationMenuLink>
    
        </NavigationMenuItem>
    
        <NavigationMenuItem>
    
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
    
              <Link href={`/pages/task/${session?.user?.id}`}>Dashboard</Link>
    
            </NavigationMenuLink>
    
        </NavigationMenuItem>
        
        <NavigationMenuItem>
        
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        
            <Link href={`/pages/aboutUs`}>About us</Link>
        
          </NavigationMenuLink>
        
        </NavigationMenuItem>

        <NavigationMenuItem>
        
          {session !== null ? <ButtonOut/> : undefined }
      
        </NavigationMenuItem>
      
      </NavigationMenuList>
    
    </NavigationMenu>
  )
}

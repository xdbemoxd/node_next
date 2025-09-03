import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { components } from "@/data/data"
import Link from "next/link"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="start">
      
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
      
        <DropdownMenuGroup>
      
          <DropdownMenuItem>
           
            Profile
      
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      
          </DropdownMenuItem>
        
        </DropdownMenuGroup>
        
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          
          <DropdownMenuItem>Activity</DropdownMenuItem>
          
          <DropdownMenuSub>
          
            <DropdownMenuSubTrigger>See task</DropdownMenuSubTrigger>
          
            <DropdownMenuPortal>
          
              <DropdownMenuSubContent>

                <ul className="grid w-full gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    
                              {components.map((component) => (

                                
                                <DropdownMenuItem key={component.title}
                                title={component.title}
                                >
                                    <Link href={component.href}>
                                    {component.title}
                                    </Link>
                                    
                                
                                </DropdownMenuItem>
                                
                               
                              ))}
                            
                            </ul>
          
              </DropdownMenuSubContent>
          
            </DropdownMenuPortal>
          
          </DropdownMenuSub>
        
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

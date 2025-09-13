import { Button } from "@/components/ui/button"
import { signOut } from '@/auth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { auth } from "@/auth";


export async function DropdownMenuDemo() {
  
  const session = await auth()
  
  return (
<div>
<DropdownMenu>
      
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="start">
      
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
      
        <DropdownMenuGroup>
      
          <DropdownMenuItem>
           
            <Link href={"/"}>home</Link>
      
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      
          </DropdownMenuItem>
        
        </DropdownMenuGroup>
        
        
        <DropdownMenuSeparator />

        <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
      
        <DropdownMenuGroup>
      
          <DropdownMenuItem>
           
            <Link href={`/pages/task/${session?.user?.id}`}>Dashboard</Link>
      
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      
          </DropdownMenuItem>
        
        </DropdownMenuGroup>
        
        
        <DropdownMenuSeparator />

        
        
        
        
         {session && (
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          {/* Un botón de Sign Out simple y siempre visible */}
          <DropdownMenuSeparator />
          <Button variant="ghost" type="submit">
            Sign Out
          </Button>
        </form>
      )}

        
      </DropdownMenuContent>
    </DropdownMenu>
</div>

    
  )
}

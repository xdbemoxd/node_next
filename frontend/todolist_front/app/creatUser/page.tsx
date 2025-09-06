"use client"

import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useActionState } from "react";
import { CreateUser } from "../lib/createUser/action"

export default function CreateForm() {

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [errorMessage, formAction, isPending] = useActionState(
        CreateUser,
        undefined,
      );


  return (
    <Card className="w-full max-w-sm">
      
      <CardHeader>
    
        <CardTitle>Creat to your account</CardTitle>
      
        <CardDescription>
      
          Please enter your personal details
      
        </CardDescription>
      
      </CardHeader>
      
      <CardContent>

        <form action={formAction}>
        
                <div className="flex flex-col gap-6">
                    
                    <div className="grid gap-2">
                        
                        <Label htmlFor="id">Id Card</Label>
                        
                        <Input 
                            id="id" 
                            name="id" 
                            type="text" 
                            placeholder="1234567" required />
                    </div>

                    <div className="grid gap-2">
                        
                        <Label htmlFor="email">Email</Label>
                        
                        <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="m@example.com"/>
                    </div>

                    <div className="grid gap-2">
                        
                        <Label htmlFor="password">Password</Label>
                        
                        <Input 
                            id="password" 
                            name="password" 
                            type="password" 
                            required />
                    </div>

                    <div className="grid gap-2">
                    
                        <Label htmlFor="name">Name</Label>
                        <Input 
                            id="name" 
                            name="name" 
                            type="text"/>
                    </div>

                    <div className="grid gap-2">

                        <Label htmlFor="lastName">Last Name</Label>
                        
                        <Input 
                            id="lastName" 
                            name="lastName" 
                            type="text" />
                    
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label htmlFor="date" className="px-1">Date of birth</Label>
                            
                            <Popover open={open} onOpenChange={setOpen}>
                                
                                <PopoverTrigger asChild>
                                
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-48 justify-between font-normal"
                                    >
                                
                                        {date ? date.toLocaleDateString() : "Select date"}
                                
                                        <ChevronDownIcon />
                                
                                    </Button>
                                
                                </PopoverTrigger>
                                
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                        setDate(date)
                                        setOpen(false)
                                        }}
                                    />

                                </PopoverContent>
                            
                            </Popover>
                        
                        <input type="hidden" name="dateOfBirth" value={date ? date.toISOString().split("T")[0] : ""} />
                    </div>
                </div>

            <Button className="mt-4 w-full" aria-disabled={isPending}>
                Create
            </Button>
        
        </form>

        <CardFooter>
            
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
                >
                {errorMessage && (
                    <>
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>

        </CardFooter>

      </CardContent>
      
    </Card>
  )
}

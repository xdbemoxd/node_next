"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useActionState, useEffect, useState } from "react";
import { CreateTask } from "@/app/lib/createTask/action"
import { useUrgency } from "@/app/hook/task/useUrgency"
import { Urgency } from "@/app/types/task"
import { useStatus } from "@/app/hook/task/useStatus"
import { Status } from '../../types/task';


export default function AddTaskForm() {
  
  const [errorMessage, formAction, isPending] = useActionState(
          CreateTask,
          undefined,
        );

  const { data, isError, isLoading, mutate } = useUrgency();
  const { dataStatus, isErrorStatus, isLoadingStatus, mutateStatus } = useStatus();
  const [ urgency, setUgency ] = useState([]);
  const [ status, setStatus ] = useState([]);

  useEffect( () => {
    
      if (data) setUgency(data);
    
      if (dataStatus) setStatus(dataStatus);

    }, [data, dataStatus]);

  useEffect(() => {
    // Si la acción ha terminado (isPending es false) y NO hubo errores,
    // entonces refrescamos los datos.
    if (!isPending && !errorMessage) {
      console.log("Acción completada con éxito. Refrescando datos...");
      
      // Llama a las funciones mutate para actualizar la UI
      mutate(); 
      mutateStatus();

      // Opcional: podrías resetear el formulario aquí también.
    }
  }, [isPending, errorMessage, mutate, mutateStatus]);

  if (isError || isErrorStatus) {
    
    return <p>There was an error fetching tasks.</p>
  }

  if( isLoading || isLoadingStatus ){
   
    return(
      <div className="min-h-screen bg-background flex items-center justify-center">
              
        <div className="text-center space-y-4">
                
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                
            <p className="text-lg font-medium text-foreground">Loading your tasks...</p>
            
            <p className="text-sm text-muted-foreground">Please wait while we prepare everything for you</p>
              
        </div>
        
      </div>
    )
  }


  return (
    
    <Card className="w-full max-w-2xl mx-auto">
      
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          
          <Plus className="w-5 h-5" />
          Add new task
        
        </CardTitle>
      
      </CardHeader>
      
      <CardContent>
      
        <form action={formAction} className="space-y-4">

          <div className="flex flex-col gap-6">
      
          <div className="grid gap-2">
      
            <Label htmlFor="name_task">Nombre de la Tarea *</Label>
      
            <Input
              id="name_task"
              name="name_task"
              type="text"
              placeholder="Ingresa el nombre de la tarea"
              required
            />
          
          </div>

          <div className="grid gap-2">
            
            <Label htmlFor="description">Descripción</Label>
            
            <Textarea
              id="description"
              name="description"
              placeholder="Descripción opcional de la tarea"
              rows={3}
            
            />
          
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="grid gap-2">
                
                <Label htmlFor="urgency">Urgencia *</Label>
                  
                  <Select name="urgency" required>
                    
                    <SelectTrigger>
                      
                      <SelectValue placeholder={isLoading ? "Cargando..." : "Selecciona la urgencia"} />
                    
                    </SelectTrigger>
                  
                  <SelectContent>
                  
                  {isLoading && (
                  
                    <SelectItem value="" disabled>
                  
                      Cargando opciones...
                  
                    </SelectItem>
                  
                  )}
                  
                  {isError && (
                  
                    <SelectItem value="" disabled>
                  
                      Error al cargar opciones
                  
                    </SelectItem>
                  )}
                  {urgency &&
                    urgency.map((urgencyOption: Urgency) => (
                      <SelectItem
                        key={urgencyOption.id}
                        value={urgencyOption.type_status}
                      >
                        {urgencyOption.type_status}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            </div>

            <div className="grid gap-2">
            
              <Label htmlFor="due_date">Fecha de Vencimiento *</Label>
            
              <Input
                id="due_date"
                name="due_date"
                type="date"
                required
              />
            
            </div>
          
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="grid gap-2">
                
                <Label htmlFor="status">Status *</Label>
                  
                  <Select name="status" required>
                    
                    <SelectTrigger>
                      
                      <SelectValue placeholder={isLoadingStatus ? "Cargando..." : "Selecciona la Estado"} />
                    
                    </SelectTrigger>
                  
                  <SelectContent>
                  
                  {isLoadingStatus && (
                  
                    <SelectItem value="" disabled>
                  
                      Cargando opciones...
                  
                    </SelectItem>
                  
                  )}
                  
                  {isErrorStatus && (
                  
                    <SelectItem value="" disabled>
                  
                      Error al cargar opciones
                  
                    </SelectItem>
                  )}
                  {status &&
                    status.map((statusOption: Status) => (
                      <SelectItem
                        key={statusOption.id}
                        value={statusOption.status_description}
                      >
                        {statusOption.status_description}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            </div>
          </div>
        
        </div>

          <Button className="w-full" aria-disabled={isPending}>
            <Plus className="w-4 h-4 mr-2" />
            Crear Tarea
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
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, X } from "lucide-react"
import { useState, useEffect, useActionState } from "react"
import { useUrgency } from "@/app/hook/task/useUrgency"
import { Status, Urgency } from "@/app/types/task"
import Link from "next/link"
import { useStatus } from "@/app/hook/task/useStatus"
import { UpdateTask } from "@/app/lib/updateTask/action"
import { useOneTasks } from "@/app/hook/task/useOneTask"
import { Task } from "@/app/types/task"


interface id_task {
  id :string
}

export default function EditTaskForm( { id }: id_task ) {
    
    const { data, isError, isLoading, mutate } = useUrgency()
    const { dataStatus, isErrorStatus, isLoadingStatus, mutateStatus } = useStatus();
    const [ urgency, setUgency ] = useState([]);
    const [ status, setStatus ] = useState([]);
    const { dataOneTask, isLoadOneTask, isErrorOneTask, mutateOneTask } = useOneTasks(id);
    const [formData, setFormData] = useState<Task>();

    const [errorMessage, formAction, isPending] = useActionState(
            UpdateTask,
            undefined,
          );
    
    useEffect( () => {
      
        if (data) setUgency(data);
      
        if (dataStatus) setStatus(dataStatus);
  
        if (dataOneTask) setFormData(dataOneTask);

      }, [data, dataStatus, dataOneTask]);
    
      useEffect(() => {
        // Si la acción ha terminado (isPending es false) y NO hubo errores,
      // entonces refrescamos los datos.
      if (!isPending && !errorMessage) {
        
        // Llama a las funciones mutate para actualizar la UI
        mutate(); 
        mutateStatus();
        mutateOneTask();
  
        // Opcional: podrías resetear el formulario aquí también.
      }
    }, [isPending, errorMessage, mutate, mutateStatus, mutateOneTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
        ...prevFormData!,
        [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevFormData => ({
        ...prevFormData!,
        [name]: value,
    }));
};

  
    if (isError || isErrorStatus || isErrorOneTask) {
      
      return <p>There was an error fetching task.</p>
    }
  
    if( isLoading || isLoadingStatus || isLoadOneTask ){
     
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
          <Edit className="w-5 h-5" />
          Editar Tarea
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">

          <input 
              type="hidden" 
              name="id" 
              value={ id ?? ""} 
            />

          
          <div className="grid gap-2">
          
            <Label htmlFor="name_task">Nombre de la Tarea *</Label>
          
            <Input
              id="name_task"
              defaultValue={formData?.name_task ?? ""}
              placeholder="Ingresa el nombre de la tarea"
              name="name_task"
              required
            />
          
          </div>


          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData?.description}
              name="description"
              onChange={handleChange}
              placeholder="Descripción opcional de la tarea"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="urgency">Urgencia *</Label>
              <Select 
                value={formData?.urgency}
                name="urgency"
                onValueChange={(value) => handleSelectChange('urgency', value)}
                required>
                
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

            <div className="grid gap-2">
              <Label htmlFor="due_date">Fecha de Vencimiento *</Label>
              <Input
                id="due_date"
                type="date"
                defaultValue={formData?.due_date ? new Date(formData.due_date).toISOString().split("T")[0] : ""}
                name="due_date"
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={formData?.status || "pending"}
            name="status"
            onValueChange={(value) => handleSelectChange('status', value)}>
              <SelectTrigger>
                <SelectValue 
                placeholder="Selecciona el estado" />
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

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
            <Button type="button" variant="outline" className="flex-1 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              <Link href={`/`}> Cancelar </Link> 
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

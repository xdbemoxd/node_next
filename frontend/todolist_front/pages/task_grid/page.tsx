"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, ArrowLeft, Calendar, Clock } from "lucide-react"
import { Task } from "@/app/types/task"
import { useTasks } from "@/app/hook/task/useTask"


const getStatusColor = (status: Task["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getPriorityColor = (priority: Task["urgency"]) => {
  switch (priority) {
    case "Critical":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "High":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "Medium":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "Low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getStatusText = (status: Task["status"]) => {
  switch (status) {
    case "completed":
      return "Completada"
    case "in-progress":
      return "En Progreso"
    case "pending":
      return "Pendiente"
    default:
      return "Desconocido"
  }
}

const getPriorityText = (priority: Task["urgency"]) => {
  switch (priority) {
    case "Critical":
        return "Critica"
    case "High":
      return "Alta"
    case "Medium":
      return "Media"
    case "Low":
      return "Baja"
    default:
      return "Normal"
  }
}

interface id_task {
  id :string
}

export default function TasksPageGrid( { id }: id_task)  {

  const { data, isError, isLoading, mutate } = useTasks(id);
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ filterV, setFilter ] = useState<"all" | "pending" | "in-progress" | "completed">("all");

  useEffect( () => {
  
    if (data) setTasks(data);
  
  }, [data]);

  const toggleTaskStatus = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id_task === taskId ? { ...task, status: task.status === "completed" ? "pending" : "completed" } : task,
      ),
    )
  }

  if (isError) {
    mutate();
    return <p>There was an error fetching tasks.</p>
  }

  if( isLoading ){
    mutate();
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

  const filteredTasks = tasks.filter((task) => (filterV === "all" ? true : task.status === filterV))

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Tareas</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Gestiona y organiza tus tareas diarias</p>
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            <Link href={"/pages/addTask"}>
              Nueva Tarea
            </Link>
            
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{taskStats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completadas</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{taskStats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Checkbox checked className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">En Progreso</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{taskStats.inProgress}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{taskStats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <Button variant={filterV === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            Todas
          </Button>
          <Button variant={filterV === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")}>
            Pendientes
          </Button>
          <Button variant={filterV === "in-progress" ? "default" : "outline"} onClick={() => setFilter("in-progress")}>
            En Progreso
          </Button>
          <Button variant={filterV === "completed" ? "default" : "outline"} onClick={() => setFilter("completed")}>
            Completadas
          </Button>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <Card key={task.id_task} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={task.status === "completed"} onCheckedChange={() => toggleTaskStatus(task.id_task)} />
                    <CardTitle className={`text-lg ${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                      {task.name_task}
                    </CardTitle>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge className={getStatusColor(task.status)}>{getStatusText(task.status)}</Badge>
                  <Badge className={getPriorityColor(task.urgency)}>{getPriorityText(task.urgency)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {task.description}
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Vence: {new Date(task.due_date).toLocaleDateString("es-ES")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No hay tareas {filterV !== "all" ? getStatusText(filterV as Task["status"]).toLowerCase() : ""}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filterV === "all"
                ? "Crea tu primera tarea para comenzar"
                : `No tienes tareas ${getStatusText(filterV as Task["status"]).toLowerCase()}`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
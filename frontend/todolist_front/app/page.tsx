import { auth } from "@/auth";

import AuthForms from "./pages/optionClient/page";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle } 
from "@/components/ui/card"

export default async function Home() {

  const session = await auth()

  if (session?.user === undefined) {
    return(
      <div>

        <AuthForms/>
        
      </div>
    )
  }

  
  return (
    
    <div className="min-h-screen bg-background p-8">
    
      <div className="max-w-4xl mx-auto space-y-8">
    
        <div className="text-center space-y-4">
    
          <h1 className="text-4xl font-bold text-foreground">Bienvenido {session.user.name}</h1>
          <p className="text-muted-foreground text-lg">¿Qué te gustaría hacer hoy?</p>
    
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
          <Card className="hover:shadow-lg transition-shadow">
    
            <CardHeader>
    
              <CardTitle className="flex items-center gap-2">📊 Dashboard</CardTitle>
    
              <CardDescription>to check all the tasks you have</CardDescription>
            
            </CardHeader>
            
            <CardContent>
            
              <Button asChild className="w-full">
                <Link href={`/pages/task/${session.user.id}`}>Ir al Dashboard</Link>
              </Button>
            
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">👤 Perfil</CardTitle>
              <CardDescription>Gestiona tu información personal</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/profile">Ver Perfil</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">⚙️ Configuración</CardTitle>
              <CardDescription>Ajusta tus preferencias</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/settings">Configuración</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📈 Reportes</CardTitle>
              <CardDescription>Consulta reportes detallados</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/reports">Ver Reportes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">💬 Mensajes</CardTitle>
              <CardDescription>Revisa tus mensajes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/messages">Mensajes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🚪 Salir</CardTitle>
              <CardDescription>Cerrar sesión de forma segura</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="destructive" className="w-full">
                <Link href="/api/auth/signout">Cerrar Sesión</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )


}
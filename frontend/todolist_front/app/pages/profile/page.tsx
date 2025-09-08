import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Hash } from "lucide-react"
import { auth } from "@/auth";


export default async function Profile() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Datos del Usuario</h1>
          <Button asChild variant="outline">
            <Link href="/">← Volver al Inicio</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              account information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Hash className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm text-muted-foreground">ID</p>
                <p className="text-lg font-mono">{session?.user?.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm text-muted-foreground">Name</p>
                <p className="text-lg">{session?.user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm text-muted-foreground">Email</p>
                <p className="text-lg">{session?.user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
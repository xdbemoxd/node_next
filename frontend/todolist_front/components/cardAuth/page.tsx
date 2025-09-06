import LoginForm from "@/app/login/page"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardLogin() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Please log in to continue.</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm/>
      </CardContent>
    </Card>
  )
}

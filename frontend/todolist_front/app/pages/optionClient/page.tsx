"use client"

import { useState } from "react"
import CreateForm from "@/app/pages/creatUser/page"
import { CardLogin } from "@/components/cardAuth/page"

export default function AuthForms() {
  const [showForm, setShowForm] = useState<"login" | "create">("login")

  return (
    <div className="flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        <div className="mb-6 flex gap-4 justify-center">
          <button
            onClick={() => setShowForm("login")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              showForm === "login" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setShowForm("create")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              showForm === "create" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Create User
          </button>
        </div>

        {showForm === "login" ? <CardLogin /> : <CreateForm />}
      </div>
    </div>
  )
}

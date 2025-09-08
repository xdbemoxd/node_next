"use client";

import { useState } from "react";
import CreateForm from "@/app/pages/creatUser/page";
import { CardLogin } from "@/components/cardAuth/page";

export default function AuthForms() {
  const [showForm, setShowForm] = useState<"login" | "create">("login");

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setShowForm("login")}
          className={`px-4 py-2 rounded ${
            showForm === "login" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setShowForm("create")}
          className={`px-4 py-2 rounded ${
            showForm === "create" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Create User
        </button>
      </div>

      {showForm === "login" ? <CardLogin /> : <CreateForm />}
    </div>
  );
}

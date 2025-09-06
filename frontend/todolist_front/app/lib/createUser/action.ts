'use server';
import { insertUser } from "@/app/api/user/create/api";
import { redirect } from "next/navigation";

export async function CreateUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    
    const response =  await insertUser(formData);

    console.log(response)

  } catch (error) {
    if (error) {
          switch (error) {
            case 'incorrect credentials':
              return 'Invalid credentials.';
            default:
              return JSON.stringify(error);
          }
        }
        throw error;
  }
  redirect("/");
}
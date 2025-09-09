'use server';
import { insertTask } from "@/app/api/task/api";
import { redirect } from "next/navigation";
import { auth } from "@/auth";


export async function CreateTask(
  prevState: string | undefined,
  formData: FormData,
) {
  const session = await auth()

  try {
    
    console.log(formData , session?.user?.id);


    const response =  await insertTask(formData, session?.user?.id);

    console.log(response);

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
  redirect(`/pages/task/${session?.user?.id}`);
}
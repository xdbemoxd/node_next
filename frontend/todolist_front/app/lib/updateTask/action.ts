'use server';
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { UpdateTaskApi } from "@/app/api/task/api";


export async function UpdateTask(
  prevState: string | undefined,
  formData: FormData,
) {
  const session = await auth()

  try {

    if (session?.user?.id === undefined) return 'Invalid credentials.';

    const response =  await UpdateTaskApi(formData, session?.user?.id);

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
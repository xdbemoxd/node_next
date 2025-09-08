import { GetAllTask } from "@/app/api/task/api";
import useSWR from "swr";


export function useTasks( id_user : string ) {
  const { data, error, isLoading, mutate } = useSWR(
    id_user ? id_user : null,
    GetAllTask
  );

  console.log(data);

  return {
    data: data,
    isLoading,
    isError: error,
    mutate, // lo usas para revalidar tras crear/editar/borrar
  };
}

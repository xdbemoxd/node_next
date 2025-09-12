import { GetOneTask } from "@/app/api/task/api";
import useSWR from "swr";


export function useOneTasks( id_task : string ) {
  const { data, error, isLoading, mutate } = useSWR(
    id_task ? id_task : null,
    GetOneTask
  );

  return {
    dataOneTask : data,
    isLoadOneTask : isLoading,
    isErrorOneTask: error,
    mutateOneTask : mutate, // lo usas para revalidar tras crear/editar/borrar
  };
}

import { GetAllstatus } from "@/app/api/task/api";
import useSWR from "swr";


export function useStatus() {
  const { data, error, isLoading, mutate } = useSWR(
    "/task/status",
    GetAllstatus
  );

  return {
    dataStatus: data,
    isLoadingStatus :isLoading ,
    isErrorStatus: error,
    mutateStatus:mutate, // lo usas para revalidar tras crear/editar/borrar
  };
}

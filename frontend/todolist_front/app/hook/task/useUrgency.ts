import { GetAllUrgencys } from "@/app/api/task/api";
import useSWR from "swr";


export function useUrgency() {
  const { data, error, isLoading, mutate } = useSWR(
    "/task/urgency",
    GetAllUrgencys
  );

  return {
    data: data,
    isLoading,
    isError: error,
    mutate, // lo usas para revalidar tras crear/editar/borrar
  };
}

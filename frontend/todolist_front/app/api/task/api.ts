"use server"

import { Task_2 } from "@/app/types/task";
import axios from "axios"

export async function GetAllTask(id_user : string) {
    

    try {
       
        const response = await axios.get(`${process.env.BACKEND_URL}/${id_user}/task`);
        
        if (!response) return null
        
        const { data } = await response
      
        return data

    } catch (error) {
        console.error("Error en authorizeUsers:", error);
    }


}

export async function GetAllUrgencys() {
    
    try {
   
        const response = await axios.get(`${process.env.BACKEND_URL}/task/urgency`);
        
        if (!response) return null
        
        const { data } = await response
      
        return data

    } catch (error) {
        console.error(error);
    }


}

export async function GetAllstatus() {
    
    try {
       
        const response = await axios.get(`${process.env.BACKEND_URL}/task/status`);

        if (!response) return null
        
        const { data } = await response

        return data

    } catch (error) {
        console.error(error);
    }


}

export async function insertTask( formData : FormData, id : string | undefined ) {
    
    try {

        if ( id === undefined ) return null

        const dataTask: Task_2 = {
            
            urgency: formData.get("urgency") as string,
            
            description: formData.get("description") as string,
            
            due_date: new Date(formData.get("due_date") as string),
            
            status: formData.get("status") as string,

            name_task: formData.get("name_task") as string
        
        };

        const response = await axios.post(`${process.env.BACKEND_URL}/${id}/task`, dataTask);

        if (!response) return null

        const { data } = await response;

        return JSON.stringify(data);

  } catch (error) {
    return error;
  }

}
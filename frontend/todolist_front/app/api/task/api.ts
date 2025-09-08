"use server"

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
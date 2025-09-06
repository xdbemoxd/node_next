"use server"

import { User } from "@/app/types/user";
import axios from "axios"


export async function insertUser( formData : FormData ) {
    
    try {

        const dataUser: User = {

            id: formData.get("idCard") as string,
            
            password: formData.get("password") as string,
            
            email: formData.get("email") as string,
            
            date_birth: formData.get("dateOfBirth")
                ? new Date(formData.get("dateOfBirth") as string)
                : null,
            
            name_user: formData.get("name") as string,
            
            last_name: formData.get("lastName") as string,
        
        };

        const response = await axios.post(`${process.env.BACKEND_URL}`, dataUser);

        if (!response) return null

        const { data } = await response;

        return JSON.stringify(data);

  } catch (error) {
    return error;
  }

}
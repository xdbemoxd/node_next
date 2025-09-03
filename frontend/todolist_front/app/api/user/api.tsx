"use server"

import axios from "axios"
import { userLogin } from "../../types/user";

export async function authorizeUsers( form: userLogin ) {

  try {
   
    const response = await axios.post(`${process.env.BACKEND_URL}/token/${form.userName}/${form.password}`);

    if (!response) return null

    const { data } = await response

    const userResponse = await axios.get(`${process.env.BACKEND_URL}/auth/me/`, {
            headers: {
               'Authorization': `Bearer ${data}`,
            }
          })

          

    const { id, email, date_birth,  name_user, last_name, rol_id, iat, exp  } = await userResponse.data;

    if ( id === undefined ) return null

    return {
      "id": id,
      "email": email,
      "date_birht":date_birth,
      "first_name": name_user,
      "last_name": last_name,
      "rol":rol_id,
      "token_acces":data,
      "iat":iat,
      "exp":exp
    }

  } catch (error) {
    console.error("Error en authorizeUsers:", error);
  }

}




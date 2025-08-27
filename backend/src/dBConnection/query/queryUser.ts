import pool from "../dBconection";

interface User {
  id: string,
  password: string;
}

export async function typeUrgency() {
    const result = await pool.query('SELECT * FROM urgency');
    return result.rows;
}

export async function loginUser({ id, password } :User){
    
    const result = await pool.query( `SELECT * FROM USER_APLICATION as UA WHERE UA.id_card = '${id}' and UA.password_user = '${password}';` );

    return result.rows;

}
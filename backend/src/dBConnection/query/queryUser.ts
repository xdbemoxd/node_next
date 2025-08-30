import pool from "../dBconection";
import { User, User_2 } from '../../types/user.ts/index';

export async function typeUrgency() {
    const result = await pool.query('SELECT * FROM urgency');
    return result.rows;
}

export async function loginUser({ id, password } :User){
    
    const result = await pool.query( `SELECT * FROM USER_APLICATION as UA WHERE UA.id_card = '${id}' and UA.password_user = '${password}';` );

    return result.rows;

}

export async function insertUser( { id, password, email, date_birth, name_user, last_name }:User_2 ) {
  

  console.log(id,password,email,date_birth,name_user,last_name);

  if ( date_birth === null  ) {
    const result = await pool.query(`INSERT INTO USER_APLICATION ( id_card, password_user, email, date_birth, name_user, last_name, rol_id) VALUES ('${id}', '${password}', '${email}', null, '${name_user}', '${last_name}', 3);`);
    return result;
  }

  const result = await pool.query(`INSERT INTO USER_APLICATION ( id_card, password_user, email, date_birth, name_user, last_name, rol_id) VALUES ('${id}', '${password}', '${email}', '${date_birth}', '${name_user}', '${last_name}', 3);`);

  return result;

}

export async function deleteUser( id : string ) {

  const result = await pool.query( `DELETE FROM USER_APLICATION as UA where UA.id_card = '${id}' RETURNING *;` );

  return result;
  
}

export async function updateUser( user : User_2, id : string ) {

  if ( user === undefined || id === undefined ) {

    return;
  
  }

  if ( user.date_birth === null && user.email === null ) {
    
    const result = await pool.query(`UPDATE USER_APLICATION SET password_user = '${user.password}', email = null, date_birth = null, name_user = '${user.name_user}' , last_name = '${user.last_name}' WHERE id_card = '${id}';`);
    return result;

  }


  if ( user.email === null ) {
    
    const result = await pool.query(`UPDATE USER_APLICATION SET password_user = '${user.password}', email = null, date_birth = '${user.date_birth}', name_user = '${user.name_user}' , last_name = '${user.last_name}' WHERE id_card = '${id}';`);
    return result;

  }


  if ( user.date_birth === null ) {
    
    const result = await pool.query(`UPDATE USER_APLICATION SET password_user = '${user.password}', email = '${user.email}', date_birth = null, name_user = '${user.name_user}' , last_name = '${user.last_name}' WHERE id_card = '${id}';`);
    return result;

  }

  const result = await pool.query(`UPDATE USER_APLICATION SET password_user = '${user.password}', email = '${user.email}', date_birth = '${user.date_birth}', name_user = '${user.name_user}' , last_name = '${user.last_name}' WHERE id_card = '${id}';`);
  return result;

}
import { Task, Task_2 } from "../../types/task";
import pool from "../dBconection";

export async function typeUrgency() {
    const result = await pool.query( 'SELECT * FROM urgency' );
    return result.rows;
}

export async function allTaskUser( id : string ) {
 
    if ( id === undefined ) {
        return;
    }

    const result = await pool.query( `SELECT type_status, name_task, description, due_date, created_at FROM TO_DO_LIST AS TDL LEFT JOIN URGENCY AS UR ON UR.id = TDL.id_urgency WHERE TDL.id_user = '${id}';` );
    return result;
}

export async function insertTask( id : string, task : Task_2) {
    
    const result = await pool.query( `INSERT INTO TO_DO_LIST (id_user, id_urgency, name_task, description, due_date) VALUES ( '${id}', '${task.urgency}', '${task.name_task}', '${task.description}', '${task.due_date}' );` );

    return result;
}

export async function updateTask( id : string, taskUpdate :Task ) {

    const result = await pool.query( `UPDATE TO_DO_LIST SET id_urgency = '${taskUpdate.urgency}', name_task = '${taskUpdate.name_task}', description = '${taskUpdate.description}', due_date = '${taskUpdate.due_date}' WHERE id_user = '${id}' and id = '${taskUpdate.id}';` );

    return result;

}

export async function deleteTask( id_task : string ) {
    

  const result = await pool.query( `DELETE FROM TO_DO_LIST as UA where UA.id = '${id_task}' RETURNING *;` );

  return result;
  

}
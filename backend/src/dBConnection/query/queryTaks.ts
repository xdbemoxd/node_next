import { Task } from "../../types/task";
import pool from "../dBconection";

export async function typeUrgency() {
    const result = await pool.query( 'SELECT * FROM urgency' );
    return result.rows;
}

export async function allTaskUser( id : string ) {
 
    if ( id === undefined ) {
        return;
    }

    const result = await pool.query( `SELECT UR.type_status as urgency, name_task, description, due_date, ST.status_description as status, TDL.id AS id_task FROM TO_DO_LIST AS TDL LEFT JOIN URGENCY AS UR ON UR.id = TDL.id_urgency LEFT JOIN STATUS_TASK AS ST ON ST.id = TDL.id_status WHERE TDL.id_user = '${id}';` );
    return result;
}

export async function insertTask( id : string, task : Task) {
    
    const result = await pool.query( `INSERT INTO TO_DO_LIST (id_user, id_urgency, name_task, description, due_date, id_status) VALUES ( '${id}', '${task.urgency}', '${task.name_task}', '${task.description}', '${task.due_date}', '${task.status}' );` );

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
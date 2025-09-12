import { Task, Task_2 } from "../../types/task";
import pool from "../dBconection";

export async function typeUrgency() {
    const result = await pool.query( 'SELECT * FROM URGENCY' );
    return result;
}

export async function typeStatus() {
    const result = await pool.query( 'SELECT * FROM STATUS_TASK' );
    return result;
}

export async function allTaskUser( id : string ) {
 
    if ( id === undefined ) {
        return;
    }

    const result = await pool.query( `SELECT UR.type_status as urgency, name_task, description, due_date, ST.status_description as status, TDL.id AS id FROM TO_DO_LIST AS TDL LEFT JOIN URGENCY AS UR ON UR.id = TDL.id_urgency LEFT JOIN STATUS_TASK AS ST ON ST.id = TDL.id_status WHERE TDL.id_user = '${id}';` );
    return result;
}

export async function getIdStatus(type_status : string) {
    
    const result = await pool.query( `SELECT id FROM STATUS_TASK as ST where ST.status_description = '${type_status}';` );

    return result

}

export async function getIdUrgency(type_urgency : string) {
    
    const result = await pool.query(`SELECT id FROM urgency as UR where UR.type_status = '${type_urgency}';`)

    return result
}

export async function insertTask( id : string, task : Task_2) {

    const idStatus = await getIdStatus(task.status);

    const idUrgency = await getIdUrgency(task.urgency);

    const result = await pool.query( `INSERT INTO TO_DO_LIST (id_user, id_urgency, name_task, description, due_date, id_status) VALUES ( '${id}', '${idUrgency.rows[0].id}', '${task.name_task}', '${task.description}', '${task.due_date}', '${idStatus.rows[0].id}' );` );

    return result;
}

export async function updateTask( id : string, taskUpdate :Task ) {

    const idStatus = await getIdStatus(taskUpdate.status);

    const idUrgency = await getIdUrgency(taskUpdate.urgency);

    const result = await pool.query( `UPDATE TO_DO_LIST SET id_urgency = '${idUrgency.rows[0].id}', name_task = '${taskUpdate.name_task}', description = '${taskUpdate.description}', due_date = '${taskUpdate.due_date}', id_status = '${idStatus.rows[0].id}' WHERE id_user = '${id}' and id = '${taskUpdate.id}';` );

    return result;

}

export async function deleteTask( id_task : string ) {
    

  const result = await pool.query( `DELETE FROM TO_DO_LIST as UA where UA.id = '${id_task}' RETURNING *;` );

  return result;
  

}

export async function getOneTask( id_task : string ) {
    
    const result = await pool.query( `SELECT UR.type_status as urgency, name_task, description, due_date, ST.status_description as status, TDL.id AS id_task FROM TO_DO_LIST AS TDL LEFT JOIN URGENCY AS UR ON UR.id = TDL.id_urgency LEFT JOIN STATUS_TASK AS ST ON ST.id = TDL.id_status WHERE TDL.id = '${id_task}';` );

    return result;

}
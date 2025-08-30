import express from "express";
import { allTaskUser, deleteTask, insertTask, updateTask } from "../dBConnection/query/queryTaks";
import { Task } from "../types/task";

const routeTask = express.Router();

routeTask.use(express.json());

routeTask.get( '/:id/task', async (req,res) => {
    
    const id = req.params.id;
    const result = await allTaskUser( id );

    if (result?.rowCount === 0) {
       return res.status( 400 ).json( {message:"incorrect credentials"} );
    }

    res.json( result?.rows );

});

routeTask.post( '/:id/task', async (req,res) => {
    
    const id = req.params.id;
    const body : Task = req.body;

    if (id === undefined || body === undefined) {
        return res.status( 400 ).json( { message : "incorrect credentials" } );
    }

    const result = await insertTask(id, body);

    if ( result?.rowCount === 0 ) {
        return res.status( 400 ).json( { message : "incorrect credentials" } );
    }

    res.json( { message : "task inserted correctly" } );

});


routeTask.put( '/:id/task', async (req,res) => {

    const id = req.params.id;
    const body : Task = req.body;

    if (id === undefined || body === undefined ) {
        return res.status( 400 ).json( { message : "incorrect credentials" } );
    }

    const result = await updateTask( id, body );

    if (result.rowCount === 0 || result === undefined) {
        return res.status(400).json( { message : "incorrect credentials" } );
    }

    return res.json( { message : "task update correctly" } );

});

routeTask.delete( '/:id_task/task', async (req,res) => {
    
    const id_task = req.params.id_task;
    
    if ( id_task === undefined) {
        return res.status( 400 ).json( { message : "incorrect credentials" } );
    }

    const result = await deleteTask(id_task);

    if ( result.rowCount === 0 ) {
        return res.status( 400 ).json( { message : "Task not found" } );
    }

    return res.json( { message: "Successfully deleted task",
        data:result.rows[0]
    } );

});

export default routeTask;
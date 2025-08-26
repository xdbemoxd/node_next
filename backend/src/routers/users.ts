import express from "express";
import { typeUrgency } from "../dBConnection/query/queryUser";

const routUser = express.Router();

routUser.use(express.json());

routUser.get( '/', async ( _req, res ) => {
    const result = await typeUrgency()
    res.send( result );
});

routUser.get( '/:user/:password', ( req, res ) => {
    const user = req.params.user;
    const password = req.params.password;

    console.log( user );
    console.log( password );

    if ( user === undefined && password === undefined) {
        res.status(404);
        return;
    }

    res.send(`Usuario ${user}, contraseña ${password}`)

});


export default routUser;
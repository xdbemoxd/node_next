import express from "express";
import { loginUser } from "../dBConnection/query/queryUser";
import { generateToken, validateToken } from "../lib/token";

interface User {
  id: string,
  email:string,
  date_birth:string,
  name_user:string,
  last_name:string,
  rol_id:number;
}

const routUser = express.Router();

routUser.use(express.json());

routUser.get( '/', async ( _req, res ) => {
    res.send( "connection established" );
});

routUser.get( '/:id/:password', async ( req, res ) => {
    const id = req.params.id;
    const password = req.params.password;

    console.log( id );
    console.log( password );

    if ( id === undefined && password === undefined) {
        res.status(404);
        return;
    }

    const result = await loginUser({id , password});

    if (result.length === 0 ) {
        res.status(404).send('incorrect credentials')
    }

    const payload :User =  {
        id: result[0].id_card,
        email: result[0].email,
        date_birth: result[0].date_birth,
        name_user: result[0].name_user,
        last_name: result[0].last_name,
        rol_id: result[0].rol_id
    }

    const token = generateToken(payload);


    res.json(token);

});

routUser.get( '/data', (req,res, nex) => {
    validateToken(req,res,nex);
})


export default routUser;
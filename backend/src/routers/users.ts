import express from "express";
import { deleteUser, insertUser, loginUser, updateUser } from "../dBConnection/query/queryUser";
import { generateToken, validateToken } from "../lib/token";
import { User_2 } from "../types/user";

const routUser = express.Router();

routUser.use(express.json());

routUser.post( '/token/:id/:password', async ( req, res ) => {
    const id = req.params.id;
    const password = req.params.password;

    if ( id === undefined && password === undefined) {
        res.status(404);
        return;
    }

    const result = await loginUser({id , password});

    if (result.length === 0 ) {
        res.status(404).send('incorrect credentials')
    }

    const payload =  {
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

routUser.get( '/auth/me', (req,res, nex) => {
    validateToken(req,res,nex);
});

routUser.post( '/', async (req,res) => {

    const data : User_2 = req.body;

    try {

        if ( data === undefined ) {
            res.status( 400 ).json( {message:"incorrect credentials"} );
        }
        
        if ( data.id === undefined || data.password === undefined || data.name_user === undefined || data.last_name === undefined ) {
            res.status( 400 ).json( {message:"incorrect credentials"} );
        }

        const result = await insertUser( data );

        if (result.rowCount === 0) {
            res.status( 400 ).json( {message:"incorrect credentials"} );
        }

        res.json( { message : "the user was created successfully" } )


    } catch (error) {
        return res.status( 400 ).json( error );
    }

})

routUser.delete( '/delete/:id', async (req, res) => {

    const id = req.params.id;

    if (id === undefined) {
        return res.status(400).json( { message: "User undefined" });
    }

    console.log(id);

    const result = await deleteUser(id);

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.json( { message: "Successfully deleted user",
        data:result.rows[0]
    } );
 
});

routUser.put( '/:id', async ( req, res ) => {
    const id = req.params.id;
    const data = req.body;
    
    const result = await updateUser(data,id);

    if (result?.rowCount === 0 || result === undefined ) {
        return res.status(400).json( { message : "incorrect credentials" } );
    }

    return res.json( { message : "Successfully update user" } );

});


export default routUser;
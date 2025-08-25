import express from "express";

const routUser = express.Router();

routUser.use(express.json());

routUser.get( '/', ( _req, res ) => {
    res.send('conexion user lista');
});

routUser.get( '/:user/:password', ( req, res ) => {
    const user = req.params.user;
    const password = req.params.password;

    console.log(user);
    console.log(password);

    if ( user===undefined && password===undefined) {
        res.status(404);
        return;
    }

    res.send(`Usuario ${user}, contraseña ${password}`)

});


export default routUser;
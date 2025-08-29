import express  from 'express';
import routUser  from "./routers/users";

const app = express();
app.use(express.json());

app.use( '/api/v1/user', routUser );

app.get( '/', (_req,res) => {
    res.send("conexion valida por ahora");
} );

export default app;
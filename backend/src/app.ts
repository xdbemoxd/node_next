import express  from 'express';
import routUser  from "./routers/users";
import routeTask from './routers/to_do';

const app = express();
app.use(express.json());

app.use( '/api/v1/user', routUser );
app.use( '/api/v1/user', routeTask );

app.get( '', (_req,res) => {
    res.send("conexion valida por ahora");
} );

export default app;
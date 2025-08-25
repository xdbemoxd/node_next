import dotenv from 'dotenv';
import express  from 'express';

dotenv.config()

const app = express();
app.use(express.json());

app.get( '/', (_req,res) => {
    res.send("conexion valida por ahora");
} );

app.listen( process.env.PORT, () => {
    console.log(`El servidor esta en el puerto ${process.env.PORT}`);
} );
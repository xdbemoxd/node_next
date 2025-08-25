import app from "./app";
import dotenv from 'dotenv';

dotenv.config()

app.listen( process.env.PORT, () => {
    console.log(`El servidor esta en el puerto ${process.env.PORT}`);
} );

import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import { VerifyDecodeToken } from "../middleware/authMiddleware";

dotenv.config();

interface User {
  id: string,
  email:string,
  date_birth:string,
  name_user:string,
  last_name:string,
  rol_id:number;
}

export function generateToken(user:User) {

    const secretKey = process.env.SECRET_KEY

    if (!secretKey) {
        throw new Error("La variable de entorno SECRET_KEY no está definida.");
    }

    console.log(secretKey);

    return jwt.sign(user, secretKey , {expiresIn:'8h'});
    
}

export async function validateToken(req:Request,res:Response,next:NextFunction) {

    const accestoken = req.headers['authorization'];
    const secretKey = process.env.SECRET_KEY

    if (!accestoken) {
        res.status(401).json({message:"Access denied"});
        return;
    }

    if (!secretKey) {
        throw new Error("SECRET_KEY environment variable is not defined.");
    }

    const [ _baerer, token ] = accestoken.split(' ');

    if (!token) {
        return res.status(401).json({message:"Access denied"});
    }

    try {

        const user = await VerifyDecodeToken(token);

        console.log(user);

        res.json(user);

        next();
    } catch (e) {
        return res.status(401).json( { message: "Invalid token" } );
    }
    
}


import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

// Debes definir tu clave secreta en el entorno o como una constante
const secretKey = process.env.SECRET_KEY; // ¡Reemplaza esto con tu propia clave secreta!

export async function VerifyDecodeToken(token: string): Promise<any> {
  try {
    // Verifica la firma del token y decodifica el payload
    const decodedPayload = await new Promise<any>((resolve, reject) => {

        if (!secretKey) {
        throw new Error("SECRET_KEY environment variable is not defined.");
    }

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
    return decodedPayload;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    throw new Error('Token inválido o expirado');
  }
}

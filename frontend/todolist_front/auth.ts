import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { authorizeUsers } from "./app/api/user/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [ 
    
    Credentials({
      async authorize(credentials) {

        if (credentials === undefined) {
          return null;
        }

        const { userName, password } = credentials;

        if (typeof userName !== 'string' || typeof password !== 'string') {
          return null;
        }

       const user = await authorizeUsers({ userName, password });

        if (!user) return null

        console.log(user);

        return {
          "id": user.id,
          "email": user.email,
          "date_birht":user.date_birht,
          "name": user.first_name,
          "last_name": user.last_name,
          "rol":user.rol,
          "token_acces": user.token_acces
        }

      },
    })
  
  ],
});
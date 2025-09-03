export interface userLogin {
    userName: string,
    password:string
}

export interface User {
  id: string,
  password: string,
  email?: string | null, 
  date_birth?:Date | null, 
  name_user:string, 
  last_name:string;
}
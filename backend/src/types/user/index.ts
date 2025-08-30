export interface User_2 {
  id: string,
  password: string,
  email?: string | null, 
  date_birth?:Date | null, 
  name_user:string, 
  last_name:string;
}

export interface User {
  id: string,
  password: string,
}
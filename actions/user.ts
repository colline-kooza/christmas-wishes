'use server'
import { ObjectId } from "mongodb";
import { cookies } from 'next/headers'

export async function createUser(name: string) {

  const userId = new ObjectId(); 
  const userData = { id: userId.toString(), name };
  
  const cookieStore=await cookies()
  cookieStore.set({
    name: 'userData',
    value: JSON.stringify(userData),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7
  })
  
  return userData
}

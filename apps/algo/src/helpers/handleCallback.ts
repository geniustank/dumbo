import { Response } from "express";
import {prisma} from "../lib"
export async function handleCallback(
  res: Response<any>,
  email: string,
  id: string,
  avatar: string,
  name: string,
) {
 const user = await prisma.user.findUnique({
    where: {
        email: email
    }
 })

 if(user) {
    res.redirect("/auth/google/success")
    console.log(user)
    return
 }

 const newUser = await prisma.user.create({
    data:{
        email,
        googleId: id,
        avatar,
        name
    }
 })

 console.log(newUser)
 res.redirect("/auth/google/success")
}
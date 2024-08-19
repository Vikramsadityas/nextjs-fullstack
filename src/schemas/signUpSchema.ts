import { z } from "zod";

export const usernameValidation=z
.string()
.min(2,"Username must be at least 2 characters")
.max(20,"Username must be maximum of 20 characters")
.regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special characters ")

export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(8,{message:"Pasword must be at least 8 characters"})
}) 
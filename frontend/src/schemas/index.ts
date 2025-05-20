import { z } from "zod"

export const signUpSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "password must be atleast of 6 characters"),
    name: z.string().min(3, "Name must be atleast 3 character"),
    confirm_password: z.string().min(3, "Password must be atleast of 6 character")
}).superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirm_password']
        });
    }
})

export const signInSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "password must be atleast of 6 characters"),
})
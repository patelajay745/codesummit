import { User } from "@prisma/client";
import express from "express";

// export type userType = {
//     id: string,
//     image?: string,
//     name: string,
//     email: string,
//     role: string
// }

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}
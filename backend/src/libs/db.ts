import { PrismaClient } from "@prisma/client";
import { env } from "../validators/env";

declare global {
    var prisma: PrismaClient | undefined
}

const globalForPrisma = globalThis

export const db: PrismaClient = globalForPrisma.prisma || new PrismaClient()

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db
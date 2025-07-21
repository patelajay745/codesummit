import 'dotenv/config'
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import createClient from 'ioredis';
import { env } from './validators/env'
import app from './app';
import { db } from './libs/db';

const PORT = env.PORT ?? 8000

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: env.NODE_ENV === "production" ? env.CORS_ORIGIN : ["http://localhost:5173", "https://codesummit.ca"],
        credentials: true,
    }
})

const pubClient = env.NODE_ENV === "production" ? new createClient({
    host: env.REDIS_URL,
    port: env.REDIS_PORT,
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
}) : new createClient({ host: 'localhost', port: 6379 })

const subClient = pubClient.duplicate();



io.adapter(createAdapter(pubClient, subClient))

export const broadcastLeaderboard = async () => {
    const data = await db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            _count: {
                select: {
                    ProblemSolved: true,
                },
            },
        },
        orderBy: {
            ProblemSolved: {
                _count: 'desc',
            },
        },
        take: 10,
    });

    io.of('/leaderboard').emit('leaderboard:update', data)
}

io.of('/leaderboard').on('connection', socket => {
    console.log('socket connected', socket.id);
    broadcastLeaderboard().catch(console.error)

    socket.on('disconnect', () => console.log('socket disconnected', socket.id))

})

httpServer.listen(PORT, () => {
    console.log(`🚀  REST + Socket.IO listening on ${env.BASEURL}:${PORT}`)
})


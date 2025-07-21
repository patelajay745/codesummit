import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export type LeaderEntry = {
    id: string;
    name: string;
    email: string;
    _count: { ProblemSolved: number };

};

export const useLeaderboard = () => {
    const [leaders, setLeaders] = useState<LeaderEntry[]>([]);

    useEffect(() => {
        const socket: Socket = io(`${import.meta.env.VITE_BACKEND_URL}/leaderboard`, {
            withCredentials: true,
        });

        socket.on('leaderboard:update', (data: LeaderEntry[]) => {
            setLeaders(data);
        });

        return (() => {
            socket.disconnect()
        })
    }, []);

    return leaders;
};
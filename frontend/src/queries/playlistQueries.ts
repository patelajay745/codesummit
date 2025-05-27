import { queryClient } from '@/App'
import { api } from '@/api/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { ProblemType } from './problemQueries'

type ProblemSet = {
    id: string;
    userId: string;
    name: string;
    description: string;
    problems: ProblemType[];
    _count: {
        problems: number;
    };
};

export interface createPlaylistFormData {
    name: string,
    description: string
}

const addPlaylist = async (data: createPlaylistFormData) => {
    const res = await api.post("/playlist", data)
    return res.data
}

export const useAddPlaylist = () => useMutation({
    mutationFn: addPlaylist,
    onSuccess: (data) => {
        toast.success(data.message || "Playlist is created");
        queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
    onError: (error) => {
        const message =
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Something went wrong'
                : error instanceof Error
                    ? error.message
                    : 'Something went wrong'
        toast.error(message)
    }
})

const getAllPlaylist = async (): Promise<ProblemSet[]> => {
    const res = await api.get("/playlist/")
    return res.data.data
}

export const useGetAllPlaylist = () => useQuery({
    queryKey: ['playlists'],
    queryFn: getAllPlaylist
})

const getPlaylistDetails = async (playlistId: string) => {
    const res = await api.get(`/playlist/${playlistId}`)
    return res.data
}

export const usePlaylistDetails = (playlistId: string) => useQuery({
    queryKey: ['playlistDetails', playlistId],
    queryFn: () => getPlaylistDetails(playlistId),
    enabled: !!playlistId
})

const addproblemToPlaylist = async (playlistId: string, problemId: string) => {
    const res = await api.post(`/playlist/add-to-playlist/${playlistId}/${problemId}`)
    return res.data
}

export const useAddProblemToPlaylist = () => useMutation({
    mutationFn: ({ playlistId, problemId }: { playlistId: string, problemId: string }) =>
        addproblemToPlaylist(playlistId, problemId),
    onSuccess: (data) => {
        toast.success(data.message || "Problem is added to playlist");
        queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
    onError: (error) => {
        const message =
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Something went wrong'
                : error instanceof Error
                    ? error.message
                    : 'Something went wrong'
        toast.error(message)
    }
})

const removeProblemFromPlaylist = async (playlistId: string, problemId: string) => {
    const res = await api.delete(`/playlist/delete-from-playlist/${playlistId}/${problemId}`)
    return res.data
}

export const useRemoveProblemFromPlaylist = () => useMutation({
    mutationFn: ({ playlistId, problemId }: { playlistId: string, problemId: string }) => removeProblemFromPlaylist(playlistId, problemId),
    onSuccess: (data) => {
        toast.success(data.message || "Problem is removed from playlist");
        queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
    onError: (error) => {
        const message =
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Something went wrong'
                : error instanceof Error
                    ? error.message
                    : 'Something went wrong'
        toast.error(message)
    }
})

const deletePlaylist = async (playlistId: string) => {
    const res = await api.delete(`/playlist/${playlistId}`)
    return res.data
}

export const useDeletePlaylist = () => useMutation({
    mutationFn: deletePlaylist,
    onSuccess: (data) => {
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
    onError: (error) => {
        const message =
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Something went wrong'
                : error instanceof Error
                    ? error.message
                    : 'Something went wrong'
        toast.error(message)
    }
})


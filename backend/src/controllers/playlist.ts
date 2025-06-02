import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

export const createPlaylist = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user?.id

    const { name, description } = req.body

    const playlist = await db.playlist.create({
        data: {
            name, description, userId: userId!
        }
    })

    if (!playlist) throw new ApiError(500, "Something went wrong")

    res.status(201).json(new ApiResponse(201, "Playlist is created", {
        playlist: {
            id: playlist.id,
            name,
            description
        }
    }))

})

export const updatePlaylist = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id
    const { name, description } = req.body
    const { playlistId } = req.params

    const playlist = await db.playlist.findUnique({
        where: {
            id: playlistId
        }
    })

    if (!playlist) throw new ApiError(404, "playlistId is invalid")

    const updatedPlaylist = await db.playlist.update({
        where: {
            id: playlistId
        },
        data: {
            name: name || undefined,
            description: description || undefined
        }
    })

    if (!updatedPlaylist) throw new ApiError(500, "Something went wrong")

    res.status(201).json(new ApiResponse(201, "Playlist is created", {
        playlist: {
            id: updatedPlaylist.id,
            name: updatedPlaylist.name,
            description: updatedPlaylist.description
        }
    }))
})

export const deletePlaylist = asyncHandler(async (req: Request, res: Response) => {

    const { playlistId } = req.params
    const userId = req.user?.id

    const playlist = await db.playlist.findUnique({
        where: {
            id: playlistId
        }
    })

    if (!playlist) throw new ApiError(404, "playlistId is invalid")

    const deletedPlaylist = await db.playlist.delete({
        where: {
            id: playlistId,
            userId: userId!
        }
    })

    res.status(200).json(new ApiResponse(200, "Playlist has been deleted"))

})

export const getAllPlaylist = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user?.id

    const playlists = await db.playlist.findMany({
        where: {
            userId: userId!
        }, include: {
            problems: true,
            _count: true
        }
    })

    if (!playlists) throw new ApiError(404, "No playlist found")

    res.status(200).json(new ApiResponse(200, "All playlists are fetched", playlists))

})

export const getAPlaylist = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user?.id
    const { playlistId } = req.params

    const playlist = await db.playlist.findMany({
        where: {
            userId: userId!, id: playlistId
        }, include: {
            problems: true,
            _count: true
        }
    })

    if (!playlist) throw new ApiError(404, "No playlist found")

    res.status(200).json(new ApiResponse(200, "playlist is fetched", playlist))

})

export const AddToPlaylist = asyncHandler(async (req: Request, res: Response) => {

    const { problemId, playlistId } = req.params

    const checkPlaylist = await db.playlist.findUnique({
        where: {
            id: playlistId
        }
    })

    if (!checkPlaylist) throw new ApiError(404, "No playlist found")

    const problem = await db.problem.findUnique({
        where: {
            id: problemId
        }
    })

    if (!problem) throw new ApiError(404, "invalid problemId")

    const userId = req.user?.id

    const playlist = await db.playlist.update({
        where: {
            id: playlistId, userId: userId!
        }, data: {
            problems: {
                connect: {
                    id: problemId
                }
            }
        }, include: {
            problems: true
        }
    })

    if (!playlist) throw new ApiError(404, "No playlist found")

    res.status(201).json(new ApiResponse(200, "Added to playlist", playlist))

})

export const deleteProblemFromPlaylist = asyncHandler(async (req: Request, res: Response) => {

    const { problemId, playlistId } = req.params

    const checkPlaylist = await db.playlist.findUnique({
        where: {
            id: playlistId
        }
    })

    if (!checkPlaylist) throw new ApiError(404, "No playlist found")

    const problem = await db.problem.findUnique({
        where: {
            id: problemId
        }
    })

    if (!problem) throw new ApiError(404, "invalid problemId")

    const userId = req.user?.id

    const playlist = await db.playlist.update({
        where: {
            id: playlistId, userId: userId!
        }, data: {
            problems: {
                disconnect: {
                    id: problemId
                }
            }
        }, include: {
            problems: true
        }
    })

    if (!playlist) throw new ApiError(404, "No playlist found")

    res.status(200).json(new ApiResponse(200, "Deleted from playlist", playlist))

})
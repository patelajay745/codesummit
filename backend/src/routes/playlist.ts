import { requireAuth } from "@clerk/express";
import { AddToPlaylist, createPlaylist, deletePlaylist, deleteProblemFromPlaylist, getAllPlaylist, getAPlaylist, updatePlaylist } from "../controllers/playlist";
import { isAuth } from "../middlewares/auth";
import { validate } from "../middlewares/validator";
import { createPlaylistSchema, updatePlaylistSchema } from "../validators/validationSchema";
import { Router } from "express";

export const router = Router()

router.use(isAuth)

router.post("/", validate(createPlaylistSchema), createPlaylist)
router.get("/", getAllPlaylist)
router.get("/:playlistId", getAPlaylist)
router.patch("/:playlistId", validate(updatePlaylistSchema), updatePlaylist)
router.delete("/:playlistId", deletePlaylist)
router.post("/add-to-playlist/:playlistId/:problemId", AddToPlaylist)
router.delete("/delete-from-playlist/:playlistId/:problemId", deleteProblemFromPlaylist)
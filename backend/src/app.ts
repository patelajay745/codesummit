import express, { Express } from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger-output.json"
import cors from "cors";

const app: Express = express()

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.status(200).json("It is up and running...")
})

// import all the routes here
import { router as authRoutes } from "./routes/auth";
import { router as problemRoutes } from "./routes/problem";
import { router as executionRoutes } from "./routes/execution";
import { router as submissionRoutes } from "./routes/submission";
import { router as playlistRoutes } from "./routes/playlist";
import { errorHandler } from "./middlewares/errorhandler";

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/problems", problemRoutes)
app.use("/api/v1/execute-code", executionRoutes)
app.use("/api/v1/submission", submissionRoutes)
app.use("/api/v1/playlist", playlistRoutes)

// app.use(errorHandler)

export default app
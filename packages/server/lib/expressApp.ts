import cors from "cors";
import express, { Application, Request, Response } from "express";

import pageRouter from "../routes/pages";
import siteRouter from "../routes/sites";
import userRouter from "../routes/users";
import initializeConfig from "./configEnv";

initializeConfig();

if (!process.env.PORT) {
    process.stderr.write("No port defined!\n");
    process.exit(1);
}

const expressApp: Application = express();
const port = parseInt(process.env.PORT);

/**
 * Middlewares for CORS will be implemented later
 */
expressApp.use(cors());

expressApp.use("/users", userRouter);
expressApp.use("/sites", siteRouter);
expressApp.use("/pages", pageRouter);

expressApp.get("/", (req: Request, res: Response) => {
    res.status(200).send("There is nothing there...");
});

// Dealing with undefined routes
expressApp.use((_, res) => {
    res.status(404).json({ error: "Not found" });
});

expressApp.listen(port);

function initializeExpressApp() {
    return expressApp;
}

export default initializeExpressApp;

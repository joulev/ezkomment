import express, { Application, Request, Response } from "express";

import route from "../routes/users";
import initializeConfig from "./configEnv";

initializeConfig();

if (!process.env.PORT) {
    process.stderr.write("No port defined!\n");
    process.exit(1);
}

const expressApp: Application = express();
const port = parseInt(process.env.PORT);

expressApp.use("/users", route);

expressApp.get("/", (req: Request, res: Response) => {
    res.status(200).send("There is nothing there...");
});

// Dealing with undefined routes, may be changed later
expressApp.use((_, res) => {
    res.status(404).json({ error: "Not found" });
});

expressApp.listen(port, () => {
    console.log(`Express app is listening on port ${port}`);
});

function initializeExpressApp() {
    return expressApp;
}

export default initializeExpressApp;

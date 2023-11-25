import cors from "cors";
import express, { Application, Request, Response } from "express";
import { UserRoutes } from "./modules/user/user.route";

const app: Application = express();

// Built in parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to user based order system");
});

export default app;

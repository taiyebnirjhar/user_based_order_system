import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/user", UserControllers.createUser);
router.get("/user", UserControllers.getAllUser);
router.post("/user/:id", UserControllers.getSingleUser);

export const UserRoutes = router;

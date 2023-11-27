import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.get("/user", UserControllers.getAllUser);
router.get("/user/:userId", UserControllers.getSingleUser);
router.post("/user", UserControllers.createUser);
router.put("/user/:userId", UserControllers.updateUser);
router.put("/user/:userId/orders", UserControllers.createOrder);
router.delete("/user/:userId", UserControllers.deleteUser);

export const UserRoutes = router;
// PUT /api/users/:userId/orders

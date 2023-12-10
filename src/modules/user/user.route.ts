import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.get("/users", UserControllers.getAllUser);
router.get("/users/:userId", UserControllers.getSingleUser);
router.post("/users", UserControllers.createUser);
router.put("/users/:userId", UserControllers.updateUser);
router.delete("/users/:userId", UserControllers.deleteUser);

router.put("/users/:userId/orders", UserControllers.createOrder);
// Retrieve all orders for a specific user
// Endpoint: GET /api/users/:userId/orders

// Calculate Total Price of Orders for a Specific User
// Endpoint: GET /api/users/:userId/orders/total-price

export const UserRoutes = router;
// PUT /api/users/:userId/orders

import { Router } from "express";
import { getAllUsers, getUserById } from "./user.service";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;

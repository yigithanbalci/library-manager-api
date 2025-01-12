import { Router } from "express";
import { validateRequest } from "../validation/class.validator.middleware";
import { CreateUserRequest } from "./dto/create.user.request";
import { createUser, getAllUsers, getUserById } from "./user.service";

const router = Router();

router.get("/", getAllUsers);
router.post("/", validateRequest(CreateUserRequest), createUser);
router.get("/:id", getUserById);

export default router;

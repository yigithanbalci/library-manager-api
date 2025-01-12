import { Router } from "express";
import { validateRequest } from "../validation/class.validator.middleware";
import { CreateUserRequest } from "./dto/create.user.request";
import {
  borrowBook,
  createUser,
  getAllUsers,
  getUserById,
  returnBook,
} from "./user.service";

const router = Router();

router.get("/", getAllUsers);
router.post("/", validateRequest(CreateUserRequest), createUser);
router.get("/:id", getUserById);
router.post("/:id/borrow/:bookId", borrowBook);
router.post("/:id/return/:bookId", returnBook);

export default router;

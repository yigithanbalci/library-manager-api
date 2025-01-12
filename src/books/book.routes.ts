import { Router } from "express";
import { validateRequest } from "../validation/class.validator.middleware";
import { getAllBooks, createBook, getBookById } from "./book.service";
import { CreateBookRequest } from "./dto/create.book.request";

const router = Router();

router.get("/", getAllBooks);
router.post("/", validateRequest(CreateBookRequest), createBook);
router.get("/:id", getBookById);

export default router;

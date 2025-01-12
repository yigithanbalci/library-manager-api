import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/book.entity";
import { APIError } from "../errors/api.error";
import { BookResponse } from "./dto/book.response";
import { CreateBookRequest } from "./dto/create.book.request";

const repository = AppDataSource.getRepository(Book);

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookId = parseInt(req.params.id, 10);
    if (isNaN(bookId)) {
      throw new APIError(400, "Invalid book ID");
    }

    const book = await repository.findOneBy({ id: bookId });

    if (!book) {
      throw new APIError(404, "Book not found");
    }

    res.status(200).json({
      ...BookResponse.from(book),
      score:
        book.totalScore == -1
          ? -1
          : (book.totalScore / book.scoreCount).toFixed(2),
    });
  } catch (error) {
    //NOTE: ????????? https://expressjs.com/en/guide/error-handling.html
    // You must catch errors that occur in asynchronous code invoked by route handlers or middleware and pass them to Express for processing.
    next(error);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const books = await repository.find();
    res.status(200).json((books ?? []).map((book) => BookResponse.from(book)));
  } catch (error) {
    next(error);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const toCreate = req.body as CreateBookRequest;
    if (await repository.exists({ where: { name: toCreate.name } })) {
      //NOTE: normally there should be another unique identifier this is not unique
      throw new APIError(400, "A book already exists with the same name");
    }
    const book = await repository.save(CreateBookRequest.to(toCreate));
    res.status(201).json(BookResponse.from(book));
  } catch (error) {
    next(error);
  }
};

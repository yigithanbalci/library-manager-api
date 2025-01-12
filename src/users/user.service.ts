import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source"; // Import your AppDataSource instance
import { BookBorrowRecord } from "../entity/book.borrow.record.entity";
import { Book } from "../entity/book.entity";
import { User } from "../entity/user.entity";
import { APIError } from "../errors/api.error";
import { CreateUserRequest } from "./dto/create.user.request";
import { ReturnBookRequest } from "./dto/return.book.request";
import { UserResponse } from "./dto/user.response";

const repository = AppDataSource.getRepository(User);
const bookRepository = AppDataSource.getRepository(Book);
const borrowRecordRepository = AppDataSource.getRepository(BookBorrowRecord);

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      throw new APIError(400, "Invalid user ID");
    }

    const user = await repository.findOne({
      where: { id: userId },
      relations: ["borrowRecords", "borrowRecords.book"],
    });

    if (!user) {
      throw new APIError(404, "User not found");
    }

    res.status(200).json(UserResponse.from(user));
  } catch (error) {
    //NOTE: ????????? https://expressjs.com/en/guide/error-handling.html
    // You must catch errors that occur in asynchronous code invoked by route handlers or middleware and pass them to Express for processing.
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await repository.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const toCreate = req.body as CreateUserRequest;
    if (await repository.exists({ where: { name: toCreate.name } })) {
      //NOTE: normally there should be another unique identifier this is not unique
      throw new APIError(400, "A user already exists with the same name");
    }
    const user = await repository.save(CreateUserRequest.to(toCreate));
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const bookId = parseInt(req.params.bookId, 10);
    if (isNaN(userId)) {
      throw new APIError(400, "Invalid user ID");
    }
    if (isNaN(bookId)) {
      throw new APIError(400, "Invalid book ID");
    }

    const user = await repository.findOneBy({ id: userId });

    if (!user) {
      throw new APIError(404, "User not found");
    }

    const book = await bookRepository.findOne({
      where: { id: bookId },
      relations: ["borrowRecords"],
    });

    if (!book) {
      throw new APIError(404, "Book not found");
    }

    //TODO: execute the search on db instead in the future this might be slower.
    const activeBorrow = book.borrowRecords.find(
      (record) => !record.isReturned,
    );
    if (activeBorrow) {
      throw new APIError(
        400,
        "Book is currently borrowed and not returned yet",
      );
    }

    const borrowRecord = new BookBorrowRecord();
    borrowRecord.user = user;
    borrowRecord.book = book;
    await borrowRecordRepository.save(borrowRecord);

    res.status(204).send();
  } catch (error) {
    //NOTE: ????????? https://expressjs.com/en/guide/error-handling.html
    // You must catch errors that occur in asynchronous code invoked by route handlers or middleware and pass them to Express for processing.
    next(error);
  }
};

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const bookId = parseInt(req.params.bookId, 10);
    if (isNaN(userId)) {
      throw new APIError(400, "Invalid user ID");
    }
    if (isNaN(bookId)) {
      throw new APIError(400, "Invalid book ID");
    }

    const user = await repository.findOneBy({ id: userId });

    if (!user) {
      throw new APIError(404, "User not found");
    }

    const book = await bookRepository.findOne({
      where: { id: bookId },
      relations: ["borrowRecords"],
    });

    if (!book) {
      throw new APIError(404, "Book not found");
    }

    const toReturn = req.body as ReturnBookRequest;

    //TODO: execute the search on db instead in the future this might be slower.
    const activeBorrow = book.borrowRecords
      .filter((record) => record.user.id === userId)
      .reverse()
      .find((record) => !record.isReturned);

    if (!activeBorrow) {
      throw new APIError(
        400,
        "No active borrow record found for this book and user",
      );
    }

    activeBorrow.isReturned = true;
    activeBorrow.userScore = toReturn.score;
    activeBorrow.returnDate = new Date();
    await borrowRecordRepository.save(activeBorrow);

    book.totalScore += toReturn.score;
    book.scoreCount += 1;
    await bookRepository.save(book);

    res.status(204).send();
  } catch (error) {
    //NOTE: ????????? https://expressjs.com/en/guide/error-handling.html
    // You must catch errors that occur in asynchronous code invoked by route handlers or middleware and pass them to Express for processing.
    next(error);
  }
};

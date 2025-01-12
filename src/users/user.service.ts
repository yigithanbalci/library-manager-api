import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source"; // Import your AppDataSource instance
import { User } from "../entity/user.entity";
import { APIError } from "../errors/api.error";

const userRepository = AppDataSource.getRepository(User);

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

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new APIError(404, "User not found");
    }

    res.status(200).json(user);
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
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

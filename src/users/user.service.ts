import { Request, Response } from "express";
import { AppDataSource } from "../data-source"; // Import your AppDataSource instance
import { User } from "../entity/user.entity";
import { APIError } from "../errors/api.error";

const userRepository = AppDataSource.getRepository(User);

export const getUserById = async (req: Request, res: Response) => {
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
    if (error instanceof APIError) {
      throw error;
    }
    console.log(`Error: ${error}`);
    throw new APIError(500, "Internal server error");
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    console.log(`Error: ${error}`);
    throw new APIError(500, "Internal server error");
  }
};

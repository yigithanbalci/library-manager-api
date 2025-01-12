import { User } from "../../entity/user.entity";
import { BooksResponse } from "./books.response";

//TODO: add swagger docs later
export class UserResponse {
  id: number;
  name: string;
  books: BooksResponse;

  static from(user: User, pastBooks: any, presentBooks: any): UserResponse {
    const response = new UserResponse();
    response.id = user.id;
    response.name = user.name;
    response.books = BooksResponse.from(pastBooks, presentBooks);
    return response;
  }
}

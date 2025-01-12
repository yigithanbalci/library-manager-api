import { IsString, IsNotEmpty } from "class-validator";
import { Book } from "../../entity/book.entity";
import { User } from "../../entity/user.entity";

export class CreateBookRequest {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name cannot be empty" })
  name: string;

  static to(createBookRequest: CreateBookRequest): Book {
    const book = new Book();
    book.name = createBookRequest.name;
    return book;
  }
}

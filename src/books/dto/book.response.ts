import { Book } from "../../entity/book.entity";

export class BookResponse {
  id: number;
  name: string;

  static from(book: Book): BookResponse {
    const response = new BookResponse();
    response.id = book.id;
    response.name = book.name;
    return response;
  }
}

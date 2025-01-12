import { BookBorrowRecord } from "../../entity/book.borrow.record.entity";

export class PresentBookResponse {
  name: string;

  static from(record: BookBorrowRecord): PresentBookResponse {
    const response = new PresentBookResponse();
    response.name = record.book.name;
    return response;
  }
}

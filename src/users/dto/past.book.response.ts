import { BookBorrowRecord } from "../../entity/book.borrow.record.entity";

export class PastBookResponse {
  name: string;
  userScore: number;

  static from(record: BookBorrowRecord): PastBookResponse {
    const response = new PastBookResponse();
    response.name = record.book.name;
    response.userScore = record.userScore;
    return response;
  }
}

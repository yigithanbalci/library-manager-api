import { BookBorrowRecord } from "../../entity/book.borrow.record.entity";
import { PastBookResponse } from "./past.book.response";
import { PresentBookResponse } from "./present.book.response";

export class BooksResponse {
  past: PastBookResponse[];
  present: PresentBookResponse[];

  static from(
    pastBooks: BookBorrowRecord[],
    presentBooks: BookBorrowRecord[],
  ): BooksResponse {
    const response = new BooksResponse();
    response.past = (pastBooks ?? []).map(
      (book: BookBorrowRecord): PastBookResponse => PastBookResponse.from(book),
    );
    response.present = (presentBooks ?? []).map(
      (book: BookBorrowRecord): PresentBookResponse =>
        PresentBookResponse.from(book),
    );
    return response;
  }
}

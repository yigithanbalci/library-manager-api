import { BookBorrowRecord } from "../../entity/book.borrow.record.entity";
import { User } from "../../entity/user.entity";
import { BooksResponse } from "./books.response";

//TODO: add swagger docs later
export class UserResponse {
  id: number;
  name: string;
  books: BooksResponse;

  static from(user: User): UserResponse {
    const pastBooksMap = new Map<number, BookBorrowRecord>();
    const presentBooksMap = new Map<number, BookBorrowRecord>();

    user.borrowRecords
      .sort((a, b) => b.borrowDate.getTime() - a.borrowDate.getTime()) // Sort by borrow date (newest first)
      .forEach((record) => {
        if (record.isReturned) {
          if (!pastBooksMap.has(record.book.id)) {
            pastBooksMap.set(record.book.id, record);
          }
        } else {
          presentBooksMap.set(record.book.id, record);
        }
      });

    // Extract arrays from the maps
    const pastBooks = Array.from(pastBooksMap.values());
    const presentBooks = Array.from(presentBooksMap.values());

    // Create the UserResponse
    const response = new UserResponse();
    response.id = user.id;
    response.name = user.name;
    response.books = BooksResponse.from(pastBooks, presentBooks);

    return response;
  }
}

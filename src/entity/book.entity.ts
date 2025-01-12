import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BookBorrowRecord } from "./book.borrow.record.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => BookBorrowRecord, (borrowRecord) => borrowRecord.book)
  borrowRecords: BookBorrowRecord[];
}

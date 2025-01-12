import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BookBorrowRecord } from "./book.borrow.record.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => BookBorrowRecord, (borrowRecord) => borrowRecord.user)
  borrowRecords: BookBorrowRecord[];
}

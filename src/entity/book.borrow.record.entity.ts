import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";

@Entity()
export class BookBorrowRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.borrowRecords, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Book, (book) => book.borrowRecords, { eager: true })
  @JoinColumn({ name: "bookId" })
  book: Book;

  @Column({ default: false })
  isReturned: boolean;

  @Column({ type: "float", nullable: true })
  userScore: number;

  @CreateDateColumn()
  borrowDate: Date;

  @UpdateDateColumn({ nullable: true })
  returnDate: Date;
}

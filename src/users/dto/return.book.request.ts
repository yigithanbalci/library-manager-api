import { IsNotEmpty, IsNumber } from "class-validator";

export class ReturnBookRequest {
  @IsNumber({}, { message: "Score must be a number" })
  @IsNotEmpty({ message: "Score cannot be empty" })
  score: number;
}

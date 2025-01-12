import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserRequest {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name cannot be empty" })
  name: string;
}

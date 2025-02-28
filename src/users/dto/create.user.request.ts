import { IsString, IsNotEmpty } from "class-validator";
import { User } from "../../entity/user.entity";

export class CreateUserRequest {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name cannot be empty" })
  name: string;

  static to(createUserRequest: CreateUserRequest): User {
    const user = new User();
    user.name = createUserRequest.name;
    return user;
  }
}

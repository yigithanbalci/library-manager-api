import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: ["dist/**/*.entity{.ts,.js}", "src/**/*.entity{.ts,.js}"],
  migrations: [],
  subscribers: [],
});

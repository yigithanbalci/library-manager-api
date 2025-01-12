import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

const parseBoolean = (value: string | undefined): boolean => {
  return value?.toLowerCase() === "true";
};

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "127.0.0.1",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  username: process.env.POSTGRES_USER_NAME || "postgres",
  password: process.env.POSTGRES_PASSWORD || "mysecretpassword",
  database: process.env.POSTGRES_DB_NAME || "postgres",
  synchronize: parseBoolean(process.env.POSTGRES_SYNC) ?? true,
  logging: false,
  entities: ["dist/**/*.entity{.ts,.js}", "src/**/*.entity{.ts,.js}"],
  migrations: [],
  subscribers: [],
});

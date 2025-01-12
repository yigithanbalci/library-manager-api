import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./errors/error.handler";
import userRoutes from "./users/user.routes";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(418).send("Express is a blasphemy, NestJS ROCKS!");
});

app.use(express.json());
app.use("/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

AppDataSource.initialize()
  .then(async () => {
    console.log("AppDataSource is initialized successfully");
  })
  .catch((error) => console.log(error));

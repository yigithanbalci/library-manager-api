import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export const validateRequest =
  (dtoClass: any) => async (req: any, res: any, next: any) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      return res.status(400).json({
        errors: errors.map((err) => ({
          field: err.property,
          message: err.constraints,
        })),
      });
    }

    next();
  };

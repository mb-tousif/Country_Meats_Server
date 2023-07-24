import { Types } from "mongoose";
import { z } from "zod";

function isObjectId(value: unknown): value is Types.ObjectId {
    return Types.ObjectId.isValid(value as string) as boolean;
  }

const createCowZodValidation = z.object({
  body: z.object({
    name: z.string().min(3).max(50),
    age: z.number().min(1),
    price: z.number().min(5),
    location: z.string().min(3).max(50),
    img: z.string().optional(),
    breed: z
      .string({
        required_error: "Breed is required",
      })
      .min(3),
    weight: z
      .number({
        required_error: "Weight is required",
      })
      .min(1),
    label: z.enum(["for sale", "sold"], {
      required_error: "Label is required",
    }),
    category: z.enum(["Beef", "Dairy", "DualPurpose"], {
      required_error: "Category is required",
    }),
    seller: z.string().refine(isObjectId, {
        message: "objectId must be a valid ObjectId",
      }),
  }),
});

export default createCowZodValidation;

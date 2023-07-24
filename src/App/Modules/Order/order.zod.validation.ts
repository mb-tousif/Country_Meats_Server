import { Types } from 'mongoose';
import { z } from 'zod';

function isObjectId(value: unknown): value is Types.ObjectId {
    return Types.ObjectId.isValid(value as string) as boolean;
  }

const createOrderZodValidation = z.object({
    body: z.object({
        buyer: z.string().refine(isObjectId, {
            message: "objectId must be a valid ObjectId",
          }),
        cow: z.string().refine(isObjectId, {
            message: "objectId must be a valid ObjectId",
            }),
        quantity: z.number().min(1).optional(),
        totalPayment: z.number().min(1).optional(),
    }),
});

export default createOrderZodValidation;
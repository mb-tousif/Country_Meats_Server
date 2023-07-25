"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
function isObjectId(value) {
    return mongoose_1.Types.ObjectId.isValid(value);
}
const createOrderZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        buyer: zod_1.z.string().refine(isObjectId, {
            message: "objectId must be a valid ObjectId",
        }),
        cow: zod_1.z.string().refine(isObjectId).optional(),
        goat: zod_1.z.string().refine(isObjectId).optional(),
        quantity: zod_1.z.number().min(1).optional(),
        totalPayment: zod_1.z.number().min(1).optional(),
    }),
});
exports.default = createOrderZodValidation;
//# sourceMappingURL=order.zod.validation.js.map
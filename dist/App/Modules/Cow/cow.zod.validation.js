"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
function isObjectId(value) {
    return mongoose_1.Types.ObjectId.isValid(value);
}
const createCowZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3).max(50),
        age: zod_1.z.number().min(1),
        price: zod_1.z.number().min(5),
        location: zod_1.z.string().min(3).max(50),
        img: zod_1.z.string().optional(),
        breed: zod_1.z
            .string({
            required_error: "Breed is required",
        })
            .min(3),
        weight: zod_1.z
            .number({
            required_error: "Weight is required",
        })
            .min(1),
        label: zod_1.z.enum(["for sale", "sold"]).optional(),
        category: zod_1.z.enum(["Beef", "Dairy", "DualPurpose"], {
            required_error: "Category is required",
        }),
    }),
});
exports.default = createCowZodValidation;
//# sourceMappingURL=cow.zod.validation.js.map
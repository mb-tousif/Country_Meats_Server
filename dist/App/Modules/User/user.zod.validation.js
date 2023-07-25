"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Enter a valid email number",
        }).email(),
        phoneNumber: zod_1.z.string({
            required_error: "Phone number is required",
        }).min(10).max(20),
        password: zod_1.z.string({
            required_error: "Password is required",
        }).min(6).max(20),
        img: zod_1.z.string().optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is required",
            }).min(2).max(20),
            lastName: zod_1.z.string({
                required_error: "Last name is required",
            }).min(2).max(20),
        }),
        role: zod_1.z.enum(["seller", "buyer", "admin"], {
            required_error: "Role is required",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }).min(2).max(140),
        budget: zod_1.z.number({
            required_error: "Budget is required",
        }).optional(),
        income: zod_1.z.number({
            required_error: "Income is required",
        }).optional(),
    }),
});
exports.default = createUserZodSchema;
//# sourceMappingURL=user.zod.validation.js.map
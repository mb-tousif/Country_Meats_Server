"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createAdminZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is required",
            }).min(3).max(50),
            lastName: zod_1.z.string({
                required_error: "Last name is required",
            }).min(3).max(50),
        }),
        email: zod_1.z.string({
            required_error: "Enter a valid email number",
        }).email(),
        img: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string({
            required_error: "Enter a valid phone number",
        }).min(10).max(13),
        role: zod_1.z.enum(["admin"], { required_error: "Role is required" }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }).min(6).max(15),
        address: zod_1.z.string({
            required_error: "Address is required",
        }).min(3).max(100),
    }),
});
exports.default = createAdminZodValidation;
//# sourceMappingURL=admin.zod.validation.js.map
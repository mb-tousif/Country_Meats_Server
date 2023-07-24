import { z } from "zod";

const createAdminZodValidation = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({
                required_error: "First name is required",
            }).min(3).max(50),
            lastName: z.string({
                required_error: "Last name is required",
            }).min(3).max(50),
        }),
        email: z.string({
            required_error: "Enter a valid email number",
        }).email(),
        phoneNumber: z.string({
            required_error: "Enter a valid phone number",
        }).min(10).max(13),
        role: z.enum(["admin"], { required_error: "Role is required" }),
        password: z.string({
            required_error: "Password is required",
        }).min(6).max(15),
        address: z.string({
            required_error: "Address is required",
        }).min(3).max(100),
    }),
});

export default createAdminZodValidation;


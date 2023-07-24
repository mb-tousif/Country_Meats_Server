import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({
        required_error: "Enter a valid email number",
    }).email(),
    phoneNumber: z.string({
        required_error: "Phone number is required",
    }).min(10).max(20),
    password: z.string({
        required_error: "Password is required",
    }).min(6).max(20),
    img: z.string().optional(),
    name: z.object({
        firstName: z.string({
            required_error: "First name is required",
        }).min(2).max(20),
        lastName: z.string({
            required_error: "Last name is required",
        }).min(2).max(20),
    }),
    role: z.enum(["seller", "buyer", "admin"], {
        required_error: "Role is required",
        }),
    address: z.string({
        required_error: "Address is required",
    }).min(2).max(140),
    budget: z.number({
        required_error: "Budget is required",
    }).optional(),
    income: z.number({
        required_error: "Income is required",
    }).optional(),
}),
});

export default createUserZodSchema;
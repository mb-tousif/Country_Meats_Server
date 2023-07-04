import express from "express";
import { createAdmin, loginAdmin } from "./admin.controller";
import ZodValidation from "../../Middleware/zodValidationHandler";
import createAdminZodValidation from "./admin.zod.validation"

const router = express.Router();

router.post('/create-admin', ZodValidation(createAdminZodValidation) ,createAdmin);
router.post('/login', loginAdmin);

export const adminsRoutes = router;
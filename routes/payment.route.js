import express from "express";

import {
    checkoutSuccess,
    createCheckoutSession,
} from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/checkout-success", protectRoute, checkoutSuccess);
router.post("/create-checkout-session", protectRoute, createCheckoutSession);

export { router as paymentRoutes };

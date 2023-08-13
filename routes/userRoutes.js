import express from "express";
import { registerUser, loginUser, logoutUser, updateUser } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router()

router.post(
    '/register',
    registerUser
)

router.post(
    '/login',
    loginUser
)

router.post(
    '/logout',
    logoutUser
)

router.put(
    '/update',
    protect,
    updateUser
)
export default router;
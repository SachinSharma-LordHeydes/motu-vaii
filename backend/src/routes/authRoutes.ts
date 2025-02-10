import { Router } from "express";
import { SignInHandler, SignUpHandler } from "../controllers/authHandler";

const authRoute=Router()

authRoute.post("/sign-up",SignUpHandler)
authRoute.post("/sign-in",SignInHandler)

export default authRoute;
import { Router } from "express";
import { clerkMiddleware } from "@clerk/express"
import { sendRequest } from "./connect-users.controllers";

const router=Router()

router.route('/send-request').post(clerkMiddleware,sendRequest)



export default router
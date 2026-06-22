import { Router } from "express";
import { clerkMiddleware } from "@clerk/express"
import {sendRequest,acceptRequest,getAllRequest,rejectRequest} from "./connect-users.controllers"

const router=Router()

router.route('/send-request').post(clerkMiddleware,sendRequest)
router.route('/accept-request').patch(clerkMiddleware,acceptRequest)
router.route('/reject-request').patch(clerkMiddleware,rejectRequest)
router.route('/get-all-request').get(clerkMiddleware,getAllRequest)


export default router
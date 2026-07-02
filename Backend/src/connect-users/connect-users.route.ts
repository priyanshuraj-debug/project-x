import { Router } from "express";
import { clerkMiddleware } from "@clerk/express"
import {sendRequest,acceptRequest,getAllRequest,rejectRequest,isConnected} from "./connect-users.controllers"

const router=Router()

router.route('/send-request').post(clerkMiddleware(),sendRequest)
router.route('/accept-request').patch(clerkMiddleware(),acceptRequest)
router.route('/reject-request').patch(clerkMiddleware(),rejectRequest)
router.route('/get-all-request').get(clerkMiddleware(),getAllRequest)
router.route('/connection-status/:userId').get(clerkMiddleware(),isConnected)


export default router
import { Router } from "express";
import { clerkMiddleware } from "@clerk/express"
import { syncUser,completeProfile,getCurrentUser,getUserById,getAllUserProfile } from "./user.controller";



const router=Router()

router.route("/sync").post(clerkMiddleware(),syncUser)
router.route("/complete-profile").patch(clerkMiddleware(),completeProfile)
router.route("/me").get(clerkMiddleware(),getCurrentUser)
router.route("/:id").get(getUserById)
router.route("/").get(clerkMiddleware(),getAllUserProfile)
export default router
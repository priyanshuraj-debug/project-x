import { connectUser, IConnect, Status } from './connect-users.models'
import { Request, Response } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { User } from '../users/user.models';


const sendRequest = asyncHandler(async (req: Request, res: Response) => {
    const auth = getAuth(req);
    const clerkId = auth.userId;

    if (!clerkId) {
        throw new ApiError(401, "Unauthorized");
    }
    const { recieverId } = req.body
    if (!recieverId) {
        throw new ApiError(402, "recieverId required")
    }
    const recieverUser = await User.findById(
        recieverId
    )
    if (!recieverUser) {
        throw new ApiError(404, "recieverUser not found")
    }
    const senderUser = await User.findOne({
        clerkId: clerkId
    })
    if (!senderUser) {
        throw new ApiError(404, "senderUser not found")
    }
    const senderId = senderUser._id
    if (!senderId) {
        throw new ApiError(402, "senderId required")
    }

    if (senderId.toString() === recieverId.toString()) {
        throw new ApiError(402, "Request to self not allowed")
    }
    const userA = await connectUser.findOne({
        senderId: senderId,
        recieverId: recieverId,
        status: { $in: [Status.pending, Status.connected] }
    })
    const userB = await connectUser.findOne({
        senderId: recieverId,
        recieverId: senderId,
        status: {
            $in: [Status.pending, Status.connected]
        }
    })

    if (userA || userB) {
        throw new ApiError(402, "request already exist")
    }

    const requestSent = await connectUser.create({
        senderId: senderId,
        recieverId: recieverId,
    })
  
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            { requestSent },
            "request sent successfully"
        ))
})
 
const acceptRequest=asyncHandler(async(req:Request,res:Response)=>{
    const auth = getAuth(req);
    const clerkId = auth.userId;

    if (!clerkId) {
        throw new ApiError(401, "Unauthorized");
    }
    const { recieverId } = req.body
    if (!recieverId) {
        throw new ApiError(402, "recieverId required")
    }
    const recieverUser = await User.findById(
        recieverId
    )
    if (!recieverUser) {
        throw new ApiError(404, "recieverUser not found")
    }
    const senderUser = await User.findOne({
        clerkId: clerkId
    })
    if (!senderUser) {
        throw new ApiError(404, "senderUser not found")
    }
    const senderId = senderUser._id
    if (!senderId) {
        throw new ApiError(402, "senderId required")
    }

    if (senderId.toString() === recieverId.toString()) {
        throw new ApiError(402, "Request to self not allowed")
    }
})

export { sendRequest }
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

const acceptRequest = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const auth = getAuth(req);
    const clerkId = auth.userId;

    if (!clerkId) {
        throw new ApiError(403, "Unauthorized");
    }
    const { requestId } = req.body
    
    if (!requestId) {
        throw new ApiError(400, "RecieverId required")
    }
    const requestedUser = await connectUser.findById(
        requestId
    )
    if (!requestedUser) {
        throw new ApiError(404, "Request not found")
    }
    if (requestedUser.status !== Status.pending) {
        throw new ApiError(402, "Request status must be pending")
    }
    const recieverUser = await User.findOne({
        clerkId: clerkId
    })
    if (!recieverUser) {
        throw new ApiError(404, "Reciver User not found")
    }
    const recieverId = recieverUser._id

    if (requestedUser.recieverId.toString() !== recieverId.toString()) {
        throw new ApiError(403, "Not authorised to accept request")
    }
    const senderId = requestedUser.senderId
    if (!senderId) {
        throw new ApiError(400, "Sender Id required")
    }
    const senderUser = await User.findById(senderId.toString())
    if (!senderUser) {
        throw new ApiError(404, "Sender user not found")
    }
    const isExisitingTeammateOfSender = await User.findOne({
        _id: senderId.toString(),
        connectedWith: recieverId.toString()
    })
    const isExisitingTeammateOfReciever = await User.findOne({
        _id: recieverId.toString(),
        connectedWith: senderId.toString()
    })
    if (isExisitingTeammateOfReciever || isExisitingTeammateOfSender) {
        throw new ApiError(409, "Already Connected")
    }
    const addedToTeamOfSender = await User.findByIdAndUpdate(senderId.toString(), {
        $addToSet: { connectedWith: recieverId.toString() }
    }, { new: true })
    const addedToTeamOfReciever = await User.findByIdAndUpdate(recieverId.toString(), {
        $addToSet: { connectedWith: senderId.toString() }
    }, { new: true })
    const updateStatus = await connectUser.findOneAndUpdate({
        _id: requestId
    }, {
        status: Status.connected
    }, { new: true }).populate("senderId")

    return res
        .status(200)
        .json(new ApiResponse(200, updateStatus, "Accepted Successfully"))
})
const rejectRequest = asyncHandler(async (req: Request, res: Response) => {
    const auth = getAuth(req);
    const clerkId = auth.userId;

    if (!clerkId) {
        throw new ApiError(403, "Unauthorized");
    }

    const { requestId } = req.body;

    if (!requestId) {
        throw new ApiError(400, "Request Id required");
    }

    const requestedUser = await connectUser.findById(requestId);

    if (!requestedUser) {
        throw new ApiError(404, "Requested user not found");
    }

    if (requestedUser.status !== Status.pending) {
        throw new ApiError(409, "Request status must be pending");
    }

    const recieverUser = await User.findOne({
        clerkId,
    });

    if (!recieverUser) {
        throw new ApiError(404, "Receiver user not found");
    }

    const recieverId = recieverUser._id;

    if (requestedUser.recieverId.toString() !== recieverId.toString()) {
        throw new ApiError(403, "Not authorised to reject request");
    }

    const updateStatus = await connectUser.findByIdAndUpdate(
        requestId,
        {
            status: Status.rejected,
        },
        {
            new: true,
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updateStatus,
            "Request Rejected Successfully"
        )
    );
});

const getAllRequest = asyncHandler(async (req: Request, res: Response) => {
    const auth = getAuth(req)
    const clerkId = auth?.userId
    if (!clerkId) {
        throw new ApiError(403, "Unauthorized");
    }
    const currentUser = await User.findOne({ clerkId: clerkId })
    if (!currentUser) {
        throw new ApiError(404, "User not found")
    }

    const allRequest = await connectUser.find({
        recieverId: currentUser._id,
        status: Status.pending
    }).populate("senderId", "fullname university bio ").sort()

    return res
        .status(200)
        .json(new ApiResponse(200, allRequest, "All request Fetched successfully"))
});

const isConnected = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const auth = getAuth(req);
    const clerkId = auth?.userId;

    if (!clerkId) {
        throw new ApiError(403, "Unauthorized");
    }

    const currentUser = await User.findOne({
        clerkId: clerkId,
    });

    if (!currentUser) {
        throw new ApiError(404, "User not found");
    }

    // Self Profile
    if (currentUser._id.toString() === userId.toString()) {
        return res.status(200).json(
            new ApiResponse(
                200,
                { status: "self" },
                "Edit Profile"
            )
        );
    }

    const request = await connectUser.findOne({
        $or: [
            {
                senderId: currentUser._id,
                recieverId: userId,
            },
            {
                senderId: userId,
                recieverId: currentUser._id,
            },
        ],
    });

    // No relationship found
    if (!request) {
        return res.status(200).json(
            new ApiResponse(
                200,
                { status: "notConnected" },
                "Connect"
            )
        );
    }

    // Rejected request behaves as not connected
    if (request.status === Status.rejected) {
        return res.status(200).json(
            new ApiResponse(
                200,
                { status: "notConnected" },
                "Connect"
            )
        );
    }

    // Pending request sent by current user
    if (
        request.status === Status.pending &&
        request.senderId.toString() === currentUser._id.toString()
    ) {
        return res.status(200).json(
            new ApiResponse(
                200,
                { status: "requestSent" },
                "Request Sent"
            )
        );
    }

    // Pending request received by current user
    if (
        request.status === Status.pending &&
        request.recieverId.toString() === currentUser._id.toString()
    ) {
        return res.status(200).json(
            new ApiResponse(
                200,
                { status: "requestReceived" },
                "Accept or Reject"
            )
        );
    }

    // Connected
    if (request.status === Status.connected) {
        return res.status(200).json(
            new ApiResponse(
                200,
                { status: "connected" },
                "Already Connected"
            )
        );
    }

    throw new ApiError(500, "Unexpected connection state");
});
export { sendRequest, acceptRequest, getAllRequest, rejectRequest, isConnected };

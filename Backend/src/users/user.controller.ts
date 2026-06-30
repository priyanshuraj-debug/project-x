import { Request, Response } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { User } from "./user.models";
import { connectUser } from "../connect-users/connect-users.models";
import { connections } from "mongoose";

const syncUser = asyncHandler(async (req: Request, res: Response) => {
  const auth = getAuth(req);
  const clerkId = auth.userId;

  if (!clerkId) {
    throw new ApiError(401, "Unauthorized");
  }

  const clerkUser = await clerkClient.users.getUser(clerkId);
  // console.log(auth);


  const email = clerkUser.primaryEmailAddress?.emailAddress;

  if (!email) {
    throw new ApiError(400, "Email not found");
  }

  let user = await User.findOne({ clerkId });

  if (!user) {
    user = await User.create({
      clerkId,
      email,
    });
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { user },
      "User synced successfully"
    )
  );
});

const completeProfile = asyncHandler(async (req: Request, res: Response) => {
  console.log("COMPLETE PROFILE HIT")
  const { fullname, skills, projects, university, githubLink, bio } = req.body;

  if (!fullname || !githubLink) {
    throw new ApiError(400, "Required fields missing");
  }

  if (!skills || skills.length === 0) {
    throw new ApiError(400, "At least one skill is required");
  }

  const auth = getAuth(req);

  if (!auth.userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const savedUser = await User.findOneAndUpdate(
    { clerkId: auth.userId },
    {
      fullname,
      skills,
      projects,
      university,
      githubLink,
      bio,
      isOnBoarded: true
    },
    {
      new: true
    }
  );

  if (!savedUser) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, savedUser, "Profile Updated Successfully"))
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const auth = getAuth(req)

  if (!auth.userId) {
    throw new ApiError(401, "Unauthorised")
  }

  const clerkId = auth?.userId

  const user = await User.findOne({ clerkId })
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched"))
})
const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(404, "id not found");
  }

  const user = await User.findById(id).select(
    "fullname university githubLink bio skills projects"
  );
  if (!user) {
    throw new ApiError(404, "user not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched by Id"));
});

const getAllUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const {
    university,
    skill,
    page = "1",
    limit = "10",
  } = req.query as {
    university?: string;
    skill?: string;
    page?: string;
    limit?: string;
  };

  const auth = getAuth(req)

  const clerkId = auth?.userId

  const currentUser = await User.findOne({ clerkId })

  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const skip: number = (pageNumber - 1) * limitNumber;

  const matchStage: any = {};

  if (university) {
    matchStage.university = university;
  }

  if (skill) {
    matchStage.skills = skill;
  }
  if (!currentUser) {

    const users = await User.aggregate([
      {
        $match: matchStage,
      },
      {
        $skip: skip,
      },
      {
        $limit: limitNumber,
      },
    ]);
    const totalUsers =
      await User.countDocuments(matchStage)
    return res
      .status(200)
      .json(new ApiResponse(200,
        {
          users,
          totalPages: Math.ceil(
            totalUsers / limitNumber
          ),
          currentPage: pageNumber,
          totalUsers
        },
        "User fetched succesfully"))
  }

  const users = await User.aggregate([
    {
      $match: matchStage,
    },
    {
      $skip: skip,
    },
    {
      $limit: limitNumber,
    },
    {
      $lookup: {
        from: connectUser.collection.name,
        let: {
          profileId: "$_id",
          currentUserId: currentUser._id
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  {
                    $and: [
                      {
                        $eq: ["$senderId", "$$currentUserId"],

                      },
                      {
                        $eq: ["$recieverId", "$$profileId"]
                      }
                    ]
                  },
                  {
                    $and: [
                      {
                        $eq: ["$senderId", "$$profileId"],

                      },
                      {
                        $eq: ["$recieverId", "$$currentUserId"]
                      }
                    ]
                  }
                ]
              },
            }
          },
        ],
        as: "connections",
      },
    },
    {
      $addFields: {
        connectionStatus: {
          // $cond: {
          //   if: {
          //     $eq: [{ $size: "$connections" }, 0]
          //   },
          //   then: "Not Connected",
          //   else: {
          //     $cond: {
          //       if: {
          //         $eq: [{ $arrayElemAt: ["$connections.status", 0] }, "connected"]
          //       },
          //       then: "Connected",
          //       else: {
          //         $cond: {
          //           if: {
          //             $eq: [{ $arrayElemAt: ["$connections.status", 0] }, "pending"]
          //           },
          //           then: {
          //             $cond: {
          //               if: {
          //                 $eq: [{ $arrayElemAt: ["$connections.senderId", 0] }, "$$currentUserId"]
          //               },
          //               then: "Request Sent",
          //               else: {
          //                 $cond: {
          //                   if: {
          //                     $eq: [{ $arrayElemAt: ["$connections.recieverId", 0] }, "$$currentUserId"]
          //                   },
          //                   then: "Request Received",
          //                   else: "Not connected"
          //                 }
          //               }
          //             }
          //           },
          //           else: "Not connected"
          //         }}
          //     }
          //   }
          // }
          $switch:{
            branches:[
              {case: {$eq: [{ $size: "$connections" }, 0]},then:"Not Connected"},
              {case: {$and:[
                {$eq: [{ $arrayElemAt: ["$connections.status", 0] }, "pending"]},
                { $eq: [{ $arrayElemAt: ["$connections.senderId", 0] }, "$$currentUserId"]}
              ]},then:"Request Sent"},
              {case: {$and:[
                {$eq: [{ $arrayElemAt: ["$connections.status", 0] }, "pending"]},
                { $eq: [{ $arrayElemAt: ["$connections.recieverId", 0] }, "$$currentUserId"]}
              ]},then:"Request Recieved"},
              {case: {$eq: [{ $arrayElemAt: ["$connections.status", 0] }, "connected"]},then:"Connected"},
            ],
            default:"Not Connected"
          }
        }
      }
    }
  ]);
  const totalUsers =
    await User.countDocuments(matchStage)
  return res
    .status(200)
    .json(new ApiResponse(200,
      {
        users,
        totalPages: Math.ceil(
          totalUsers / limitNumber
        ),
        currentPage: pageNumber,
        totalUsers
      },
      "User fetched succesfully"))


});
export { syncUser, completeProfile, getCurrentUser, getUserById, getAllUserProfile };
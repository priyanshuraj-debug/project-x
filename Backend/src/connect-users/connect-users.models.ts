import mongoose, { Schema, Document } from "mongoose";

export enum Status {
  pending = "pending",
  rejected = "rejected",
  connected = "connected",
}

export interface IConnect extends Document {
  senderId: mongoose.Types.ObjectId;
  recieverId: mongoose.Types.ObjectId;
  status: Status;
}

const connectSchema: Schema<IConnect> = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recieverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.pending,
  },
},{timestamps:true});

export const connectUser = mongoose.model<IConnect>("ConnectUser", connectSchema);
import mongoose from "mongoose";

interface IUser {
    clerkId: string;
    email:string;
    skills?:string[];
    university?:string;
    isOnBoarded:boolean;
}
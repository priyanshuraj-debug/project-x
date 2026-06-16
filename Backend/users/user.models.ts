import mongoose,{Schema,Document} from "mongoose";

export interface IProject{
   title:string,
   description:string,
   githubLink?:string,
   liveLink?:string
}

export interface IUser extends Document {
    clerkId: string;
    fullname:string;
    email:string;
    skills?:string[];
    projects?:IProject[];
    university?:string;
    githubLink?:string
    isOnBoarded:boolean;
    bio?:string
}
 const userSchema:Schema<IUser>=new Schema({
    clerkId:{
       type:String,
       required:[true,"clerkId is required"],
       unique:true
      },
      fullname:{
         type:String,
      },
      university:{
         type:String,
      },
      githubLink:{
         type:String,
      },
      bio:{
       type:String
      },
      email:{
       type:String,
       required:[true,"email is required"],
       unique:true
    },
    isOnBoarded:{
      type:Boolean,
      default:false
    },
    skills:[
      {
         type:String
      }
    ],
    projects:[
     {
      title:{
         type:String
      },
      description: {
      type: String
      },
      githubLink:{
         type:String
      },
      liveLink:{
         type:String
      }
     }
    ]
 })

export const User = mongoose.model<IUser>("User", userSchema);
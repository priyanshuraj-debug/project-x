import dotenv from "dotenv"
dotenv.config()
import app from "./app";
import { connectDB } from "./helpers/db";


connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is running at :${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGODB Connection Failed",error);
})
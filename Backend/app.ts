import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express()
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use((req,res,next)=>{
  console.log(req.method, req.url)
  next()
})
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./src/users/user.routes"
import connectRouter from './src/connect-users/connect-users.route'

app.use("/api/v1/user",userRouter)
app.use("/api/v1/connect-user",connectRouter)
export default app
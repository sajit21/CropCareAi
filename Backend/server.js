import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import predictRoutes from "./routes/predict.route.js"
import reviewRoutes from "./routes/review.route.js"
import cors from 'cors'
import catalogRoutes from "./routes/catalog.route.js"
import historyRoutes from "./routes/history.route.js"
import overviewRoutes from "./routes/overview.route.js"
import userRoutes from "./routes/user.route.js"
import {connectDB} from "./lib/db.js"
dotenv.config()

const app=express()

app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174','http://192.168.1.83:5173'], 
  credentials: true                
}));


app.use(cookieParser())
app.use(express.json({
    limit: "100mb" 
}))
app.use(express.urlencoded({ extended: true, limit: '100mb' }));




app.use("/api/auth",authRoutes)
app.use("/api/detect",predictRoutes)
app.use("/api/review",reviewRoutes)
app.use("/api/history",historyRoutes)
app.use("/api/catalog",catalogRoutes)
app.use("/api/overview",overviewRoutes)
app.use("/api/user",userRoutes)


const PORT=process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log("server is ruuning on localhost:" +PORT);
    connectDB();
})
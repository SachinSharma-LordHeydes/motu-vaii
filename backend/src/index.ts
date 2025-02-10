import express from "express";
import { dbConnect } from "./utlis/dbConnect";
import cors from 'cors';
import authRoute from "./routes/authRoutes";
import wasteRoute from "./routes/wasreRoute";


const app=express();

app.use(cors());
app.use(express.json())

dbConnect();

app.use("/api/v1",authRoute);
app.use("/api/v1",wasteRoute);


app.listen(3000,()=>{
    console.log("Server is LIve on PORT 3000")
})
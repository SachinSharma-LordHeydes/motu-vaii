import mongoose, { mongo } from "mongoose";

export const dbConnect=async()=>{
    try {
        const dbConnectresponse=await mongoose.connect("")
        console.log("BD connected Sucessfully")
    } catch (error:any) {
        console.log("Error occured While Connecting to DB",error)
        console.log(error.message)
    }
}

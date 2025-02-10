import mongoose, { mongo } from "mongoose";

export const dbConnect=async()=>{
    try {
        const dbConnectresponse=await mongoose.connect("mongodb+srv://mailitttome:vKLMEV9ZFW8-.za@cluster0.2j2bk.mongodb.net/motuvaii?retryWrites=true&w=majority")
        console.log("BD connected Sucessfully")
    } catch (error:any) {
        console.log("Error occured While Connecting to DB",error)
        console.log(error.message)
    }
}
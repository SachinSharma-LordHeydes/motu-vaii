import mongoose from "mongoose";

interface waste{
    type:"organic" | "metal" | "plastic" | "paper" | "glass";
    quantity:Number;
    condition:string;
    status:boolean
}

const wasteSchema=new mongoose.Schema<waste>({
    type:{
        type:String,
        enum: ["organic", "metal", "plastic", "paper", "glass"],
        required: true,
    },
    quantity:{
        type:Number,
        required: true,
    },
    condition:{
        type:String,
        required: true,
    },
    status:{
        type:Boolean
    }
})

const wasteModel=mongoose.model("Waste",wasteSchema);
export default wasteModel
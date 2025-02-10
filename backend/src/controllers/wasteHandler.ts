import { Request, Response } from "express";
import wasteModel from "../models/wasteModel";

export const addWasteHandler=async(req:Request,res:Response)=>{
    try {
        const {condition,quantity,userId}=req.body;
        const type=req.body.type.toLowerCase();
        console.log("req.body-->",req.body)
        if (!type || !condition || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const addWasteResponse=await wasteModel.create({type,condition,quantity,status:false})

        return res.status(200).json({
            success: true,
            message: "wast added successfully",
            data:addWasteResponse
        })

    } catch (error:any) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while adding Waste',
            error: error.message
        });
    }
}



export const getWasteHandler=async(req:Request,res:Response)=>{
    try {

        const getAllWasteResponse=await wasteModel.find()

        return res.status(200).json({
            success: true,
            message: "wast data fetched successfully",
            data:getAllWasteResponse
        })

    } catch (error:any) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching Waste data',
            error: error.message
        });
    }
}


export const manageWasteHandler=async(req:Request,res:Response)=>{
    try {
        const {wasteId}=req.body;
        const getAllWasteResponse=await wasteModel.findByIdAndUpdate(wasteId,{status:true},{new:true})

        return res.status(200).json({
            success: true,
            message: "wast managed successfully",
            data:getAllWasteResponse
        })

    } catch (error:any) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while managing Waste',
            error: error.message
        });
    }
}
import { Router } from "express";
import { addWasteHandler, getWasteHandler, manageWasteHandler } from "../controllers/wasteHandler";

const wasteRoute=Router()

wasteRoute.post("/add-waste",addWasteHandler)
wasteRoute.get("/add-waste",getWasteHandler)
wasteRoute.post("/manage-waste",manageWasteHandler)

export default wasteRoute;
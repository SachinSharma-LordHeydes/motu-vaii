import mongoose from "mongoose";

interface IUser {
    userName: string;
    email: string;
    password: string;
    role: "User" | "Admin";
}

const userSchema = new mongoose.Schema<IUser>({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 3 },
    role: { type: String, enum: ["User", "Admin"], required: true },
});

const userModel = mongoose.model<IUser>("User", userSchema);
export default userModel;
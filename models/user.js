import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    fullname: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    city: { type: String },
    country: { type: String },
    dob: { type: String },
    isProfileCompleted: { type: Boolean }
}, { timestamps: true })

const User = mongoose.model("users", userSchema)

export default User;
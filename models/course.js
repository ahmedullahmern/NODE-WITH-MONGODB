import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
    title: String,
    description: { type: String, default: "" },
    thumbnail: String
}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema);
export default Course;
import express from 'express';
import Course from '../models/course.js';
import sendResponse from '../helpers/sendResponse.js';
import { authenticationAdmin, authenticationUser } from '../midelewear/authentication.js';

const router = express.Router();

// GET: Fetch all courses
router.get("/", authenticationUser, async (req, res) => {
    try {
        const course = await Course.find();
        sendResponse(res, 200, course, false, "Courses fetched successfully");
    } catch (error) {
        console.error("Error fetching courses:", error);
        sendResponse(res, 500, null, true, "Failed to fetch courses");
    }
});

// POST: Add a new course
router.post("/", authenticationAdmin, async (req, res) => {
    try {
        let course = new Course(req.body);
        course = await course.save();
        sendResponse(res, 201, course, false, "Course added successfully");
    } catch (error) {
        console.error("Error adding course:", error);
        sendResponse(res, 500, null, true, "Failed to add course");
    }
});

export default router;

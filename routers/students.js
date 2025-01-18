import express from 'express';
import sendResponse from '../helpers/sendResponse.js';
// import Students from '../models/Students.js';
import Students from '../models/Students.js';

const router = express.Router()

router.get("/", async (req, res) => {
    const { country } = req.query
    const query = {}
    if (country) query.country = { $eq: country }
    const students = await Students.find()
    return sendResponse(res, 200, students, false, "Students Fetch SuccessFully")
})

export default router

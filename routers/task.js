import express from 'express'
const router = express.Router()
import Task from '../models/Task.js'
import sendResponse from '../helpers/sendResponse.js'

router.post("/", async (req, res) => {
    const { task } = req.body
    let newTask = Task({ task });
    newTask = await newTask.save();
    sendResponse(res, 201, newTask, "Task add Successfully")
})


router.get("/", async (req, res) => {
    const tasks = Task.find();
    sendResponse(res, 200, tasks, "Task fetched Successfully")
})

export default router

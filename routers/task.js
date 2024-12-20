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
    const tasks = await Task.find();
    sendResponse(res, 200, tasks, "Task fetched Successfully")
})


router.get("/:id", async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task)
        sendResponse(res, 404, null, "Task not found")
    sendResponse(res, 200, task, "Task fetched Successfully")
})

router.put("/:id", async (req, res) => {
    const { task, completed } = req.body
    const taskFromDB = await Task.findById(req.params.id)
    if (!taskFromDB) return sendResponse(res, 404, null, "Task not found")
    if (task) taskFromDB.task = task
    if (completed) taskFromDB.completed = completed
    await taskFromDB.save()
    sendResponse(res, 200, taskFromDB, "Task updated Successfully")
})


// router.delete("/:id", async (req, res) => {
//     const taskFromDB = await Task.findById(req.params.id)
//     if (!taskFromDB) return sendResponse(res, 404, null, "Task not found")
//     await Task.deleteOne({ _id: req.params.id })
//     sendResponse(res, 200, null, "Task Deleted Successfully")
// })

export default router

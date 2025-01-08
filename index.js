const tasks = [
    {
        id: 1,
        work: "jaldi se sare kam mukana he",
        completed: true
    },
    {
        id: 2,
        work: "youtube  nahi chalana he",
        completed: false
    },
    {
        id: 3,
        work: "only  coding focouse",
        completed: true
    }
]

import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import cors from 'cors'
import userRoutes from './routers/user.js'
import taskRoutes from './routers/task.js'
import authRoutes from './routers/auth.js'
import usersRoutes from './routers/users.js'
import courseRoutes from './routers/course.js'
import mongoose from 'mongoose'

const app = express()
const PORT = 4000

console.log("MONGODBURI==>", process.env.MONGODBURI)
app.use(cors())
app.use(express.json())
app.use(morgan("tiny"));
app.use(express.json())

app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/course', courseRoutes)

mongoose.connect(process.env.MONGODBURI).then(() => console.log("mongodb connected"))
    .catch((e) => console.log("error==>", e))

function middleware(req, res, next) {
    req.reqByAhmed = "AhmedBhai"
    console.log("hi leran middile ware");
    next()
}

app.use(middleware)

app.get("/", (req, res) => {
    // console.log("req=>", req.reqByAhmed)
    res.status(200).send(tasks)
})

app.get("/singleTask/:id", (req, res) => {
    const task = tasks.filter((data) => data.id == req.params.id)
    if (!task) {
        return res.status(404).send("Task Is Not found")
    } else {
        res.status(200).send(task)
    }
})

app.get("/", (req, res) => {
    const { completed } = req.query
    let filter = tasks
    if (completed) {
        filter = tasks.filter((data) => completed == 'ali' ? data.completed == true : data.completed == false)
    }
    res.status(200).send(filter)
})

app.post("/", (req, res) => {
    console.log("body==>", req.body)
    res.send("Hello Post Request Called")
})
app.put("/", (req, res) => {
    res.send("Hello Put Request Called")
})
app.delete("/", (req, res) => {
    res.send("Hello Delete Request Called")
})

app.listen(PORT, () => console.log("Server Is Running PORT" + PORT))
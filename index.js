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
import userRoutes from './routers/user.js'

const app = express()
const PORT = 4000

app.use(express.json())
app.use(morgan("tiny"));
app.use(express.json())

app.use('/user', userRoutes)

function middleware(req, res, next) {
    req.reqByAhmed = "AhmedBhai"
    console.log("hi leran middile ware");
    next()
}
app.use(middleware)


// app.get("/", (req, res) => {
//     // console.log("req=>", req.reqByAhmed)
//     res.status(200).send(tasks)
// })

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
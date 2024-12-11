const task = [
    {
        id: 1,
        work: "jaldi se sare kam mukana he"
    },
    {
        id: 2,
        work: "youtube  nahi chalana he"
    },
    {
        id: 3,
        work: "only  coding focouse"
    }
]

import express from 'express'
import morgan from 'morgan'

const app = express()
const PORT = 4000

app.use(express.json())
app.use(morgan("tiny"));

function middleware(req, res, next) {
    req.reqByAhmed = "AhmedBhai"
    console.log("hi leran middile ware");
    next()
}
app.use(middleware)


app.get("/", (req, res) => {
    console.log("req=>", req.reqByAhmed)
    res.status(200).send(task)
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
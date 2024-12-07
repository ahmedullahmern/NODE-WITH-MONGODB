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

const app = express()
const PORT = 4000

app.get("/", (req, res) => {
    // console.log("req=>", req.query , req.params)
    res.status(200).send(task)
})
app.post("/", (req, res) => {
    res.send("Hello Post Request Called")
})
app.put("/", (req, res) => {
    res.send("Hello Put Request Called")
})
app.delete("/", (req, res) => {
    res.send("Hello Delete Request Called")
})

app.listen(PORT, () => console.log("Server Is Running PORT" + PORT))
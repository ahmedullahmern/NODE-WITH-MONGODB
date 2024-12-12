import express from 'express'
const router = express.Router()

const users = [
    {
        id: 1,
        fullname: "ahmed",
        email: "ahmed@gmail.com"
    }
]

router.get("/", (req, res) => {
    res.status(200).json({
        error: false,
        data: users,
        msg: "user Fatched Successfullly"
    })
})

router.post("/", (req, res) => {
    const { fullname, email } = req.body;
    users.push({ id: users.length + 1, fullname, email, })
    res.status(201).json({
        error: false,
        data: users,
        msg: "user addded Successfullly"
    })
})

router.get("/:id", (req, res) => {
    const user = users.find((data) => data.id == req.params.id)
    if (!user) {
      return  res.status(404).json({
            error: true,
            data: null,
            msg: "user not found"
        })
    }
    res.status(200).json({
        error: false,
        data: user,
        msg: "user found Successfullly"
    })
})

// router.get("/:id", (req, res) => {
//     const user = users.find((data) => data.id == req.params.id);
//     if (!user) {
//         return res.status(404).json({
//             error: true,
//             data: null,
//             msg: "User not found",
//         });
//     }
//     res.status(200).json({
//         error: false,
//         data: user,
//         msg: "User found successfully",
//     });
// });
export default router
import express from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import sendResponse from '../helpers/sendResponse.js';
import { authenticationUser } from '../midelewear/authentication.js';
import User from '../models/user.js';
const router = express.Router()

router.put("/", authenticationUser, async (req, res) => {
    try {
        console.log("city==>", city)
        console.log("Country==>", Country)
        const { city, Country } = req.body
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { city, Country },
            { new: true }
        ).exec();
        return sendResponse(res, 200, user, false, "User Updated Successfully")
    } catch (error) {
        return sendResponse(res, 500, null, true, "somethin Went Wrong")
    }
})

export default router
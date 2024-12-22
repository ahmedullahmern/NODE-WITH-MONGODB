import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt'
import Joi from 'joi';
import sendResponse from '../helpers/sendResponse.js';
const router = express.Router()

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    fullname: Joi.string().alphanum().min(3).max(30).required(),
});


router.post("/register", (req, res) => {
    const { error, value } = registerSchema.validate({ a: 'a string' });
    console.log("error==>", error)
    if (error) return sendResponse(res, 400, null, true, "Please input is valid")
    console.log("value==>", value);
    res.send("Working On Register API")
})
router.post("/login", (req, res) => { })

export default router
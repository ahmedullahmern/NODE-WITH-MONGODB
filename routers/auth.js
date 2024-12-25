import express from 'express';
import 'dotenv/config'
import User from '../models/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import sendResponse from '../helpers/sendResponse.js';
const router = express.Router()

const registerSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
    fullname: Joi.string().alphanum().min(3).max(30).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
});


router.post("/register", async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return sendResponse(res, 400, null, true, error.message)
    const user = await User.findOne({ email: value.email })
    if (user) return sendResponse(res, 403, null, true, "User With This Email already Exist")
    const hashedPassword = await bcrypt.hash(value.password, 12)
    value.password = hashedPassword;
    let newUser = new User({ ...value });
    newUser = await newUser.save()
    sendResponse(res, 201, newUser, false, "User Register successfully")
})


router.post("/login", async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return sendResponse(res, 400, null, true, error.message)
    const user = await User.findOne({ email: value.email }).lean()
    if (!user) return sendResponse(res, 403, null, true, "User not Registered.")
    const isPasswordValid = await bcrypt.compare(value.password, user.password)
    if (!isPasswordValid) return sendResponse(res, 403, null, true, "Invalid  Credentails")
    var token = jwt.sign(user, process.env.AUTH_SECRET);
    sendResponse(res, 200, { user, token }, false, "User Login successfully")
})

export default router
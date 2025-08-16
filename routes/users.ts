import express from "express";
import { usersTable } from "../db/schema";
import { db } from "../db/client";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { eq, or } from "drizzle-orm";
import createError from "http-errors"

const userRouter = express.Router()



userRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(createError(401, `Missing email or password`));
    }

    const user = await db.select().from(usersTable).where(
        eq(usersTable.email, email)
    )



    if (user.length === 0) {
        return next(createError(401, 'User not found'))
    }

    if (bcrypt.compareSync(password, user[0]?.password!)) {
        const token = jwt.sign({ username: user[0]?.username, id: user[0]?.id, email: user[0]?.email, role: user[0]?.role }, process.env.JWT_SECRET!, {
            expiresIn: '15m'
        })

        const refreshtoken = jwt.sign({ username: user[0]?.username, id: user[0]?.id, email: user[0]?.email, role: user[0]?.role }, process.env.REFRESH_SECRET!, {
            expiresIn: 30 * 24 * 60 * 60
        })

        res.cookie('jwt', refreshtoken, {
            httpOnly: true, // This is the key setting
            secure: process.env.NODE_ENV === 'production', // Use 'secure' in production
            maxAge: 2 * 30 * 24 * 60 * 60 * 1000 // Cookie will expire in 2 months
        });

        return res.status(200).json({
            "login": true,
            "accessToken": token,
            "user": user
            // "refreshToken": refreshtoken
        })
    }

    next(createError(401, "Incorrect username or password"))

})


userRouter.post("/refresh", (req, res, next) => {
    const refreshToken = req.body.token

    jwt.verify(refreshToken, process.env.JWT_SECRET!, (err: any, decoded: any) => {
        if (err) {
            return next(createError(401, "Invalid token"))
        }

        const newAccessToken = jwt.sign({ username: decoded[0]?.username, id: decoded[0]?.id, email: decoded[0]?.email, role: decoded[0]?.role }, process.env.JWT_SECRET!, {
            expiresIn: '15m'
        })

        res.status(200).json({ "accessToken": newAccessToken })
    })
})





userRouter.post("/signup", async (req, res, next) => {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
        return next(createError(400, "Missing Data"))
    }

    let alreadyExists = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if (alreadyExists.length > 0) {
        return next(createError(400, "User already exists with this email."))
    }


    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const newUser: typeof usersTable.$inferInsert = {
        username: username,
        password: hashedPass,
        role: "user",
        email: email,
    }

    const user = await db.insert(usersTable).values(newUser).returning()

    res.status(200).json({ "message": "user created", user: newUser })

})

export default userRouter
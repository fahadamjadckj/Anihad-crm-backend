import { drizzle } from "drizzle-orm/libsql"
import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { NumericLiteral } from "typescript"
import type { decodedJwtUser } from "../types/User"

const db = drizzle(process.env.DB_FILE_NAME!)

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.get("Authorization")

    if (!authHeader) {
        return res.status(401).json({ "message": "Missing auth header" })
    }

    const token = authHeader.split(' ')[1]!

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(401).send("JWT Invalid")
        }

        req.user = decoded as decodedJwtUser
        // console.log(decoded)
        next()
    })


}

export default authMiddleware
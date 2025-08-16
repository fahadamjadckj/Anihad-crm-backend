import express, { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import createError, { HttpError } from 'http-errors';
import userRouter from './routes/users';
import validateEnv from './lib/validate';
import invoicesRouter from './routes/invoices';
import cors from "cors";
import clientsRouter from './routes/clients';
import { mailWorkerSetup } from './lib/mailWorkerSetup';
import { testDbConnection } from './db/client';
import { logger } from './lib/logger';
import pinoHttp from "pino-http"



validateEnv("JWT_SECRET", "JWT_REFRESH_SECRET", "DB_URL", "REDIS_HOST", "REDIS_PORT")
mailWorkerSetup()
testDbConnection()

const app = express()

const config = process.env.NODE_ENV === "development" ? {
    origin: '*',
    credentials: true
} : {
    origin: "http://localhost:3001",
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
    optionsSuccessStatus: 200
}
))
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(pinoHttp({ logger: logger }))


app.use("/users", userRouter)
app.use("/invoices", invoicesRouter)
app.use("/clients", clientsRouter)


// 404 handler
app.use((req, res, next) => {
    next(createError(404))
})

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {

    logger.error(err)

    // render the error page
    res.status(err.status || 500);
    if (err.message) {
        return res.send(err.message)
    }
    res.send("An error has occured!")
});


export default app;

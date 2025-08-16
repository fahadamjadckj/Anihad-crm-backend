import { createServer } from 'node:http';
import app from './app';
import dotenv from "dotenv"


if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: './.env.local' })
}


const server = createServer(app)
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})

server.on('error', (error: any) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Error: Port ${PORT} is alread in use.`)
        console.log('Please choose a different port or stop the other process.')
        process.exit()
    }

    console.log("An unexpected error occured: ", error)
})


process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    // Log the error and gracefully shut down
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);

    const err = new Error("Unhandled Rejection")
    console.error(err)

    // Log the error and gracefully shut down
    process.exit(1);
});

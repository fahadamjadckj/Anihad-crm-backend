import { Worker } from "worker_threads"
import path from "path"
import { logger } from "./logger"
export function mailWorkerSetup() {

    logger.info("STARTED MAIL WORKER PROCESS")

    const workerPath = path.join(__dirname, "..", "services", "MailService", "mailWorker.js")

    const worker = new Worker(workerPath)

    worker.on("error", (error) => {
        logger.error(error, "NODEJS WORKER CREATION ERROR")
        process.exit(1)
    })

}
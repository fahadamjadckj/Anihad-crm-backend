import { Queue, Worker } from "bullmq";
import { logger } from "../../lib/logger"




export const mailQueue = new Queue('mailQueue', {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379,
    }
})

mailQueue.on("error", (err) => {
    logger.error(err, "BULLMQ Queue Creation Error")
})

// for testing only!
export async function addJobs() {
    await mailQueue.add('myJobName', { foo: 'bar' });
    await mailQueue.add('myJobName', { qux: 'baz' });
}









const { Worker } = require("bullmq")
const IORedis = require("ioredis");

const connection = new IORedis({
    maxRetriesPerRequest: null,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});


const mailWorker = new Worker(
    'mailQueue',
    async job => {
        // Will print { foo: 'bar'} for the first job
        // and { qux: 'baz' } for the second.
        console.log(job.data);
    },
    { connection },
);

mailWorker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

mailWorker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});

mailWorker.on("error", (err) => {
    console.error('BULLMQ Mail Worker Error', err.message)
})

import { desc } from 'drizzle-orm'
import path from 'path'
import pino, { destination } from 'pino'


const fileTransport = pino.transport({
    targets: [
        {
            target: 'pino/file',
            options: {
                destination: path.join(process.cwd(), 'logs', 'app.log')
            }
        }, {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    ]
})

export const logger = pino({
    level: "info",
}, fileTransport)
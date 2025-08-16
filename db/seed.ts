import "dotenv/config"
import { clientsTable, invoicesTable, usersTable } from "./schema"
import { db } from "./client"
import { fa, faker } from "@faker-js/faker"
import { eq } from "drizzle-orm"

async function main() {

    const user = await db.select().from(usersTable).where(eq(usersTable.email, "test@gmail.com"))

    const clientMock: typeof clientsTable.$inferInsert = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: "international" }),
        organization: faker.company.name(),
        userId: user[0]?.id as string
    }

    const client: typeof clientsTable.$inferSelect[] = await db.insert(clientsTable).values(clientMock).returning()

    const invoiceMock: typeof invoicesTable.$inferInsert = {
        clientId: client[0]?.id as string,
        status: "pending",
        amount: 250,
        service_details: "Fullstack Website Build",
        service_completion_date: new Date('2004-6-20'),
        currency: "USD",
        userId: user[0]?.id as string
    }

    const invoice: typeof invoicesTable.$inferSelect[] = await db.insert(invoicesTable).values(invoiceMock).returning()

    console.log('done')

    process.exit(0)

}
main()
import { drizzle } from "drizzle-orm/libsql"
import { count, eq } from "drizzle-orm"
import { invoicesTable, clientsTable } from "../db/schema"
import { db } from "../db/client"


export async function getPaginatedInvoices(page: number, limit: number, userId: string) {
    const offset = (page - 1) * limit

    const invoices = await db
        .select()
        .from(invoicesTable)
        .innerJoin(clientsTable, eq(invoicesTable.clientId, clientsTable.id)).where(eq(invoicesTable.userId, userId))

    const allEntries = await db.select({ count: count() }).from(invoicesTable).where(eq(invoicesTable.userId, userId))

    const totalPages = Math.ceil(allEntries[0]?.count! / limit)

    return {
        invoices,
        totalPages,
        currentPage: page
    }
}

export async function getPaginatedClients(page: number, limit: number, userId: string) {
    const offset = (page - 1) * limit

    const clients = await db
        .select()
        .from(clientsTable)
        .where(eq(clientsTable.userId, userId))
        .limit(limit)
        .offset(limit)

    const allEntries = await db.select({ count: count() }).from(clientsTable).where(eq(clientsTable.userId, userId))

    const totalPages = Math.ceil(allEntries[0]?.count! / 10)

    return {
        clients,
        totalPages,
        currentPage: page
    }
}

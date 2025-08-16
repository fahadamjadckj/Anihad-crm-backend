import express from "express";
import { getPaginatedInvoices } from "../lib/utils";
import { db } from "../db/client";
import { clientsTable, invoicesTable } from "../db/schema";
import { eq, and } from "drizzle-orm";
import authMiddleware from "../middleware/auth";

const invoicesRouter = express.Router()


invoicesRouter.use(authMiddleware)

invoicesRouter.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 1
    const page = parseInt(req.query.page as string) || 10
    const userId = req.user?.id!

    const { invoices, totalPages, currentPage } = await getPaginatedInvoices(page, limit, userId)

    res.json({ invoices, totalPages, currentPage })
})

invoicesRouter.post("/create", async (req, res) => {
    const { status, clientId, amount, service_details, service_completion_date, invoice_paid_date } = req.body

    const userId = req.user?.id!

    await db.insert(invoicesTable).values({ status, amount, service_details, service_completion_date, clientId, invoice_paid_date, userId })

    res.status(201).json({ "message": "Invoice created successfully." })
})

invoicesRouter.delete("/delete/:invoiceId", async (req, res) => {
    const invoiceId = req.params.invoiceId

    await db
        .delete(invoicesTable)
        .where(
            and(
                eq(invoicesTable.id, invoiceId),
                eq(invoicesTable.userId, req.user?.id!)
            )
        )

    res.status(204).json({ "message": "Invoice deleted successfully" })
})

invoicesRouter.put("/update/:invoiceId", async (req, res) => {
    const invoiceId = req.params.invoiceId

    const { status, amount, service_details, service_completion_date, clientId, invoice_paid_date } = req.body

    await db
        .update(invoicesTable)
        .set({ status, amount, service_details, service_completion_date, clientId, invoice_paid_date })
        .where(and(
            eq(invoicesTable.id, invoiceId),
            eq(invoicesTable.userId, req.user?.id!)
        ))

    res.status(200).json({ "message": "Updated succesfully" })
})

export default invoicesRouter
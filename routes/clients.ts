import { db } from "../db/client";
import express from "express";
import { getPaginatedClients } from "../lib/utils";
import authMiddleware from "../middleware/auth";

const clientsRouter = express.Router()


clientsRouter.use(authMiddleware)
clientsRouter.get("/", async (req, res) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const { totalPages, clients, currentPage } = await getPaginatedClients(page, limit, req.user?.id!)

    res.status(200).json({ totalPages, clients, currentPage })
})



export default clientsRouter


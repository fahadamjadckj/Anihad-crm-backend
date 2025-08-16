import { pgTable, date, integer, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const clientsTable = pgTable("clients_table", {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    email: text().unique(),
    phone: text(),
    organization: text(),
    designation: text(),
    linkedIn: text(),
    instagram: text(),
    facebook: text(),
    userId: uuid().references(() => usersTable.id).notNull()
});

export const invoicesTable = pgTable("invoices_table", {
    id: uuid().defaultRandom().unique().primaryKey(),
    status: text({ enum: ["pending", "paid", "draft", "reversed"] }),
    clientId: uuid().references(() => clientsTable.id).notNull(),
    amount: integer().notNull(),
    currency: text().notNull().default("USD"),
    service_details: text().notNull(),
    service_completion_date: date({ mode: 'date' }).notNull(),
    invoice_issue_date: timestamp().defaultNow(),
    invoice_paid_date: date({ mode: 'date' }),
    userId: uuid().references(() => usersTable.id).notNull()

})


export const usersTable = pgTable("users_table", {
    id: uuid().defaultRandom().unique().primaryKey(),
    username: text().notNull(),
    password: text().notNull(),
    email: text().notNull().unique(),
    role: text({ enum: ["user", "admin"] }),
});

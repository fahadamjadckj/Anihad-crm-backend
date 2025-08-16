CREATE TABLE "clients_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"organization" text,
	"designation" text,
	"linkedIn" text,
	"instagram" text,
	"facebook" text,
	"userId" uuid NOT NULL,
	CONSTRAINT "clients_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "invoices_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" text,
	"clientId" uuid NOT NULL,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"service_details" text NOT NULL,
	"service_completion_date" date NOT NULL,
	"invoice_issue_date" timestamp DEFAULT now(),
	"invoice_paid_date" date NOT NULL,
	"userId" uuid NOT NULL,
	CONSTRAINT "invoices_table_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	CONSTRAINT "users_table_id_unique" UNIQUE("id"),
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "clients_table" ADD CONSTRAINT "clients_table_userId_users_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices_table" ADD CONSTRAINT "invoices_table_clientId_clients_table_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."clients_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices_table" ADD CONSTRAINT "invoices_table_userId_users_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
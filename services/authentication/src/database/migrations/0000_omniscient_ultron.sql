CREATE TABLE "login_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"email" text,
	"ip_address" "inet",
	"success" boolean,
	"reason" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

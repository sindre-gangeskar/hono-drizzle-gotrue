CREATE SCHEMA IF NOT EXISTS "auth";
--> statement-breakpoint
CREATE SCHEMA IF NOT EXISTS "shop";
--> statement-breakpoint
CREATE TABLE "shop"."categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "shop"."categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL UNIQUE,
	"parentId" integer
);
--> statement-breakpoint
CREATE TABLE "shop"."products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "shop"."products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text,
	"categoryId" integer NOT NULL,
	CONSTRAINT "product_category_composite" UNIQUE("name","categoryId")
);
--> statement-breakpoint
CREATE TABLE "auth"."roles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "auth"."roles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "auth"."users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "auth"."users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" text NOT NULL UNIQUE,
	"password" text NOT NULL,
	"roleId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shop"."categories" ADD CONSTRAINT "categories_parentId_categories_id_fkey" FOREIGN KEY ("parentId") REFERENCES "shop"."categories"("id");--> statement-breakpoint
ALTER TABLE "shop"."products" ADD CONSTRAINT "products_categoryId_categories_id_fkey" FOREIGN KEY ("categoryId") REFERENCES "shop"."categories"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD CONSTRAINT "users_roleId_roles_id_fkey" FOREIGN KEY ("roleId") REFERENCES "auth"."roles"("id");
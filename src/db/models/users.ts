import { integer, text } from "drizzle-orm/pg-core";
import auth from "../schemas/auth";
import roles from "./roles";

export default auth.table("users", {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	email: text().notNull().unique(),
	password: text().notNull(),
	roleId: integer()
		.notNull()
		.references(() => roles.id),
});

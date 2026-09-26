import { integer, text } from "drizzle-orm/pg-core";
import auth from "../schemas/auth";
export default auth.table("roles", {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	name: text().notNull().unique(),
});

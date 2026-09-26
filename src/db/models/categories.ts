import { type AnyPgColumn, integer, text } from "drizzle-orm/pg-core";
import shop from "../schemas/shop";

const categories = shop.table("categories", {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	name: text().unique().notNull(),
	parentId: integer().references((): AnyPgColumn => categories.id),
});

export default categories;

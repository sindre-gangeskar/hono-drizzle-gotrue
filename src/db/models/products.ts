import { integer, text, unique } from "drizzle-orm/pg-core";
import shop from "../schemas/shop";
import categories from "./categories";

export default shop.table(
	"products",
	{
		id: integer().generatedAlwaysAsIdentity().primaryKey(),
		name: text().notNull(),
		description: text(),
		categoryId: integer()
			.notNull()
			.references(() => categories.id, {
				onDelete: "cascade",
			}),
	},
	(table) => [
		unique("product_category_composite").on(table.name, table.categoryId),
	],
);

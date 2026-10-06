import { defineRelations } from "drizzle-orm";
import * as schema from ".";

export default defineRelations(schema, (r) => ({
	categories: { products: r.many.products() },
	products: {
		category: r.one.categories({
			from: r.products.categoryId,
			to: r.categories.id,
		}),
	},
}));

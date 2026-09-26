import { defineRelations } from "drizzle-orm";
import * as schema from "./models";

export default defineRelations(schema, (r) => ({
	roles: { users: r.many.users() },
	users: { role: r.one.roles({ from: r.users.roleId, to: r.roles.id }) },
	categories: { products: r.many.products() },
	products: {
		category: r.one.categories({
			from: r.products.categoryId,
			to: r.categories.id,
		}),
	},
}));

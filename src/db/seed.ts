import db from "./db";
import seed from "./db_seed.json";
import categories from "./models/categories";
import products from "./models/products";
import roles from "./models/roles";
import users from "./models/users";

(async () => {
	const rolesCount = await db.$count(roles);
	const usersCount = await db.$count(users);
	const categoriesCount = await db.$count(categories);
	const productsCount = await db.$count(products);

	if (rolesCount === 0) await db.insert(roles).values(seed.roles);
	if (usersCount === 0) {
		const usersFormatted = seed.users.map((user) => ({
			...user,
			password: Bun.password.hashSync(user.password),
		}));
		await db.insert(users).values(usersFormatted);
	}
	if (categoriesCount === 0)
		await db.insert(categories).values(seed.categories);
	if (productsCount === 0) await db.insert(products).values(seed.products);

	console.info("Database successfully seeded");
})();

import db from "./db";
import seed from "./db_seed.json";
import categories from "./models/categories";
import products from "./models/products";

(async () => {
	const categoriesCount = await db.$count(categories);
	const productsCount = await db.$count(products);

	if (categoriesCount === 0)
		await db.insert(categories).values(seed.categories);
	if (productsCount === 0) await db.insert(products).values(seed.products);

	console.info("Database successfully seeded");
})();

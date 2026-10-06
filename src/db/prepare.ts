import db from "./db";

(async () => {
	const sqlScript = await Bun.file(
		new URL("./sql/prepare.sql", import.meta.url),
	).text();
	await db.execute(sqlScript);
	process.exit(0);
})();

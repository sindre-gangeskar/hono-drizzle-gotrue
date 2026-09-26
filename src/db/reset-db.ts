import { sql } from "drizzle-orm";
import db from "./db";

async () => {
	await db.execute(sql`DROP SCHEMA IF EXISTS auth; DROP SCHEMA IF EXISTS shop`);
	console.info("Dropped all schemas");
	return null;
};

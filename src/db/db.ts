import { drizzle } from "drizzle-orm/node-postgres";
import getEnv from "../helpers/variables-helper";
import relations from "./relations";

const envs = getEnv();
const db = drizzle({
	relations: relations,
	logger: true,
	connection: {
		host: envs.DATABASE_HOST,
		user: envs.DATABASE_USER,
		password: envs.DATABASE_PASSWORD,
		database: envs.DATABASE_SCHEMA,
		port: envs.DATABASE_PORT,
		ssl: false,
	},
});
export default db;

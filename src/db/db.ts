import { drizzle } from "drizzle-orm/node-postgres";
import getEnv from "../helpers/variables-helper";
import relations from "./relations";

const envs = getEnv();
const databaseUrl = new URL(envs.DATABASE_URL);
const db = drizzle({
	relations: relations,
	logger: true,
	connection: {
		host: decodeURIComponent(databaseUrl.hostname),
		user: decodeURIComponent(databaseUrl.username),
		password: decodeURIComponent(databaseUrl.password),
		database: databaseUrl.pathname.slice(1),
		port: decodeURIComponent(databaseUrl.port),
		ssl: {
			ca: envs.DATABASE_CA,
			rejectUnauthorized: true,
		},
	},
});
export default db;

import { defineConfig } from "drizzle-kit";
import getEnv from "./src/helpers/variables-helper";

const envs = getEnv();
const databaseUrl = new URL(envs.DATABASE_URL);

export default defineConfig({
	dialect: "postgresql",
	dbCredentials: {
		host: databaseUrl.hostname,
		port: Number(databaseUrl.port),
		user: decodeURIComponent(databaseUrl.username),
		password: decodeURIComponent(databaseUrl.password),
		database: databaseUrl.pathname.slice(1),
		ssl: {
			ca: envs.DATABASE_CA,
			rejectUnauthorized: true,
		},
	},
	schema: ["./src/db/models", "./src/db/schemas"],
	out: "./src/db/drizzle",
});

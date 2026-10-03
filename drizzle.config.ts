import { defineConfig } from "drizzle-kit";
import getEnv from "./src/helpers/variables-helper";

const envs = getEnv();

export default defineConfig({
	dialect: "postgresql",
	dbCredentials: {
		host: envs.DATABASE_HOST,
		port: +envs.DATABASE_PORT,
		user: envs.DATABASE_USER,
		password: envs.DATABASE_PASSWORD,
		database: envs.DATABASE_SCHEMA,
		ssl: false,
	},
	schema: ["./src/db/models", "./src/db/schemas"],
	out: "./src/db/drizzle",
});

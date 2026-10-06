type EnvVariable = Record<string, string | undefined>;
export default function getEnv(): Record<string, string> {
	const errors: string[] = [];

	const envs: EnvVariable = {
		DATABASE_HOST: process.env.DATABASE_HOST,
		DATABASE_USER: process.env.DATABASE_USER,
		DATABASE_PORT: process.env.DATABASE_PORT,
		DATABASE_SCHEMA: process.env.DATABASE_SCHEMA,
		DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
		GOTRUE_SITE_URL: process.env.GOTRUE_SITE_URL,
		GOTRUE_INTERNAL_URL: process.env.GOTRUE_INTERNAL_URL,
		SITE_URL_DOMAIN: process.env.SITE_URL_DOMAIN,
	};
	if (typeof envs === "object") {
		Object.entries(envs).forEach((entry) => {
			if (typeof entry[1] === "undefined" || entry[1] === "")
				errors.push(entry[0]);
		});
	}

	if (errors.length > 0)
		throw new Error(`Missing environment variables.. ${errors.join(", ")}`);
	return envs as Record<string, string>;
}

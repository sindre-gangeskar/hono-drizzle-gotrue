type EnvVariable = Record<string, string | undefined>;
export default function getEnv(): Record<string, string> {
	const errors: string[] = [];

	const envs: EnvVariable = {
		DATABASE_URL: process.env.DATABASE_URL,
		DATABASE_CA: process.env.DATABASE_CA,
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

import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export default (error: HTTPException | Error, c: Context) => {
	console.error(error);
	if (error instanceof HTTPException) {
		return c.json(
			{
				message: error.message ?? "Internal server error",
				error_code: error.name,
			},
			error.status ?? 500,
		);
	}
	return c.json({ message: "An unexpected error has occurred" }, 500);
};

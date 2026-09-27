import type { Context } from "hono";
import type { HTTPException } from "hono/http-exception";

export default (error: HTTPException | Error, c: Context) => {
	console.error(error);
	return c.json({ message: error.message ?? "Internal server error" });
};

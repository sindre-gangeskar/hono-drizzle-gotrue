import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
export function createAndThrowHttpError(
	message: string,
	statusCode: ContentfulStatusCode,
	name: string = "INTERNAL_SERVER_ERROR",
) {
	const error = new HTTPException(statusCode, { message });
	error.name = name;
	throw error;
}

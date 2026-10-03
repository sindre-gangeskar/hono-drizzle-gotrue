import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
export function createAndThrowHttpError({
	message,
	statusCode,
	name,
}: {
	message?: string;
	statusCode?: ContentfulStatusCode;
	name?: string;
}) {
	const error = new HTTPException(statusCode ?? 500, { message });
	error.name = name ?? "INTERNAL_SERVER_ERROR";
	throw error;
}

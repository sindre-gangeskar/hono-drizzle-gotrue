import type { ContentfulStatusCode } from "hono/utils/http-status";
import { createAndThrowHttpError } from "../helpers/utils";
import getEnv from "../helpers/variables-helper";

const envs = getEnv();
const gotrueUrl = envs.GOTRUE_INTERNAL_URL;

export type GoTrueResponse = {
	code: ContentfulStatusCode;
	error_code: string;
	msg: string;
};
class GoTrueService {
	async login(email: string, password: string): Promise<GoTrueResponse> {
		try {
			const response = await fetch(`${gotrueUrl}/token?grant_type=password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const body = (await response.json()) as GoTrueResponse;
			if (!response.ok)
				createAndThrowHttpError({
					message: body.msg,
					statusCode: 400,
					name: body.error_code,
				});
			return body;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	async signup(email: string, password: string): Promise<GoTrueResponse> {
		try {
			const response = await fetch(`${gotrueUrl}/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }, null, 2),
			});
			const body = (await response.json()) as GoTrueResponse;
			if (!response.ok)
				createAndThrowHttpError({
					message: body.msg,
					statusCode: body.code,
					name: body.error_code,
				});

			return body;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	async verify(token: string, email: string) {
		try {
			const response = await fetch(`${gotrueUrl}/verify`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, email, type: "signup" }, null, 2),
			});
			return await response.json();
		} catch (error) {
			console.error(error);
			createAndThrowHttpError({});
		}
	}
}

const gotrueService = new GoTrueService();
export default gotrueService;

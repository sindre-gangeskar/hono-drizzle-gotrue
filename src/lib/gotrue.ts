import { createAndThrowHttpError } from "../helpers/utils";
import getEnv from "../helpers/variables-helper";

const envs = getEnv();
const gotrueUrl = envs.GOTRUE_INTERNAL_URL;
class GoTrueService {
	async login(email: string, password: string) {
		try {
			const response = await fetch(`${gotrueUrl}/token?grant_type=password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			return await response.json();
		} catch (error) {
			console.error(error);
		}
	}
	async signup(email: string, password: string) {
		try {
			const response = await fetch(`${gotrueUrl}/signup`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }, null, 2),
			});
			return await response.json();
		} catch (error) {
			console.error(error);
			createAndThrowHttpError({});
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

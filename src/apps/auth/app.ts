import { arktypeValidator } from "@hono/arktype-validator";
import { type } from "arktype";
import { type Context, Hono } from "hono";
import gotrueService from "../../lib/gotrue";
import { Jwt } from "hono/utils/jwt";
import { createAndThrowHttpError } from "../../helpers/utils";

const Email = type("string.email").configure({
	message: "Please enter a valid email address",
});

const LoginForm = type({
	email: Email,
	password: "string",
});
const VerifyForm = type({
	email: Email,
	token: "string",
});

const app = new Hono();

app.post("/login", arktypeValidator("json", LoginForm), async (c: Context) => {
	const body = await c.req.json();
	const response = await gotrueService.login(body.email, body.password);
	return c.json(response, response.code);
});

app.post("/signup", arktypeValidator("json", LoginForm), async (c: Context) => {
	const body = await c.req.json();
	const response = await gotrueService.signup(body.email, body.password);
	return c.json(response, response.code);
});

app.post("/verify", arktypeValidator("json", VerifyForm), async (c) => {
	const body = await c.req.json();
	const response = await gotrueService.verify(body.token, body.email);
	return c.json(response, response.code);
});

app.get("/validate", async (c) => {
	try {
		const authHeader = c.req.header("Authorization");
		const accessToken = authHeader?.split(" ")[1];
		if (!accessToken)
			return createAndThrowHttpError({
				message: "Invalid session, please log in again",
				statusCode: 401,
				name: "INVALID_SESSION",
			});

		await Jwt.verify(accessToken, process.env.GOTRUE_JWT_SECRET!, "HS256");
		return c.json({ message: "Validation successful" }, 200);
	} catch (error) {
		console.error(error);
		return c.json({ message: "Could not validate token" }, 500);
	}
});

export default app;

import { arktypeValidator } from "@hono/arktype-validator";
import { type } from "arktype";
import { type Context, Hono } from "hono";
import gotrueService from "../../lib/gotrue";

const Email = type("string.email").configure({
	message: "Please enter a valid email address",
});

const LoginForm = type({
	email: Email,
	password: "string",
});

const VerifyForm = type({
	email: "string",
});

const app = new Hono();

app.post("/login", arktypeValidator("json", LoginForm), async (c: Context) => {
	const body = await c.req.json();
	const user = await gotrueService.login(body.email, body.password);
	return c.json({ message: "Logged in successfully", user: user }, 200);
});

app.post("/signup", arktypeValidator("json", LoginForm), async (c: Context) => {
	const body = await c.req.json();
	const response = await gotrueService.signup(body.email, body.password);
	return c.json(response, response.code);
});

app.post("/verify", arktypeValidator("json", VerifyForm), async (c) => {
	const body = await c.req.json();
	const response = await gotrueService.verify(body.token, body.email);
	console.info(response);
	return c.json(response, response.code);
});

export default app;

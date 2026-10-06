import { arktypeValidator } from "@hono/arktype-validator";
import { type } from "arktype";
import { type Context, Hono } from "hono";
import gotrueService from "../../lib/gotrue";
import { jwt } from "hono/jwt";
const jwtSecret: string | undefined = process.env.GOTRUE_JWT_SECRET;
if (!jwtSecret) throw new Error("Missing GOTRUE_JWT_SECRET variable");
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

app.get("/validate", jwt({ secret: jwtSecret, alg: "HS256" }), async (c) => {
	return c.json({ message: "Session validation successful" }, 200);
});

export default app;

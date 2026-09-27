import { arktypeValidator } from "@hono/arktype-validator";
import { type } from "arktype";
import { type Context, Hono } from "hono";
import { login } from "./services";

const Email = type("string.email").configure({
	message: "Please enter a valid email address",
});

const LoginForm = type({
	email: Email,
	password: "string",
});

const app = new Hono();
app.post("/login", arktypeValidator("json", LoginForm), async (c: Context) => {
	const body = await c.req.json();
	const user = await login(body.email, body.password);
	return c.json({ message: "Logged in successfully", user: user }, 200);
});

export default app;

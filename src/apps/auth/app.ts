import { type Context, Hono } from "hono";

const app = new Hono();

app.post("/login", async (c: Context) => {
	return c.json({ message: "asdas" });
});

export default app;

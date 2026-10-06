import { Hono } from "hono";
import authApp from "./apps/auth/app";
import errorHandler from "./middleware/errorHandler";
const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});
app.route("/auth", authApp);

app.get("/templates/confirmation.html", async (c) => {
	const template = await Bun.file(
		"/app/src/templates/confirmation.html",
	).text();
	return c.html(template, 200, { "Content-Type": "text/html; charset=utl-8" });
});

app.onError(errorHandler);

export default app;

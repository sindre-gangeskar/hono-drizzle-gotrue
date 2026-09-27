import { Hono } from "hono";
import authApp from "./apps/auth/app";
import errorHandler from "./middleware/errorHandler";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});
app.route("/auth", authApp);

app.onError(errorHandler);

export default app;

import { Hono } from "hono";
import errorHandler from "./middleware/errorHandler";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.onError(errorHandler);

export default app;

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./routes/auth.js";
import { transactions } from "./routes/transactions.js";
import { meta } from "./routes/meta.js";

const app = new Hono();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.route("/auth", auth);
app.route("/transactions", transactions);
app.route("/meta", meta);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

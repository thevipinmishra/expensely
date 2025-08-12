import { Hono } from "hono";
import { jwt, type JwtVariables } from "hono/jwt";
import { findUserById } from "../controllers/auth.js";

export const meta = new Hono<{
  Variables: JwtVariables<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    exp: number;
  }>;
}>();

meta.use(
  jwt({
    secret: process.env.SECRET_KEY!,
  })
);

meta.get("/", async (c) => {
  const payload = c.get("jwtPayload");
  console.log("JWT Payload:", payload);

  if (!payload) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const userId = payload.id;
  try {
    const user = await findUserById(userId);
    return c.json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return c.json(
      {
        message: "Error fetching user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

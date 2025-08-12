import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { usersSchema } from "../db/schema.js";
import { insertUser, handleUserLogin } from "../controllers/auth.js";

export const auth = new Hono();

auth
  .post(
    "/signup",
    zValidator("json", usersSchema, (result, c) => {
      if (!result.success) {
        return c.json(z.flattenError(result.error)?.fieldErrors, 400);
      }
    }),
    async (c) => {
      try {
        const userToInsert = c.req.valid("json");
        const newUser = await insertUser(userToInsert);

        console.info("User created successfully:", newUser);
        return c.json(
          {
            message: "User created successfully",
            data: newUser,
          },
          201
        );
      } catch (error) {
        console.error("Error creating user:", error);
        return c.json(
          {
            message: "Error creating user",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          500
        );
      }
    }
  )
  .post(
    "/login",
    zValidator(
      "json",
      z.object({
        email: z.email(),
        password: z.string(),
      })
    ),
    async (c) => {
      const { email, password } = c.req.valid("json");
      console.info("User login attempt:", { email });

      try {
        const jwt = await handleUserLogin(email, password);
        console.info("User logged in successfully:", jwt);
        return c.json({
          message: "User logged in successfully",
          token: jwt,
        });
      } catch (error) {
        console.error("Error logging in user:", error);

        return c.json(
          {
            message: "Error logging in user",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          500
        );
      }
    }
  );

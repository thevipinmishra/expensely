import { Hono } from "hono";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactions.js";
import { zValidator } from "@hono/zod-validator";
import { transactionsSchema } from "../db/schema.js";
import z from "zod";

export const transactions = new Hono<{
  Variables: JwtVariables<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    exp: number;
  }>;
}>();

transactions.use(
  jwt({
    secret: process.env.SECRET_KEY!,
  })
);

transactions
  .get("/", async (c) => {
    const payload = c.get("jwtPayload");
    console.log("JWT Payload:", payload);

    if (!payload) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    try {
      const userId = payload.id;
      const userTransactions = await getTransactions(userId);

      return c.json({
        message: "Transactions fetched successfully",
        data: userTransactions,
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return c.json(
        {
          message: "Error fetching transactions",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        500
      );
    }
  })
  .post(
    "/",
    zValidator("json", transactionsSchema, (result, c) => {
      if (!result.success) {
        return c.json(z.flattenError(result.error)?.fieldErrors, 400);
      }
    }),
    async (c) => {
      const payload = c.get("jwtPayload");

      if (!payload) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      try {
        const newTransaction = c.req.valid("json");

        const transaction = {
          ...newTransaction,
          userId: payload.id,
        };

        console.info("Creating transaction:", transaction);
        const createdTransaction = await createTransaction(transaction);

        return c.json(
          {
            message: "Transaction created successfully",
            data: createdTransaction,
          },
          201
        );
      } catch (e) {
        console.error("Error creating transaction:", e);
        return c.json(
          {
            message: "Error creating transaction",
            error: e instanceof Error ? e.message : "Unknown error",
          },
          500
        );
      }
    }
  );

import { eq, getTableColumns } from "drizzle-orm";
import { transactions, users, type Transaction } from "../db/schema.js";
import { db } from "../index.js";
import { findUserById } from "./auth.js";

export const getCurrencyByUserId = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user.currency;
};

export const getTransactions = async (userId: string) => {
  const userTransactions = await db
    .select({
      ...getTableColumns(transactions),
      currency: users.currency,
    })
    .from(transactions)
    .innerJoin(users, eq(transactions.userId, users.id))
    .where(eq(transactions.userId, userId));

  return userTransactions;
};

export const createTransaction = async (transaction: Transaction) => {
  const newTransaction = await db
    .insert(transactions)
    .values(transaction)
    .returning();

  return newTransaction[0];
};

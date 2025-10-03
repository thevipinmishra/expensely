import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  numeric,
  date,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const currencyEnum = pgEnum("currency", [
  "CNY",
  "INR",
  "EUR",
  "USD",
  "IDR",
  "BRL",
  "PKR",
  "RUB",
]);

export const transactionTypeEnum = pgEnum("transactionType", [
  "income",
  "expense",
]);
export const transactionCategoryEnum = pgEnum("transactionCategory", [
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Health",
  "Education",
  "Other",
]);

export const recurringPeriodEnum = pgEnum("recurring", [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
]);

export const users = pgTable("users", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .primaryKey(),
  password: text("password").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  email: text("email").notNull().unique(),
  currency: currencyEnum().default("INR").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  isActive: boolean("isActive").notNull().default(true),
});

export const transactions = pgTable("transactions", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .primaryKey(),
  about: text("about").notNull(),
  type: transactionTypeEnum().default("expense").notNull(),
  createdAt: date("createdAt", {
    mode: "string",
  })
    .notNull()
    .defaultNow(),
  amount: numeric("amount").notNull(),
  category: transactionCategoryEnum().notNull(),
  recurring: recurringPeriodEnum(),
  notes: text("notes"),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const usersSchema = createInsertSchema(users);
export const transactionsSchema = createInsertSchema(transactions, {
  userId: z.string().optional(),
});

export type User = typeof users.$inferInsert;
export type UserResponse = typeof users.$inferSelect;
export type Transaction = typeof transactions.$inferInsert;

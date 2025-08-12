import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { users, type User } from "../db/schema.js";
import { db } from "../index.js";
import { sign } from "hono/jwt";

const SALT_ROUNDS = 10;

const findUserByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result.length > 0 ? result[0] : null;
};

export const findUserById = async (userId: string) => {
  const result = await db.select().from(users).where(eq(users.id, userId));
  
  return result.length > 0 ? {
    id: result[0].id,
    email: result[0].email,
    firstName: result[0].firstName,
    lastName: result[0].lastName,
    createdAt: result[0].createdAt,
    updatedAt: result[0].updatedAt,
    currency: result[0].currency,
  } : null;
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const insertUser = async (user: User) => {
  const existingUser = await findUserByEmail(user.email);

  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const result = await db
    .insert(users)
    .values({
      ...user,
      password: await hashPassword(user.password),
    })
    .returning();

  return {
    id: result[0].id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const handleUserLogin = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const jwt = await sign(payload, process.env.SECRET_KEY!);

  return jwt;
};

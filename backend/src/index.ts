import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const databaseURL = process.env.DATABASE_URL

if (!databaseURL) {
    throw new Error("DATABASE_URL environment variable is not set.");
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

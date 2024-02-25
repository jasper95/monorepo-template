import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
import * as schema from "./schema";

const poolConnection = mysql.createPool({ uri: process.env.DATABASE_URL,});

export const db = drizzle(poolConnection, { schema, mode: "default" });
export const luciaAdapter = new DrizzleMySQLAdapter(db, schema.sessionTable, schema.userTable);

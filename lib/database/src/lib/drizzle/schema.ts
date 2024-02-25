import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, double, unique, varchar, int, decimal, char, date, datetime, bigint, boolean, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const accountTable = mysqlTable("account", {
	id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
	number: varchar("number", { length: 8 }).notNull(),
	addressId: int("address_id").notNull().references(() => addressTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	purok: int("purok").notNull(),
	status: varchar("status", { length: 45 }).notNull(),
	customerId: bigint("customer_id", { mode: "number" }).notNull().references(() => customerTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	accountType: varchar("account_type", { length: 45 }),
	accountStandingBalance: decimal("account_standing_balance", { precision: 9, scale: 2 }).default('0.00').notNull(),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("status_updated").notNull(),
},
(table) => {
	return {
		customerIdx: index("customer_idx").on(table.customerId),
		ddressIdx: index("accountAddress_idx").on(table.addressId),
		numberUnique: unique("number UNIQUE").on(table.number),
	}
});

export const addressTable = mysqlTable("address", {
	id: int("id").autoincrement().primaryKey().notNull(),
	brgy: varchar("brgy", { length: 45 }).notNull(),
	locationCode: int("location_code").notNull(),
	accountPrefix: varchar("account_prefix", { length: 2 }).notNull(),
	accountsCount: int("accounts_count").notNull(),
	dueDay: int("due_day").notNull(),
});

export const customerTable = mysqlTable("customer", {
	id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
	firstName: varchar("first_name", { length: 45 }).notNull(),
	lastname: varchar("lastname", { length: 100 }).notNull(),
	middleName: varchar("middle_name", { length: 45 }).notNull(),
	gender: char("gender", { length: 1 }).notNull(),
	contactNumber: varchar("contact_number", { length: 50 }),
	familyMembersCount: int("family_members_count").notNull(),
	occupation: varchar("occupation", { length: 45 }).notNull(),
});

export const deviceTable = mysqlTable("device", {
	id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
	ownerId: bigint("owner_id", { mode: "number" }).notNull().references(() => accountTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	meterCode: varchar("meter_code", { length: 45 }).notNull(),
	brand: varchar("brand", { length: 45 }).notNull(),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("active").notNull(),
	lastReading: int("last_reading").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }),
},
(table) => {
	return {
		ownerIdx: index("owner_idx").on(table.ownerId),
	}
});

export const expenseTable = mysqlTable("expense", {
	id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
	type: int("type").notNull(),
	scheduleId: bigint("schedule_id", { mode: "number" }).notNull().references(() => scheduleTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	amount: decimal("amount", { precision: 9, scale: 2 }).notNull(),
	creationTime: datetime("creation_time", { mode: 'string'}).notNull(),
	createdByUser: varchar("created_by_user", { length: 45 }).notNull(),
	modifiedByUser: varchar("modified_by_user", { length: 45 }).notNull(),
	modificationTime: datetime("modification_time", { mode: 'string'}).notNull(),
	version: bigint("version", { mode: "number" }).notNull(),
},
(table) => {
	return {
		scheduleId: index("schedule_id").on(table.scheduleId),
	}
});

export const invoiceTable = mysqlTable("invoice", {
	id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
	accountId: bigint("account_id", { mode: "number" }).notNull().references(() => accountTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	readingId: bigint("reading_id", { mode: "number" }).notNull().references(() => meterReadingTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	grossCharge: decimal("gross_charge", { precision: 9, scale: 2 }),
	netCharge: decimal("net_charge", { precision: 9, scale: 2 }).notNull(),
	remainingTotal: decimal("remaining_total", { precision: 9, scale: 2 }).notNull(),
	status: varchar("status", { length: 16 }).notNull(),
	scheduleId: bigint("schedule_id", { mode: "number" }).notNull().references(() => scheduleTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	basic: decimal("basic", { precision: 9, scale: 2 }).notNull(),
	discount: decimal("discount", { precision: 9, scale: 2 }).notNull(),
	depFund: decimal("dep_fund", { precision: 9, scale: 2 }).notNull(),
	sysLoss: decimal("sys_loss", { precision: 9, scale: 2 }).notNull(),
	arrears: decimal("arrears", { precision: 9, scale: 2 }).notNull(),
	penalty: decimal("penalty", { precision: 9, scale: 2 }).notNull(),
	others: decimal("others", { precision: 9, scale: 2 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dueDate: date("due_date", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		accountIdx: index("account_idx").on(table.accountId),
		scheduleIdx: index("invoice_schedule_idx").on(table.scheduleId),
		readingIdx: index("reading_idx").on(table.readingId),
	}
});

export const meterReadingTable = mysqlTable("meter_reading", {
	id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
	accountId: bigint("account_id", { mode: "number" }).notNull().references(() => accountTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	readingValue: int("reading_value").notNull(),
	consumption: int("consumption").notNull(),
	scheduleId: bigint("schedule_id", { mode: "number" }).notNull().references(() => scheduleTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	creationTime: datetime("creation_time", { mode: 'string'}).notNull(),
	createdByUser: varchar("created_by_user", { length: 45 }).notNull(),
	modificationTime: datetime("modification_time", { mode: 'string'}).notNull(),
	modifiedByUser: varchar("modified_by_user", { length: 45 }).notNull(),
	version: bigint("version", { mode: "number" }).notNull(),
},
(table) => {
	return {
		accountIdx: index("account_idx").on(table.accountId),
		readingScheduleIdx: index("reading_schedule_idx").on(table.scheduleId),
	}
});

export const modifiedExpenseTable = mysqlTable("modified_expense", {
	id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
	expenseId: bigint("expense_id", { mode: "number" }).notNull().references(() => expenseTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	scheduleId: bigint("schedule_id", { mode: "number" }).notNull().references(() => scheduleTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	type: int("type").notNull(),
	amount: decimal("amount", { precision: 9, scale: 2 }).notNull(),
	creationTime: datetime("creation_time", { mode: 'string'}).notNull(),
	createdByUser: varchar("created_by_user", { length: 45 }).notNull(),
},
(table) => {
	return {
		expenseId: index("expense_id").on(table.expenseId),
		scheduleId: index("schedule_id").on(table.scheduleId),
	}
});

export const modifiedReadingTable = mysqlTable("modified_reading", {
	id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
	readingId: bigint("reading_id", { mode: "number" }).notNull().references(() => meterReadingTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	scheduleId: bigint("schedule_id", { mode: "number" }).notNull().references(() => scheduleTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	consumption: int("consumption").notNull(),
	readingValue: int("reading_value").notNull(),
	creationTime: datetime("creation_time", { mode: 'string'}).notNull(),
	createdByUser: varchar("created_by_user", { length: 45 }).notNull(),
},
(table) => {
	return {
		readingOrigIdx: index("reading_orig_idx").on(table.readingId),
		readingOrigScheduleIdx: index("reading_orig_schedule_idx").on(table.scheduleId),
	}
});

export const paymentTable = mysqlTable("payment", {
	id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
	accountId: bigint("account_id", { mode: "number" }).notNull().references(() => accountTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	invoiceId: bigint("invoice_id", { mode: "number" }).notNull().references(() => invoiceTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	scheduleId: bigint("schedule_id", { mode: "number" }).notNull().references(() => scheduleTable.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date("date", { mode: 'string' }).notNull(),
	amountPaid: decimal("amount_paid", { precision: 9, scale: 2 }).notNull(),
	invoiceTotal: decimal("invoice_total", { precision: 9, scale: 2 }).notNull(),
	orNumber: varchar("or_number", { length: 20 }).notNull(),
	creationTime: datetime("creation_time", { mode: 'string'}).notNull(),
	createdByUser: varchar("created_by_user", { length: 45 }).notNull(),
	modifiedByUser: varchar("modified_by_user", { length: 45 }).notNull(),
	version: bigint("version", { mode: "number" }).notNull(),
	modificationTime: datetime("modification_time", { mode: 'string'}).notNull(),
});


export const scheduleTable = mysqlTable("schedule", {
	id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
	month: int("month").notNull(),
	year: int("year").notNull(),
});

export const settingsTable = mysqlTable("settings", {
	id: int("id").autoincrement().primaryKey().notNull(),
	systemLossRate: double("system_loss_rate", { precision: 5, scale: 2 }).notNull(),
	depreciationFundRate: double("depreciation_fund_rate", { precision: 5, scale: 2 }).notNull(),
	pes: double("pes", { precision: 5, scale: 2 }).notNull(),
	basicRate: double("basic_rate", { precision: 5, scale: 2 }).notNull(),
	minSystemLoss: double("min_system_loss", { precision: 5, scale: 2 }).notNull(),
	minDepreciationFund: double("min_depreciation_fund", { precision: 5, scale: 2 }).notNull(),
	minBasic: double("min_basic", { precision: 5, scale: 2 }).notNull(),
	penalty: double("penalty", { precision: 5, scale: 2 }).notNull(),
	debtsAllowed: int("debts_allowed").notNull(),
});

export const taxTable = mysqlTable("tax", {
	id: int("id").autoincrement().primaryKey().notNull(),
	code: varchar("code", { length: 45 }).notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	value: decimal("value", { precision: 9, scale: 2 }).notNull(),
});

export const userTable = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    discordId: varchar("discord_id", { length: 255 }).unique(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    avatar: varchar("avatar", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 191 }),
    stripePriceId: varchar("stripe_price_id", { length: 191 }),
    stripeCustomerId: varchar("stripe_customer_id", { length: 191 }),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => ({
    emailIdx: index("email_idx").on(t.email),
    discordIdx: index("discord_idx").on(t.discordId),
  }),
);

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;

export const sessionTable = mysqlTable(
  "session",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: datetime("expires_at").notNull(),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
  }),
);

export const emailVerificationCodeTable = mysqlTable(
  "email_verification_code",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: varchar("user_id", { length: 21 }).unique().notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    code: varchar("code", { length: 8 }).notNull(),
    expiresAt: datetime("expires_at").notNull(),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
    emailIdx: index("email_idx").on(t.email),
  }),
);

export const passwordResetTokenTable = mysqlTable(
  "password_reset_token",
  {
    id: varchar("id", { length: 40 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: datetime("expires_at").notNull(),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.userId),
  }),
);

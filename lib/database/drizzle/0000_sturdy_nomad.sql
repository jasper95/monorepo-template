CREATE TABLE `account` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`number` varchar(8) NOT NULL,
	`address_id` int NOT NULL,
	`purok` int NOT NULL,
	`status` varchar(45) NOT NULL,
	`customer_id` bigint NOT NULL,
	`account_type` varchar(45),
	`account_standing_balance` decimal(9,2) NOT NULL DEFAULT '0.00',
	CONSTRAINT `account_id` PRIMARY KEY(`id`),
	CONSTRAINT `number UNIQUE` UNIQUE(`number`)
);
--> statement-breakpoint
CREATE TABLE `address` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brgy` varchar(45) NOT NULL,
	`location_code` int NOT NULL,
	`account_prefix` varchar(2) NOT NULL,
	`accounts_count` int NOT NULL,
	`due_day` int NOT NULL,
	CONSTRAINT `address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`first_name` varchar(45) NOT NULL,
	`lastname` varchar(100) NOT NULL,
	`middle_name` varchar(45) NOT NULL,
	`gender` char(1) NOT NULL,
	`contact_number` varchar(50),
	`family_members_count` int NOT NULL,
	`occupation` varchar(45) NOT NULL,
	CONSTRAINT `customer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `device` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`owner_id` bigint NOT NULL,
	`meter_code` varchar(45) NOT NULL,
	`brand` varchar(45) NOT NULL,
	`last_reading` int NOT NULL,
	`start_date` date,
	`end_date` date,
	CONSTRAINT `device_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_verification_code` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(21) NOT NULL,
	`email` varchar(255) NOT NULL,
	`code` varchar(8) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `email_verification_code_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_verification_code_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `expense` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`type` int NOT NULL,
	`schedule_id` bigint NOT NULL,
	`amount` decimal(9,2) NOT NULL,
	`creation_time` datetime NOT NULL,
	`created_by_user` varchar(45) NOT NULL,
	`modified_by_user` varchar(45) NOT NULL,
	`modification_time` datetime NOT NULL,
	`version` bigint NOT NULL,
	CONSTRAINT `expense_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoice` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`account_id` bigint NOT NULL,
	`reading_id` bigint NOT NULL,
	`gross_charge` decimal(9,2),
	`net_charge` decimal(9,2) NOT NULL,
	`remaining_total` decimal(9,2) NOT NULL,
	`status` varchar(16) NOT NULL,
	`schedule_id` bigint NOT NULL,
	`basic` decimal(9,2) NOT NULL,
	`discount` decimal(9,2) NOT NULL,
	`dep_fund` decimal(9,2) NOT NULL,
	`sys_loss` decimal(9,2) NOT NULL,
	`arrears` decimal(9,2) NOT NULL,
	`penalty` decimal(9,2) NOT NULL,
	`others` decimal(9,2) NOT NULL,
	`due_date` date NOT NULL,
	CONSTRAINT `invoice_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `meter_reading` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`account_id` bigint NOT NULL,
	`reading_value` int NOT NULL,
	`consumption` int NOT NULL,
	`schedule_id` bigint NOT NULL,
	`creation_time` datetime NOT NULL,
	`created_by_user` varchar(45) NOT NULL,
	`modification_time` datetime NOT NULL,
	`modified_by_user` varchar(45) NOT NULL,
	`version` bigint NOT NULL,
	CONSTRAINT `meter_reading_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `modified_expense` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`expense_id` bigint NOT NULL,
	`schedule_id` bigint NOT NULL,
	`type` int NOT NULL,
	`amount` decimal(9,2) NOT NULL,
	`creation_time` datetime NOT NULL,
	`created_by_user` varchar(45) NOT NULL,
	CONSTRAINT `modified_expense_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `modified_reading` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`reading_id` bigint NOT NULL,
	`schedule_id` bigint NOT NULL,
	`consumption` int NOT NULL,
	`reading_value` int NOT NULL,
	`creation_time` datetime NOT NULL,
	`created_by_user` varchar(45) NOT NULL,
	CONSTRAINT `modified_reading_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `password_reset_token` (
	`id` varchar(40) NOT NULL,
	`user_id` varchar(21) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `password_reset_token_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payment` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`account_id` bigint NOT NULL,
	`invoice_id` bigint NOT NULL,
	`schedule_id` bigint NOT NULL,
	`date` date NOT NULL,
	`amount_paid` decimal(9,2) NOT NULL,
	`invoice_total` decimal(9,2) NOT NULL,
	`or_number` varchar(20) NOT NULL,
	`creation_time` datetime NOT NULL,
	`created_by_user` varchar(45) NOT NULL,
	`modified_by_user` varchar(45) NOT NULL,
	`version` bigint NOT NULL,
	`modification_time` datetime NOT NULL,
	CONSTRAINT `payment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `schedule` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	CONSTRAINT `schedule_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(21) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`system_loss_rate` double(5,2) NOT NULL,
	`depreciation_fund_rate` double(5,2) NOT NULL,
	`pes` double(5,2) NOT NULL,
	`basic_rate` double(5,2) NOT NULL,
	`min_system_loss` double(5,2) NOT NULL,
	`min_depreciation_fund` double(5,2) NOT NULL,
	`min_basic` double(5,2) NOT NULL,
	`penalty` double(5,2) NOT NULL,
	`debts_allowed` int NOT NULL,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tax` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(45) NOT NULL,
	`description` varchar(255) NOT NULL,
	`value` decimal(9,2) NOT NULL,
	CONSTRAINT `tax_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(21) NOT NULL,
	`discord_id` varchar(255),
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`hashed_password` varchar(255),
	`avatar` varchar(255),
	`stripe_subscription_id` varchar(191),
	`stripe_price_id` varchar(191),
	`stripe_customer_id` varchar(191),
	`stripe_current_period_end` timestamp,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_discord_id_unique` UNIQUE(`discord_id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `customer_idx` ON `account` (`customer_id`);--> statement-breakpoint
CREATE INDEX `accountAddress_idx` ON `account` (`address_id`);--> statement-breakpoint
CREATE INDEX `owner_idx` ON `device` (`owner_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `email_verification_code` (`user_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `email_verification_code` (`email`);--> statement-breakpoint
CREATE INDEX `schedule_id` ON `expense` (`schedule_id`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `invoice` (`account_id`);--> statement-breakpoint
CREATE INDEX `invoice_schedule_idx` ON `invoice` (`schedule_id`);--> statement-breakpoint
CREATE INDEX `reading_idx` ON `invoice` (`reading_id`);--> statement-breakpoint
CREATE INDEX `account_idx` ON `meter_reading` (`account_id`);--> statement-breakpoint
CREATE INDEX `reading_schedule_idx` ON `meter_reading` (`schedule_id`);--> statement-breakpoint
CREATE INDEX `expense_id` ON `modified_expense` (`expense_id`);--> statement-breakpoint
CREATE INDEX `schedule_id` ON `modified_expense` (`schedule_id`);--> statement-breakpoint
CREATE INDEX `reading_orig_idx` ON `modified_reading` (`reading_id`);--> statement-breakpoint
CREATE INDEX `reading_orig_schedule_idx` ON `modified_reading` (`schedule_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `password_reset_token` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `discord_idx` ON `user` (`discord_id`);--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_address_id_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_customer_id_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `device` ADD CONSTRAINT `device_owner_id_account_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `account`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `expense` ADD CONSTRAINT `expense_schedule_id_schedule_id_fk` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_account_id_account_id_fk` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_reading_id_meter_reading_id_fk` FOREIGN KEY (`reading_id`) REFERENCES `meter_reading`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_schedule_id_schedule_id_fk` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `meter_reading` ADD CONSTRAINT `meter_reading_account_id_account_id_fk` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `meter_reading` ADD CONSTRAINT `meter_reading_schedule_id_schedule_id_fk` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `modified_expense` ADD CONSTRAINT `modified_expense_expense_id_expense_id_fk` FOREIGN KEY (`expense_id`) REFERENCES `expense`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `modified_expense` ADD CONSTRAINT `modified_expense_schedule_id_schedule_id_fk` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `modified_reading` ADD CONSTRAINT `modified_reading_reading_id_meter_reading_id_fk` FOREIGN KEY (`reading_id`) REFERENCES `meter_reading`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `modified_reading` ADD CONSTRAINT `modified_reading_schedule_id_schedule_id_fk` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payment` ADD CONSTRAINT `payment_account_id_account_id_fk` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payment` ADD CONSTRAINT `payment_invoice_id_invoice_id_fk` FOREIGN KEY (`invoice_id`) REFERENCES `invoice`(`id`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `payment` ADD CONSTRAINT `payment_schedule_id_schedule_id_fk` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON DELETE restrict ON UPDATE cascade;
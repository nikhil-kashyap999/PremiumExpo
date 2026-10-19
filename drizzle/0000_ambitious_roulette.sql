CREATE TABLE `conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`conversation_id` text NOT NULL,
	`sender_id` text NOT NULL,
	`text_msg` text NOT NULL,
	`created_at` integer NOT NULL,
	`status` text DEFAULT 'sent' NOT NULL,
	FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `conv_created_idx` ON `messages` (`conversation_id`,`created_at`);
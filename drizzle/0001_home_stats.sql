CREATE TABLE `reading_sessions_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bookId` integer,
	`pagesRead` integer DEFAULT 0 NOT NULL,
	`minutes` integer DEFAULT 0 NOT NULL,
	`recordedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `goals_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`booksTarget` integer DEFAULT 12 NOT NULL
);

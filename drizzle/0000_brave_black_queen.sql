CREATE TABLE `books_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`isbn` text,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`img` text NOT NULL,
	`pages` integer DEFAULT 0 NOT NULL,
	`currentPage` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `books_table_isbn_unique` ON `books_table` (`isbn`);--> statement-breakpoint
CREATE TABLE `notes_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bookId` integer NOT NULL,
	`content` text NOT NULL,
	`category` text DEFAULT 'Synthesis' NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);

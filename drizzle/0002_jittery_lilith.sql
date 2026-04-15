ALTER TABLE `articles` ADD `pdfUrl` varchar(500);--> statement-breakpoint
ALTER TABLE `articles` ADD `pdfTitle` varchar(255);--> statement-breakpoint
ALTER TABLE `articles` ADD `enablePdfDownload` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `articles` ADD `embeds` text;--> statement-breakpoint
ALTER TABLE `articles` ADD `socialImage` varchar(500);
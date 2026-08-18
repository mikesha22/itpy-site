CREATE TABLE `trial_leads` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`program` text NOT NULL,
	`study_format` text NOT NULL,
	`preferred_day` text NOT NULL,
	`preferred_time` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text NOT NULL
);

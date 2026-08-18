import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const trialLeads = sqliteTable("trial_leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  program: text("program").notNull(),
  studyFormat: text("study_format").notNull(),
  preferredDay: text("preferred_day").notNull(),
  preferredTime: text("preferred_time").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
});

import { env } from "cloudflare:workers";

export type TrialLeadInput = {
  name: string;
  phone: string;
  program: string;
  studyFormat: string;
  preferredDay: string;
  preferredTime: string;
};

const createTrialLeadsTable = `
  CREATE TABLE IF NOT EXISTS trial_leads (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    program TEXT NOT NULL,
    study_format TEXT NOT NULL,
    preferred_day TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL
  )
`;

export async function saveTrialLead(input: TrialLeadInput) {
  if (!env.DB) {
    throw new Error("D1 binding DB is unavailable");
  }

  await env.DB.prepare(createTrialLeadsTable).run();

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO trial_leads (
      id,
      name,
      phone,
      program,
      study_format,
      preferred_day,
      preferred_time,
      status,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
  )
    .bind(
      id,
      input.name,
      input.phone,
      input.program,
      input.studyFormat,
      input.preferredDay,
      input.preferredTime,
      createdAt,
    )
    .run();

  return { id, createdAt };
}

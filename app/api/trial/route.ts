import { saveTrialLead } from "@/db/trial-leads";

const programs = new Set(["ЕГЭ", "ОГЭ", "Python"]);
const formats = new Set(["Мини-группа", "Индивидуально"]);

function clean(value: unknown, maxLength = 80) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Некорректная заявка" }, { status: 400 });
  }

  const name = clean(body.name);
  const phone = clean(body.phone);
  const program = clean(body.program, 20);
  const studyFormat = clean(body.studyFormat, 30);
  const preferredDay = clean(body.day, 40);
  const preferredTime = clean(body.time, 20);

  if (
    name.length < 2 ||
    phone.length < 5 ||
    !programs.has(program) ||
    !formats.has(studyFormat) ||
    !preferredDay ||
    !preferredTime
  ) {
    return Response.json(
      { error: "Проверьте заполненные поля" },
      { status: 400 },
    );
  }

  const lead = await saveTrialLead({
    name,
    phone,
    program,
    studyFormat,
    preferredDay,
    preferredTime,
  });

  return Response.json({ ok: true, id: lead.id }, { status: 201 });
}

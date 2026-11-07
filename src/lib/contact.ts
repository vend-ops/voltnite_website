export type ContactFields = { name: string; email: string; company: string; details: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export function validateContact(input: unknown): { fields: ContactFields; errors: ContactErrors } {
  const record = input !== null && typeof input === "object" ? input as Record<string, unknown> : {};
  const read = (key: keyof ContactFields) => typeof record[key] === "string" ? record[key].trim() : "";
  const fields = { name: read("name"), email: read("email"), company: read("company"), details: read("details") };
  const errors: ContactErrors = {};
  if (fields.name.length < 2 || fields.name.length > 100) errors.name = "Enter your name (2–100 characters).";
  if (fields.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Enter a valid email address.";
  if (fields.company.length > 150) errors.company = "Use 150 characters or fewer.";
  if (fields.details.length < 20 || fields.details.length > 5000) errors.details = "Tell us about your project in 20–5,000 characters.";
  return { fields, errors };
}

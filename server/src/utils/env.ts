import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  resendApiKey: requireEnv("RESEND_API_KEY"),
  contactToEmail: requireEnv("CONTACT_TO_EMAIL"),
  contactFromEmail: requireEnv("CONTACT_FROM_EMAIL"),
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? "http://localhost:5173")
    .split(",")
    .map((value) => value.trim()),
};

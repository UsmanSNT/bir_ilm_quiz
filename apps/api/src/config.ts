import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "dev-only-secret",
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
  telegramWebAppUrl: process.env.TELEGRAM_WEB_APP_URL ?? "http://localhost:5173"
};

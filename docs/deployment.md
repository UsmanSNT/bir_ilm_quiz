# Deployment Guide

## Frontend on Vercel

1. Set project root to `apps/web`.
2. Build command: `npm run build --workspace @bir-ilm/web`.
3. Output directory: `apps/web/dist`.
4. Add `VITE_API_BASE_URL` and `VITE_TELEGRAM_BOT_USERNAME`.

## Backend on Railway or Render

1. Set start command: `npm run start --workspace @bir-ilm/api`.
2. Set build command: `npm run build --workspace @bir-ilm/api`.
3. Add `DATABASE_URL`, `JWT_SECRET`, `TELEGRAM_BOT_TOKEN`, and `TELEGRAM_WEB_APP_URL`.
4. Run `database/schema.sql` against the managed PostgreSQL database.

## Telegram

1. Configure bot webhook to `https://api.example.com/api/telegram/webhook`.
2. Configure Mini App URL to the Vercel frontend.
3. Test `/start`, Mini App launch, auth sync, and quiz deep links.

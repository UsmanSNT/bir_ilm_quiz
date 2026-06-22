# BIR ILM

BIR ILM is a production-oriented educational community platform for Uzbek students in South Korea, with an integrated quiz ecosystem and Telegram Mini App experience.

## What is included

- React + TypeScript + Vite frontend in `apps/web`
- Express + TypeScript backend in `apps/api`
- Shared TypeScript domain types in `packages/shared`
- PostgreSQL schema in `database/schema.sql`
- Architecture, API, deployment, security, scaling, ERD, and wireframe docs in `docs`

## Local development

```bash
npm install
npm run dev
npm run dev:api
```

Copy `.env.example` to the appropriate app-level `.env` files before running against real services.

## Deployment targets

- Frontend: Vercel
- Backend: Railway or Render
- Database: Managed PostgreSQL
- Telegram: BotFather bot + Mini App URL pointed at the deployed frontend

# Security Architecture

- Verify Telegram Mini App `initData` server-side with HMAC-SHA256.
- Use short-lived JWTs and rotate `JWT_SECRET` through environment management.
- Enforce RBAC for quiz creation, publishing, moderation, library management, and event management.
- Store PDFs in object storage and serve protected files through signed URLs.
- Use `helmet`, strict CORS origins, request size limits, and rate limiting before production launch.
- Log auth, admin, and quiz publishing events for auditability.
- Avoid storing Telegram bot token in frontend code.
- Use PostgreSQL constraints and transactions for quiz attempts and scoring.
- Add row-level audit fields for content moderation workflows as the team grows.

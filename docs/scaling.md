# Future Scaling Strategy

- Add Redis for leaderboard caching, rate limits, and scheduled notification queues.
- Move Telegram broadcasts to background workers with retry and dead-letter handling.
- Partition or archive `quiz_attempts` and `quiz_responses` once quiz volume grows.
- Use read replicas for analytics-heavy dashboards.
- Add full-text search indexes for books, reviews, and events.
- Introduce CDN-backed object storage for covers and PDFs.
- Add observability with structured logs, metrics, tracing, and uptime checks.
- Keep the API stateless so multiple backend instances can run behind a load balancer.

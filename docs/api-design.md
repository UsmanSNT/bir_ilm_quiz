# API Design

Base path: `/api`

## Auth

- `POST /auth/telegram`: verify Telegram Mini App `initData`, sync user, return JWT.
- `GET /users/me`: planned endpoint for profile, XP, roles, streaks, and achievements.

## Catalog

- `GET /catalog/books`: list books with search/category filters.
- `POST /catalog/books`: admin-only book creation.
- `GET /catalog/reviews`: list public reviews.
- `POST /catalog/reviews`: member review submission.
- `GET /catalog/events`: list events.
- `POST /catalog/events`: admin/moderator event creation.

## Quiz

- `GET /quizzes`: list published, live, and scheduled quizzes.
- `POST /quizzes`: admin/super-admin quiz creation.
- `PATCH /quizzes/:quizId`: admin/super-admin quiz editing.
- `POST /quizzes/:quizId/publish`: admin/super-admin publish action.
- `POST /quizzes/:quizId/attempts`: member starts quiz.
- `POST /quizzes/:quizId/attempts/:attemptId/responses`: submit response.
- `GET /quizzes/:quizId/analytics`: admin/moderator analytics.
- `GET /leaderboards`: ranking by XP, quiz points, category, and period.

## Telegram

- `POST /telegram/webhook`: bot updates.
- `POST /telegram/notifications/quiz`: queue quiz notifications.

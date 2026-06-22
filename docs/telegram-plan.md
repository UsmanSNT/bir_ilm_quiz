# Telegram Bot and Mini App Plan

## Mini App

1. Create `@BirIlmBot` with BotFather.
2. Set the Mini App URL to the Vercel frontend URL.
3. The frontend calls `window.Telegram.WebApp.ready()` and `expand()`.
4. The frontend posts `initData` to `/api/auth/telegram`.
5. The backend verifies the signature using the bot token and syncs the user.
6. JWT is used for API calls after Mini App login.

## Bot Features

- `/start`: sends an inline Mini App button.
- Quiz notifications: sent when a scheduled quiz opens.
- Weekly reading reminders: recurring campaign job.
- Event announcements: targeted broadcast to active members.
- Leaderboard updates: weekly summary with top readers and quiz participants.
- Quiz result notifications: sent after grading is complete.

## Deep Links

Use Telegram start parameters:

- `https://t.me/BirIlmBot?startapp=quiz_book-sprint`
- `https://t.me/BirIlmBot?startapp=event_weekly-discussion`

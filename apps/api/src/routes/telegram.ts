import express from "express";
import { config } from "../config.js";

export const telegramRouter = express.Router();

telegramRouter.post("/webhook", (req, res) => {
  const message = req.body?.message;
  const chatId = message?.chat?.id;
  const text = message?.text;

  if (chatId && text === "/start") {
    return res.json({
      method: "sendMessage",
      chat_id: chatId,
      text: "Welcome to BIR ILM. Open the Mini App to read, learn, and join quizzes.",
      reply_markup: {
        inline_keyboard: [[{ text: "Open BIR ILM", web_app: { url: config.telegramWebAppUrl } }]]
      }
    });
  }

  res.json({ ok: true });
});

telegramRouter.post("/notifications/quiz", (_req, res) => {
  res.status(202).json({ data: { queued: true, type: "quiz_notification" } });
});

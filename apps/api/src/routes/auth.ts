import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { config } from "../config.js";
import { verifyTelegramInitData } from "../services/telegramAuth.js";

export const authRouter = express.Router();

const telegramLoginSchema = z.object({
  initData: z.string().min(1)
});

authRouter.post("/telegram", (req, res) => {
  const parsed = telegramLoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const valid = verifyTelegramInitData(parsed.data.initData, config.telegramBotToken);
  if (!valid && config.telegramBotToken) return res.status(401).json({ error: "Invalid Telegram signature" });

  const params = new URLSearchParams(parsed.data.initData);
  const telegramUser = JSON.parse(params.get("user") ?? "{}");
  const token = jwt.sign(
    {
      id: `tg_${telegramUser.id ?? "dev"}`,
      telegramId: String(telegramUser.id ?? "dev"),
      role: "member"
    },
    config.jwtSecret,
    { expiresIn: "7d" }
  );

  res.json({ data: { token, user: telegramUser } });
});

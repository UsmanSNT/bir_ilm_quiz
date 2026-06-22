import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config.js";
import { optionalAuth } from "./middleware/auth.js";
import { authRouter } from "./routes/auth.js";
import { catalogRouter } from "./routes/catalog.js";
import { quizzesRouter } from "./routes/quizzes.js";
import { telegramRouter } from "./routes/telegram.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(optionalAuth);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "bir-ilm-api" });
});

app.use("/api/auth", authRouter);
app.use("/api/catalog", catalogRouter);
app.use("/api/quizzes", quizzesRouter);
app.use("/api/telegram", telegramRouter);

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

app.listen(config.port, () => {
  console.log(`BIR ILM API listening on ${config.port}`);
});

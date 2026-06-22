import express from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { requireAuth, requireRole } from "../middleware/auth.js";

export const quizzesRouter = express.Router();

const quizSchema = z.object({
  title: z.string().min(3),
  type: z.enum(["Book", "English", "Korean", "TOPIK", "Cybersecurity", "IT", "Custom"]),
  durationMinutes: z.number().int().positive(),
  points: z.number().int().nonnegative(),
  questions: z.array(
    z.object({
      prompt: z.string().min(1),
      type: z.enum(["multiple_choice", "multiple_select", "true_false", "short_answer", "long_answer", "matching", "fill_blank"]),
      points: z.number().int().positive(),
      answers: z.array(z.object({ body: z.string(), isCorrect: z.boolean().default(false) })).default([])
    })
  )
});

const demoQuizzes = [
  { id: "book-sprint", title: "Book Sprint Quiz", type: "Book", questions: 20, durationMinutes: 15, points: 250, status: "live" },
  { id: "topik-builder", title: "TOPIK Builder", type: "TOPIK", questions: 30, durationMinutes: 25, points: 400, status: "scheduled" },
  { id: "cyber-basics", title: "Cybersecurity Basics", type: "Cybersecurity", questions: 18, durationMinutes: 12, points: 220, status: "draft" }
];

quizzesRouter.get("/", (_req, res) => {
  res.json({ data: demoQuizzes });
});

quizzesRouter.post("/", requireAuth, requireRole(["admin", "super_admin"]), (req, res) => {
  const parsed = quizSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  res.status(201).json({ data: { id: randomUUID(), status: "draft", ...parsed.data } });
});

quizzesRouter.post("/:quizId/attempts", requireAuth, (req, res) => {
  res.status(201).json({
    data: {
      id: randomUUID(),
      quizId: req.params.quizId,
      userId: req.user?.id,
      status: "in_progress"
    }
  });
});

quizzesRouter.get("/:quizId/analytics", requireAuth, requireRole(["admin", "super_admin", "moderator"]), (req, res) => {
  res.json({
    data: {
      quizId: req.params.quizId,
      participants: 1284,
      averageScore: 78,
      completionRate: 91,
      mostMissedQuestions: ["Question 4", "Question 11", "Question 17"]
    }
  });
});

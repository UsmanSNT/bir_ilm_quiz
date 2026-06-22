import express from "express";

export const catalogRouter = express.Router();

catalogRouter.get("/books", (_req, res) => {
  res.json({
    data: [
      { id: "atomic-habits", title: "Atomic Habits", author: "James Clear", category: "Self-development", access: "request" },
      { id: "deep-work", title: "Deep Work", author: "Cal Newport", category: "Business", access: "members" }
    ]
  });
});

catalogRouter.get("/reviews", (_req, res) => {
  res.json({
    data: [
      { id: "review-1", bookId: "atomic-habits", rating: 4.8, tags: ["habits", "growth"], excerpt: "Small systems compound." }
    ]
  });
});

catalogRouter.get("/events", (_req, res) => {
  res.json({
    data: [
      { id: "weekly-discussion", title: "Weekly Book Discussion", kind: "Discussion", location: "Seoul + Telegram" }
    ]
  });
});

import type { EventSummary, Leader, QuizSummary, ReviewSummary } from "@bir-ilm/shared";

export const leaders: Leader[] = [
  {
    id: "founder",
    fullName: "BIR ILM Founder",
    position: "Founder",
    biography: "Builds the community vision, partnerships, and long-term reading culture.",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    socials: [{ label: "Telegram", url: "https://t.me/BirIlmBot" }]
  },
  {
    id: "president",
    fullName: "Community President",
    position: "President",
    biography: "Coordinates weekly discussions, member onboarding, and public programming.",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    socials: [{ label: "Instagram", url: "https://instagram.com" }]
  },
  {
    id: "quiz-lead",
    fullName: "Quiz Coordinator",
    position: "Book Club Coordinator",
    biography: "Designs book, language, TOPIK, IT, and cybersecurity quiz experiences.",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    socials: [{ label: "LinkedIn", url: "https://linkedin.com" }]
  }
];

export const reviews: ReviewSummary[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    category: "Self-development",
    tags: ["habits", "discipline", "growth"],
    excerpt: "A practical map for turning small improvements into visible progress."
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    category: "Business",
    tags: ["focus", "study", "career"],
    excerpt: "A strong pick for students balancing coursework, jobs, and community leadership."
  },
  {
    id: "psychology-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    category: "Psychology",
    tags: ["money", "behavior", "choices"],
    excerpt: "A friendly doorway into long-term thinking and financial decision-making."
  }
];

export const quizzes: QuizSummary[] = [
  { id: "book-sprint", title: "Book Sprint Quiz", type: "Book", questions: 20, durationMinutes: 15, points: 250, status: "live" },
  { id: "topik-builder", title: "TOPIK Builder", type: "TOPIK", questions: 30, durationMinutes: 25, points: 400, status: "scheduled" },
  { id: "cyber-basics", title: "Cybersecurity Basics", type: "Cybersecurity", questions: 18, durationMinutes: 12, points: 220, status: "draft" }
];

export const events: EventSummary[] = [
  { id: "weekly-discussion", title: "Weekly Book Discussion", date: "Saturday", location: "Seoul + Telegram", kind: "Discussion" },
  { id: "reading-challenge", title: "30-Day Reading Challenge", date: "Monthly", location: "Mini App", kind: "Challenge" },
  { id: "seminar", title: "Student Growth Seminar", date: "Quarterly", location: "Korea", kind: "Seminar" }
];

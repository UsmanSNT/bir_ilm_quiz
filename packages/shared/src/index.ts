export type Role = "super_admin" | "admin" | "moderator" | "member";

export type QuizType =
  | "Book"
  | "English"
  | "Korean"
  | "TOPIK"
  | "Cybersecurity"
  | "IT"
  | "Custom";

export type QuestionType =
  | "multiple_choice"
  | "multiple_select"
  | "true_false"
  | "short_answer"
  | "long_answer"
  | "matching"
  | "fill_blank";

export type Leader = {
  id: string;
  fullName: string;
  position: string;
  biography: string;
  photoUrl: string;
  socials: Array<{ label: string; url: string }>;
};

export type ReviewSummary = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  category: string;
  tags: string[];
  excerpt: string;
};

export type QuizSummary = {
  id: string;
  title: string;
  type: QuizType;
  questions: number;
  durationMinutes: number;
  points: number;
  status: "draft" | "scheduled" | "live" | "published" | "archived";
};

export type EventSummary = {
  id: string;
  title: string;
  date: string;
  location: string;
  kind: "Discussion" | "Challenge" | "Competition" | "Workshop" | "Seminar";
};

export type ApiEnvelope<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

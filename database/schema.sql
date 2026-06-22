CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'moderator', 'member');
CREATE TYPE quiz_status AS ENUM ('draft', 'scheduled', 'live', 'published', 'archived');
CREATE TYPE question_type AS ENUM ('multiple_choice', 'multiple_select', 'true_false', 'short_answer', 'long_answer', 'matching', 'fill_blank');
CREATE TYPE event_kind AS ENUM ('discussion', 'challenge', 'competition', 'workshop', 'seminar');

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name user_role NOT NULL UNIQUE,
  description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key text NOT NULL UNIQUE,
  description text NOT NULL
);

CREATE TABLE role_permissions (
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  telegram_id bigint UNIQUE,
  username text,
  first_name text NOT NULL,
  last_name text,
  photo_url text,
  role_id uuid NOT NULL REFERENCES roles(id),
  xp integer NOT NULL DEFAULT 0 CHECK (xp >= 0),
  reading_streak integer NOT NULL DEFAULT 0 CHECK (reading_streak >= 0),
  quiz_streak integer NOT NULL DEFAULT 0 CHECK (quiz_streak >= 0),
  last_seen_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE books (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  author text NOT NULL,
  description text,
  cover_url text,
  pdf_url text,
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  download_permission text NOT NULL DEFAULT 'request',
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX books_search_idx ON books USING gin (to_tsvector('english', title || ' ' || author || ' ' || category));

CREATE TABLE reading_progress (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  progress_percent integer NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  last_read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, book_id)
);

CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  rating numeric(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  body text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE quizzes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  type text NOT NULL,
  status quiz_status NOT NULL DEFAULT 'draft',
  duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
  points integer NOT NULL DEFAULT 0 CHECK (points >= 0),
  scheduled_at timestamptz,
  published_at timestamptz,
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE questions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  type question_type NOT NULL,
  prompt text NOT NULL,
  explanation text,
  points integer NOT NULL DEFAULT 1 CHECK (points > 0),
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE answers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  body text NOT NULL,
  is_correct boolean NOT NULL DEFAULT false,
  match_key text,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE quiz_attempts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score numeric(5,2),
  earned_points integer NOT NULL DEFAULT 0,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  UNIQUE (quiz_id, user_id, started_at)
);

CREATE TABLE quiz_responses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  attempt_id uuid NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  answer_id uuid REFERENCES answers(id),
  free_text text,
  is_correct boolean,
  awarded_points integer NOT NULL DEFAULT 0
);

CREATE TABLE achievements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  xp_reward integer NOT NULL DEFAULT 0,
  badge_url text
);

CREATE TABLE user_achievements (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id uuid NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, achievement_id)
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  channel text NOT NULL DEFAULT 'telegram',
  title text NOT NULL,
  body text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}',
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  kind event_kind NOT NULL,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz,
  location text,
  telegram_link text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO roles (name, description) VALUES
  ('super_admin', 'Full platform control'),
  ('admin', 'Quiz and content administration'),
  ('moderator', 'Review and community moderation'),
  ('member', 'Community member access')
ON CONFLICT (name) DO NOTHING;

INSERT INTO permissions (key, description) VALUES
  ('quiz:create', 'Create quizzes'),
  ('quiz:publish', 'Publish quizzes'),
  ('quiz:moderate', 'Moderate quiz content'),
  ('review:moderate', 'Moderate reviews'),
  ('library:manage', 'Manage books and PDF permissions'),
  ('event:manage', 'Manage community events')
ON CONFLICT (key) DO NOTHING;

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  Edit3,
  Library,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  X
} from "lucide-react";
import { bootTelegramMiniApp, getTelegramApp } from "./telegram";
import { events, leaders, quizzes, reviews } from "./data";

const sections = ["Home", "Leadership", "Reviews", "Library", "Events", "BIR ILM QUIZ"] as const;
type Section = (typeof sections)[number];

export function App() {
  const [active, setActive] = useState<Section>("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    setIsTelegram(bootTelegramMiniApp());
  }, []);

  const filteredReviews = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return reviews;
    return reviews.filter((review) =>
      [review.title, review.author, review.category, ...review.tags].some((value) =>
        value.toLowerCase().includes(needle)
      )
    );
  }, [query]);

  const telegramUser = getTelegramApp()?.initDataUnsafe?.user;

  return (
    <div className="min-h-screen bg-paper text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button className="flex items-center gap-3" onClick={() => setActive("Home")}>
            <span className="grid h-10 w-10 place-items-center rounded bg-bir-green text-lg font-black text-white">BI</span>
            <span className="text-left">
              <span className="block text-base font-black tracking-wide text-ink">BIR ILM</span>
              <span className="block text-xs font-medium text-slate-500">Community Knowledge Hub</span>
            </span>
          </button>
          <nav className="hidden items-center gap-1 lg:flex">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActive(section)}
                className={`rounded px-3 py-2 text-sm font-semibold transition ${
                  active === section ? "bg-teal-50 text-bir-green" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            {isTelegram && (
              <span className="rounded bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                Telegram {telegramUser?.first_name ? `- ${telegramUser.first_name}` : "Mini App"}
              </span>
            )}
            <button className="inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-bold text-white">
              <MessageCircle size={16} /> Open Bot
            </button>
          </div>
          <button className="rounded p-2 lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Open menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActive(section);
                  setMenuOpen(false);
                }}
                className="block w-full rounded px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {section}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        {active === "Home" && <Home setActive={setActive} />}
        {active === "Leadership" && <Leadership />}
        {active === "Reviews" && <Reviews query={query} setQuery={setQuery} filteredReviews={filteredReviews} />}
        {active === "Library" && <LibraryPage />}
        {active === "Events" && <EventsPage />}
        {active === "BIR ILM QUIZ" && <QuizPage />}
      </main>
    </div>
  );
}

function Home({ setActive }: { setActive: (section: Section) => void }) {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded bg-teal-50 px-3 py-2 text-sm font-bold text-bir-green">
              <Sparkles size={16} /> Uzbek students in South Korea
            </span>
            <h1 className="text-4xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">BIR ILM</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              A modern educational and book club community for reading, critical thinking, discussion, and shared growth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setActive("BIR ILM QUIZ")} className="inline-flex items-center justify-center gap-2 rounded bg-bir-green px-5 py-3 font-bold text-white">
                Start Quiz <ChevronRight size={18} />
              </button>
              <button onClick={() => setActive("Library")} className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 px-5 py-3 font-bold text-ink">
                Explore Library <BookOpen size={18} />
              </button>
            </div>
          </div>
          <div className="grid min-h-[420px] grid-cols-2 gap-4">
            <img className="h-full w-full rounded object-cover" src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80" alt="Books and study table" />
            <div className="grid gap-4">
              <img className="h-full w-full rounded object-cover" src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80" alt="Student group discussion" />
              <div className="rounded bg-ink p-5 text-white">
                <p className="text-sm font-semibold text-teal-100">Community stats</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Stat value="1K+" label="Members" />
                  <Stat value="120+" label="Reviews" />
                  <Stat value="40+" label="Events" />
                  <Stat value="25K" label="Quiz points" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature icon={<BookOpen />} title="Read Together" text="Book clubs, reviews, reading progress, and monthly challenges." />
          <Feature icon={<Trophy />} title="Compete Kindly" text="Live quizzes, points, streaks, badges, and transparent rankings." />
          <Feature icon={<Users />} title="Grow Community" text="Events, reminders, seminars, and Telegram-first engagement." />
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <Statement title="Mission" text="Encourage reading, critical thinking, discussion, self-development, and knowledge sharing among students." />
          <Statement title="Vision" text="Become the central digital hub where the BIR ILM community learns, competes, reflects, and supports one another." />
        </div>
      </section>
    </>
  );
}

function Leadership() {
  return (
    <Page title="Leadership" subtitle="A transparent leadership directory for founders, coordinators, moderators, and book club organizers.">
      <div className="grid gap-5 md:grid-cols-3">
        {leaders.map((leader) => (
          <article key={leader.id} className="overflow-hidden rounded border border-slate-200 bg-white shadow-soft">
            <img className="h-64 w-full object-cover" src={leader.photoUrl} alt={leader.fullName} />
            <div className="p-5">
              <p className="text-sm font-bold text-bir-green">{leader.position}</p>
              <h2 className="mt-1 text-xl font-black text-ink">{leader.fullName}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{leader.biography}</p>
              <div className="mt-4 flex gap-2">
                {leader.socials.map((social) => (
                  <a key={social.label} className="rounded border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700" href={social.url}>
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}

function Reviews({
  query,
  setQuery,
  filteredReviews
}: {
  query: string;
  setQuery: (value: string) => void;
  filteredReviews: typeof reviews;
}) {
  return (
    <Page title="Book Reviews" subtitle="Member reviews with search, ratings, categories, and tags.">
      <label className="mb-6 flex items-center gap-3 rounded border border-slate-300 bg-white px-4 py-3">
        <Search size={18} className="text-slate-400" />
        <input className="w-full outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, author, category, or tag" />
      </label>
      <div className="grid gap-5 md:grid-cols-3">
        {filteredReviews.map((review) => (
          <article key={review.id} className="rounded border border-slate-200 bg-white p-4 shadow-soft">
            <img className="h-52 w-full rounded object-cover" src={review.coverUrl} alt={review.title} />
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">{review.category}</span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-ink"><Star size={15} className="fill-bir-gold text-bir-gold" /> {review.rating}</span>
            </div>
            <h2 className="mt-3 text-lg font-black text-ink">{review.title}</h2>
            <p className="text-sm font-medium text-slate-500">{review.author}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{review.excerpt}</p>
          </article>
        ))}
      </div>
    </Page>
  );
}

function LibraryPage() {
  return (
    <Page title="Book Library" subtitle="A digital catalog with PDF permissions, categories, downloads, and reading progress.">
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded border border-slate-200 bg-white">
          {reviews.map((book, index) => (
            <div key={book.id} className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 sm:grid-cols-[72px_1fr_auto] sm:items-center">
              <img className="h-24 w-20 rounded object-cover" src={book.coverUrl} alt={book.title} />
              <div>
                <p className="font-black text-ink">{book.title}</p>
                <p className="text-sm text-slate-500">{book.author} - {book.category}</p>
                <div className="mt-3 h-2 rounded bg-slate-100">
                  <div className="h-2 rounded bg-bir-green" style={{ width: `${35 + index * 22}%` }} />
                </div>
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded bg-slate-100 px-4 py-2 text-sm font-bold text-ink">
                <Download size={16} /> Request PDF
              </button>
            </div>
          ))}
        </div>
        <aside className="rounded border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-black text-ink">Categories</h2>
          {["Self-development", "Business", "Psychology", "Technology", "History", "Literature"].map((category) => (
            <button key={category} className="mt-3 flex w-full items-center justify-between rounded bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
              {category} <ChevronRight size={16} />
            </button>
          ))}
        </aside>
      </div>
    </Page>
  );
}

function EventsPage() {
  return (
    <Page title="Events" subtitle="Community programming for discussions, challenges, competitions, workshops, and seminars.">
      <div className="grid gap-5 md:grid-cols-3">
        {events.map((event) => (
          <article key={event.id} className="rounded border border-slate-200 bg-white p-5 shadow-soft">
            <CalendarDays className="text-bir-green" />
            <h2 className="mt-5 text-xl font-black text-ink">{event.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{event.kind} - {event.date}</p>
            <p className="mt-4 text-sm font-bold text-slate-700">{event.location}</p>
          </article>
        ))}
      </div>
    </Page>
  );
}

function QuizPage() {
  return (
    <Page title="BIR ILM QUIZ" subtitle="The dedicated quiz ecosystem for live contests, history, scoring, rankings, and admin creation.">
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <section className="rounded bg-ink p-6 text-white">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold text-teal-100">Live module</p>
                <h2 className="mt-2 text-3xl font-black">Join quiz, earn points, climb rankings.</h2>
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded bg-bir-gold px-5 py-3 font-black text-ink">
                Join Live Quiz <Trophy size={18} />
              </button>
            </div>
          </section>
          <div className="grid gap-4 md:grid-cols-3">
            <Metric icon={<Users />} label="Participants" value="1,284" />
            <Metric icon={<BarChart3 />} label="Average score" value="78%" />
            <Metric icon={<CheckCircle2 />} label="Completion" value="91%" />
          </div>
          <section className="rounded border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-black text-ink">Quiz catalog</h2>
            <div className="mt-4 grid gap-3">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="grid gap-4 rounded border border-slate-200 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="text-sm font-bold text-bir-green">{quiz.type} - {quiz.status}</p>
                    <h3 className="mt-1 font-black text-ink">{quiz.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{quiz.questions} questions - {quiz.durationMinutes} min - {quiz.points} XP</p>
                  </div>
                  <button className="rounded bg-teal-50 px-4 py-2 text-sm font-black text-bir-green">Open</button>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="grid gap-5">
          <section className="rounded border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-bir-blue" />
              <h2 className="text-lg font-black text-ink">Creator dashboard</h2>
            </div>
            {["Create quiz", "Edit quiz", "Duplicate quiz", "Schedule quiz", "Publish quiz"].map((item) => (
              <button key={item} className="mt-3 flex w-full items-center gap-3 rounded bg-slate-50 px-3 py-3 text-left text-sm font-bold text-slate-700">
                <Edit3 size={16} /> {item}
              </button>
            ))}
          </section>
          <section className="rounded border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-black text-ink">Gamification</h2>
            {["Experience points", "Badges", "Achievements", "Reading streaks", "Quiz streaks", "Leaderboards"].map((item) => (
              <p key={item} className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Award size={16} className="text-bir-gold" /> {item}
              </p>
            ))}
          </section>
          <section className="rounded border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-black text-ink">Bot notifications</h2>
            {["Quiz notifications", "Weekly reading reminders", "Event announcements", "Leaderboard updates"].map((item) => (
              <p key={item} className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Bell size={16} className="text-bir-green" /> {item}
              </p>
            ))}
          </section>
        </aside>
      </div>
    </Page>
  );
}

function Page({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-black">{value}</p>
      <p className="text-xs font-semibold text-slate-300">{label}</p>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-5 shadow-soft">
      <div className="text-bir-green">{icon}</div>
      <h2 className="mt-5 text-xl font-black text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </article>
  );
}

function Statement({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded border border-slate-200 p-6">
      <h2 className="text-2xl font-black text-ink">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </article>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-5">
      <div className="text-bir-green">{icon}</div>
      <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-black text-ink">{value}</p>
    </article>
  );
}

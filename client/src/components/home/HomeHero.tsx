import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Check, Mail, MessageSquare, FileText, CalendarCheck, Sparkles, Zap, BellRing, Database, Share2, BarChart3, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Chore = {
  id: string;
  chip: string;
  icon: React.ReactNode;
  said: string;
  steps: { label: string; text: string }[];
  toast: string;
  hours: number;
};

const CHORES: Chore[] = [
  {
    id: "invoices",
    chip: "Chasing invoices",
    icon: <Mail size={16} />,
    said: "I hate chasing people for payment.",
    steps: [
      { label: "When this happens", text: "An invoice is 7 days overdue" },
      { label: "AI does the legwork", text: "Writes a friendly reminder in your voice and sends it" },
      { label: "You get", text: "Paid faster, with nothing to chase by hand" },
    ],
    toast: "Payment reminder sent",
    hours: 4,
  },
  {
    id: "enquiries",
    chip: "New enquiries",
    icon: <MessageSquare size={16} />,
    said: "Leads go cold while I'm on the tools.",
    steps: [
      { label: "When this happens", text: "A new enquiry lands from your website or inbox" },
      { label: "AI does the legwork", text: "Replies in minutes and asks the right questions" },
      { label: "You get", text: "Qualified leads booked straight into your calendar" },
    ],
    toast: "Enquiry answered in 2 minutes",
    hours: 5,
  },
  {
    id: "quotes",
    chip: "Quote follow-ups",
    icon: <FileText size={16} />,
    said: "I send quotes and never hear back.",
    steps: [
      { label: "When this happens", text: "You send a quote" },
      { label: "AI does the legwork", text: "Follows up at day 2 and day 5, politely" },
      { label: "You get", text: "A shortlist of people who actually want to go ahead" },
    ],
    toast: "Quote follow-up sent",
    hours: 3,
  },
  {
    id: "bookings",
    chip: "Booking reminders",
    icon: <CalendarCheck size={16} />,
    said: "No-shows are costing me real money.",
    steps: [
      { label: "When this happens", text: "A booking is 24 hours away" },
      { label: "AI does the legwork", text: "Texts the client to confirm or reschedule" },
      { label: "You get", text: "Fewer no-shows, and gaps refilled quickly" },
    ],
    toast: "Booking confirmed by client",
    hours: 2,
  },
  {
    id: "database",
    chip: "Customer database",
    icon: <Database size={16} />,
    said: "My customer details are scattered everywhere.",
    steps: [
      { label: "When this happens", text: "A new customer or enquiry comes in from anywhere" },
      { label: "AI does the legwork", text: "Adds them to one clean database and fills in the details" },
      { label: "You get", text: "One up-to-date list, with no copy and paste" },
    ],
    toast: "Customer added to your database",
    hours: 3,
  },
  {
    id: "social",
    chip: "Social posting",
    icon: <Share2 size={16} />,
    said: "I never get time to post on social.",
    steps: [
      { label: "When this happens", text: "Once a week, or when you finish a job" },
      { label: "AI does the legwork", text: "Drafts posts in your voice for you to approve" },
      { label: "You get", text: "A steady social presence in minutes a week" },
    ],
    toast: "3 posts scheduled for this week",
    hours: 4,
  },
  {
    id: "reports",
    chip: "Weekly reports",
    icon: <BarChart3 size={16} />,
    said: "Pulling numbers together takes half my Friday.",
    steps: [
      { label: "When this happens", text: "Every Friday afternoon" },
      { label: "AI does the legwork", text: "Gathers sales, leads and jobs into one summary" },
      { label: "You get", text: "A plain-English report in your inbox" },
    ],
    toast: "Weekly report sent to your inbox",
    hours: 3,
  },
  {
    id: "onboarding",
    chip: "New client onboarding",
    icon: <UserPlus size={16} />,
    said: "Every new client means the same admin again.",
    steps: [
      { label: "When this happens", text: "A client says yes" },
      { label: "AI does the legwork", text: "Sends the welcome pack, forms and first booking link" },
      { label: "You get", text: "Clients set up properly, without you lifting a finger" },
    ],
    toast: "Welcome pack sent",
    hours: 3,
  },
];

const CYCLE_MS = 7500;
const STEP_ICONS = [Zap, Sparkles, Check];

function CountUp({ value, reduce }: { value: number; reduce: boolean }) {
  const [n, setN] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduce) { setN(value); return; }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / 700, 1);
      setN(Math.round(a + (value - a) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick); else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);
  return <>{n}</>;
}

export function HomeHero() {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [stepsShown, setStepsShown] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const chore = CHORES[active];

  useEffect(() => {
    if (reduce) { setStepsShown(3); return; }
    setStepsShown(0);
    const timers = [1, 2, 3].map((n) => setTimeout(() => setStepsShown(n), 550 * n));
    return () => timers.forEach(clearTimeout);
  }, [active, reduce]);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive((a) => (a + 1) % CHORES.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [auto]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    heroRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={onMove}
      className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28"
      style={{ ["--mx" as string]: "72%", ["--my" as string]: "35%" }}
    >
      {/* Backdrop: soft colour fields, a fading grid, and a cursor-following light */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F3EDFF] via-[#F8F5FF] to-white" />
      <div aria-hidden className="absolute -z-10 -top-40 -right-32 w-[640px] h-[640px] rounded-full bg-[#7C3AED]/20 blur-[120px]" />
      <div aria-hidden className="absolute -z-10 top-40 -left-40 w-[460px] h-[460px] rounded-full bg-indigo-400/15 blur-[110px]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at var(--mx) var(--my), rgba(124,58,237,0.14), transparent 34%), linear-gradient(rgba(30,16,56,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,16,56,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 44px 44px, 44px 44px",
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 grid lg:grid-cols-[1.02fr_1fr] gap-14 lg:gap-12 items-center">
        {/* LEFT */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-extrabold text-[2.75rem] sm:text-6xl lg:text-[4.1rem] leading-[1.04] tracking-[-0.035em] text-[#1E1038]">
            AI and automation for real businesses.
          </h1>
          <p className="mt-6 text-lg lg:text-[1.2rem] text-[#1E1038]/70 max-w-[34rem] leading-relaxed">
            OptimAI builds practical AI and automation systems for SMEs, startups, and everyday business owners, with no jargon and no lock-in contracts. Live in weeks, not months.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
            <Link href="/free-report">
              <Button className="h-13 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-base font-semibold px-7 py-6 rounded-xl shadow-lg shadow-purple-600/30 transition-all hover:-translate-y-0.5">
                Get your free report
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <Link href="/what-we-actually-do">
              <Button variant="outline" className="bg-white/70 border-[#1E1038]/15 text-[#1E1038] hover:bg-white text-base font-semibold px-7 py-6 rounded-xl">
                See how it works
              </Button>
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-2.5 text-sm font-medium text-[#1E1038]/75">
            {["No jargon", "No lock-in contracts", "Live in weeks, not months"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid place-items-center w-5 h-5 rounded-full bg-emerald-500 text-white">
                  <Check size={12} strokeWidth={3.5} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT: live preview */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative lg:pl-4"
        >
          <div className="relative rounded-[28px] bg-white ring-1 ring-[#1E1038]/10 shadow-[0_40px_90px_-30px_rgba(76,29,149,0.45)] overflow-hidden">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1038]/8 bg-[#FBFAFF]">
              <p className="text-sm font-semibold text-[#1E1038]">See it in action</p>
              <span className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Running
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-sm text-[#1E1038]/60">Pick a job you'd love to hand off</p>
              <div role="tablist" aria-label="Example jobs" className="mt-3 flex flex-wrap gap-2">
                {CHORES.map((c, i) => (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => { setAuto(false); setActive(i); }}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium border text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] ${
                      i === active
                        ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-md shadow-purple-600/25"
                        : "bg-white border-[#1E1038]/12 text-[#1E1038]/75 hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/5"
                    }`}
                  >
                    <span className="shrink-0">{c.icon}</span>
                    {c.chip}
                  </button>
                ))}
              </div>

              <div className="mt-5 min-h-[2.75rem]" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={chore.id}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="inline-block rounded-2xl rounded-bl-md bg-[#1E1038] text-white px-4 py-2.5 text-sm"
                  >
                    “{chore.said}”
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* flow */}
              <ol className="relative mt-4">
                <span aria-hidden className="absolute left-[21px] top-8 bottom-8 w-px bg-[#7C3AED]/20" />
                {chore.steps.map((s, i) => {
                  const shown = stepsShown > i;
                  const Icon = STEP_ICONS[i];
                  const last = i === 2;
                  return (
                    <motion.li
                      key={`${chore.id}-${i}`}
                      initial={false}
                      animate={{ opacity: shown ? 1 : 0.3, y: shown ? 0 : 6 }}
                      transition={{ duration: reduce ? 0 : 0.35 }}
                      className="relative flex gap-4 items-center py-2.5"
                    >
                      <span
                        className={`relative z-10 grid place-items-center w-11 h-11 rounded-xl shrink-0 transition-colors duration-300 ${
                          shown && last ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                          : shown ? "bg-[#7C3AED] text-white shadow-md shadow-purple-600/25"
                          : "bg-[#1E1038]/8 text-[#1E1038]/35"
                        }`}
                      >
                        <Icon size={18} strokeWidth={last ? 3 : 2} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-[#7C3AED]">{s.label}</p>
                        <p className="text-[0.95rem] font-medium text-[#1E1038] leading-snug">{s.text}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>

            {/* result */}
            <div className="flex items-end justify-between gap-4 px-6 py-5 bg-gradient-to-r from-[#1E1038] to-[#3B1A7A] text-white">
              <div>
                <p className="text-xs text-white/60">Example result</p>
                <p className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold tabular-nums tracking-tight"><CountUp value={chore.hours} reduce={reduce} /></span>
                  <span className="text-sm text-white/75">hours a week back</span>
                </p>
              </div>
              <Link href="/free-report">
                <a className="text-sm font-semibold text-white bg-white/12 hover:bg-white/20 rounded-lg px-3.5 py-2 transition-colors whitespace-nowrap">
                  Find yours
                </a>
              </Link>
            </div>
          </div>

          {/* floating confirmation */}
          <AnimatePresence>
            {stepsShown >= 3 && (
              <motion.div
                key={chore.id + "toast"}
                initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="hidden sm:flex absolute left-8 -top-11 items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl shadow-purple-900/15 ring-1 ring-[#1E1038]/10"
              >
                <span className="grid place-items-center w-7 h-7 rounded-full bg-emerald-500 text-white"><BellRing size={14} /></span>
                <span className="text-xs font-semibold text-[#1E1038]">{chore.toast}<span className="block font-normal text-[#1E1038]/55">just now</span></span>
              </motion.div>
            )}
          </AnimatePresence>

          {auto && !reduce && (
            <div aria-hidden className="mt-4 mx-6 h-1 rounded-full bg-[#7C3AED]/10 overflow-hidden">
              <motion.div
                key={active}
                className="h-full bg-[#7C3AED]/60"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

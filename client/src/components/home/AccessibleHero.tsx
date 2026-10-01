import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Check, Clock, Mail, MessageSquare, FileText, CalendarCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Chore = {
  id: string;
  chip: string;
  icon: React.ReactNode;
  said: string;
  steps: { label: string; text: string }[];
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
      { label: "You get", text: "Paid faster, and nothing to chase by hand" },
    ],
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
    hours: 2,
  },
];

const CYCLE_MS = 7000;

export function AccessibleHero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [stepsShown, setStepsShown] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const chore = CHORES[active];

  // Build the flow one step at a time whenever the chore changes
  useEffect(() => {
    if (reduce) {
      setStepsShown(3);
      return;
    }
    setStepsShown(0);
    const timers = [1, 2, 3].map((n) => setTimeout(() => setStepsShown(n), 500 * n));
    return () => timers.forEach(clearTimeout);
  }, [active, reduce]);

  // Auto-cycle until the visitor takes over
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive((a) => (a + 1) % CHORES.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [auto]);

  // Soft light that follows the pointer
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
      style={{ ["--mx" as string]: "70%", ["--my" as string]: "30%" }}
    >
      {/* Backdrop: faint dot grid + a light that follows the cursor */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at var(--mx) var(--my), rgba(124,58,237,0.16), transparent 38%), radial-gradient(rgba(30,16,56,0.09) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 26px 26px",
        }}
      />

      <div className="container mx-auto px-4 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT: the promise */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-extrabold text-[2.6rem] sm:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-tight text-[#1E1038]">
            We make AI and automation accessible.
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-[#1E1038]/70 max-w-xl leading-relaxed">
            OptimAI builds practical AI and automation systems for SMEs, startups, and everyday business owners, with no jargon and no lock-in contracts. Live in weeks, not months.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/free-audit">
              <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-base px-7 py-6 rounded-xl shadow-lg shadow-purple-600/25">
                Get your free audit
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <Link href="/what-we-actually-do">
              <Button variant="outline" className="border-[#7C3AED]/40 text-[#1E1038] hover:bg-[#7C3AED]/10 text-base px-7 py-6 rounded-xl">
                See how it works
              </Button>
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#1E1038]/70">
            {["No jargon", "No lock-in contracts", "Live in weeks, not months"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid place-items-center w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600">
                  <Check size={12} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT: live demo */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-[#7C3AED]/20 shadow-2xl shadow-purple-900/10 p-5 sm:p-7">
            <p className="text-sm font-semibold text-[#1E1038]">Pick a job you'd love to hand off</p>

            <div role="tablist" aria-label="Example jobs" className="mt-3 flex flex-wrap gap-2">
              {CHORES.map((c, i) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => {
                    setAuto(false);
                    setActive(i);
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] ${
                    i === active
                      ? "bg-[#7C3AED] border-[#7C3AED] text-white"
                      : "bg-white border-[#1E1038]/15 text-[#1E1038]/75 hover:border-[#7C3AED]/50"
                  }`}
                >
                  {c.icon}
                  {c.chip}
                </button>
              ))}
            </div>

            {/* What the owner says */}
            <div className="mt-5 min-h-[3.25rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={chore.id}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block rounded-2xl rounded-bl-sm bg-[#1E1038] text-white px-4 py-3 text-sm sm:text-base"
                >
                  “{chore.said}”
                </motion.p>
              </AnimatePresence>
            </div>

            {/* The flow that draws itself */}
            <ol className="relative mt-4 space-y-3">
              <span aria-hidden className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-[#7C3AED]/15" />
              <motion.span
                aria-hidden
                key={`line-${chore.id}`}
                className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-[#7C3AED] origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: stepsShown >= 3 ? 1 : stepsShown >= 2 ? 0.55 : stepsShown >= 1 ? 0.1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
              />
              {chore.steps.map((s, i) => {
                const shown = stepsShown > i;
                const isDone = i === 2;
                return (
                  <motion.li
                    key={`${chore.id}-${i}`}
                    initial={false}
                    animate={{ opacity: shown ? 1 : 0.25, x: shown ? 0 : 8 }}
                    transition={{ duration: reduce ? 0 : 0.35 }}
                    className="relative flex gap-4 items-start"
                  >
                    <span
                      className={`relative z-10 grid place-items-center w-10 h-10 rounded-full shrink-0 border-2 transition-colors duration-300 ${
                        shown && isDone
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : shown
                          ? "bg-white border-[#7C3AED] text-[#7C3AED]"
                          : "bg-white border-[#1E1038]/15 text-[#1E1038]/30"
                      }`}
                    >
                      {isDone ? <Check size={18} strokeWidth={3} /> : i === 1 ? <Sparkles size={16} /> : <Clock size={16} />}
                    </span>
                    <div className="pt-0.5">
                      <p className="text-xs font-semibold text-[#7C3AED]">{s.label}</p>
                      <p className="text-[0.95rem] font-medium text-[#1E1038] leading-snug">{s.text}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>

            <div className="mt-6 pt-4 border-t border-[#1E1038]/10 flex items-center justify-between gap-4">
              <p className="text-sm text-[#1E1038]/65">
                Example: roughly <span className="font-bold text-[#1E1038]">{chore.hours} hours a week</span> back
              </p>
              <Link href="/free-audit">
                <a className="text-sm font-semibold text-[#7C3AED] hover:underline underline-offset-4 whitespace-nowrap">
                  Find yours
                </a>
              </Link>
            </div>
          </div>

          {/* auto-cycle progress */}
          {auto && !reduce && (
            <div aria-hidden className="mt-3 h-1 rounded-full bg-[#7C3AED]/10 overflow-hidden">
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

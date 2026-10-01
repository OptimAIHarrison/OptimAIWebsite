import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS, CASE_STUDIES } from "@/const";
import { ArrowRight, ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import { ServiceFinderQuiz } from "@/components/ServiceFinderQuiz";
import { AccessibleHero } from "@/components/home/AccessibleHero";

const WHO_WE_HELP = [
  { who: "Trades and construction", pain: "Quotes, scheduling and follow-ups eat your evenings." },
  { who: "Clinics and allied health", pain: "Bookings, reminders and patient admin pile up at the front desk." },
  { who: "Retail and e-commerce", pain: "Orders, stock and customer emails never stop." },
  { who: "Hospitality", pain: "Enquiries, bookings and rosters live in five different places." },
  { who: "Professional services", pain: "Proposals, onboarding and reporting are all manual." },
  { who: "Startups", pain: "You need systems that grow with you, without hiring for each one." },
];

const HOW_IT_WORKS = [
  { title: "We have a chat", text: "A free audit. You tell us what eats your week, we point out what can be handed off and what it's worth. No obligation." },
  { title: "We build it", text: "We set up the system and connect it to the tools you already use. Most projects are live in weeks, not months." },
  { title: "You run it", text: "We train your team, hand it over, and stay on call. No lock-in contract, so you stay because it works." },
];

export default function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [caseStudyStart, setCaseStudyStart] = useState(0);
  const CASE_STUDIES_VISIBLE = 3;

  const showPrevCaseStudies = () => {
    setCaseStudyStart((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };
  const showNextCaseStudies = () => {
    setCaseStudyStart((prev) => (prev + 1) % CASE_STUDIES.length);
  };
  const visibleCaseStudies = Array.from({ length: CASE_STUDIES_VISIBLE }, (_, i) => CASE_STUDIES[(caseStudyStart + i) % CASE_STUDIES.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <AccessibleHero />

      {/* WHO WE HELP */}
      <section className="py-20 border-y border-[#1E1038]/10 bg-white/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E1038] max-w-2xl">
            Built for businesses that are too busy to become tech experts.
          </h2>
          <p className="mt-4 text-lg text-[#1E1038]/65 max-w-2xl">
            You run the business. We handle the AI and automation side, in plain English.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_WE_HELP.map((item) => (
              <div key={item.who} className="rounded-2xl bg-white border border-[#1E1038]/10 p-6">
                <h3 className="font-semibold text-[#1E1038]">{item.who}</h3>
                <p className="mt-2 text-sm text-[#1E1038]/65 leading-relaxed">{item.pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E1038]">Three steps, no surprises.</h2>
          <ol className="mt-10 grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title}>
                <span className="grid place-items-center w-10 h-10 rounded-full bg-[#7C3AED] text-white font-bold">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-[#1E1038]">{step.title}</h3>
                <p className="mt-2 text-[#1E1038]/65 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/free-audit">
              <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl px-6 py-5">
                Start with the free audit
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="border-[#7C3AED]/40 rounded-xl px-6 py-5">Browse everything we do</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── READY TO GO PRODUCTS ─────────────────────────────────────── */}
      <section className="py-20 border-b border-white/10 bg-gradient-to-b from-purple-600/5 to-transparent">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Need something sorted fast?
            </h2>
            <p className="text-foreground/65 text-lg max-w-2xl mx-auto">
              Fixed-price, ready-to-go setups for the most common jobs. You know the cost and the timeline before we start.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { name: "AI Chatbot Setup", desc: "Capture, qualify, and respond to leads 24/7, even while you sleep", timeline: "2–3 weeks", price: "$2,500" },
              { name: "CRM Build & Setup", desc: "Organise every lead and automate your sales process from first contact to close", timeline: "3–4 weeks", price: "$3,500" },
              { name: "Full Stack Business Setup", desc: "Every core system connected and automated, so your whole business runs efficiently", timeline: "4–6 weeks", price: "$5,500" },
            ].map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-white/5 border-2 border-purple-900/20 hover:border-purple-500/40 transition-all"
              >
                <h3 className="font-bold text-foreground mb-1.5">{product.name}</h3>
                <p className="text-sm text-foreground/60 mb-4">{product.desc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/50">{product.timeline}</span>
                  <span className="font-bold text-purple-600">{product.price} AUD</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button variant="outline" className="border-purple-400/50 hover:bg-purple-500/10">
                Browse All 20 Products
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE FINDER QUIZ ──────────────────────────────────────── */}
      <ServiceFinderQuiz />

      {/* ── CASE STUDIES ─────────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              What our clients got
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Real businesses, real before-and-after numbers.</p>
          </motion.div>

          <div className="relative flex items-center gap-3 sm:gap-4">
            {/* Left arrow */}
            <button
              onClick={showPrevCaseStudies}
              aria-label="Previous case studies"
              className="hidden sm:flex flex-shrink-0 items-center justify-center w-11 h-11 rounded-full border-2 border-purple-400/30 text-purple-500 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {visibleCaseStudies.map((study, index) => (
                  <motion.div
                    key={`${caseStudyStart}-${index}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className={`p-6 rounded-2xl bg-white/5 border-2 border-purple-900/20 hover:border-purple-500/40 transition-all flex flex-col ${
                      index === 0 ? "" : "hidden md:flex"
                    }`}
                  >
                    <span className="text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30 bg-purple-600/10 text-purple-400 w-fit mb-4">
                      {study.client}
                    </span>

                    <h3 className="text-lg font-bold mb-2 leading-snug">{study.title}</h3>
                    <p className="text-foreground/70 text-sm mb-5 flex-1">{study.punchline}</p>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                      <div>
                        <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {study.results.timeSaved}
                        </p>
                        <p className="text-foreground/50 text-xs">Time saved</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {study.results.costSavings}
                        </p>
                        <p className="text-foreground/50 text-xs">Cost savings</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right arrow */}
            <button
              onClick={showNextCaseStudies}
              aria-label="Next case studies"
              className="hidden sm:flex flex-shrink-0 items-center justify-center w-11 h-11 rounded-full border-2 border-purple-400/30 text-purple-500 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Mobile arrows + position dots */}
          <div className="flex sm:hidden items-center justify-center gap-6 mt-6">
            <button
              onClick={showPrevCaseStudies}
              aria-label="Previous case studies"
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-purple-400/30 text-purple-500 hover:bg-purple-500/10"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {CASE_STUDIES.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 rounded-full transition-all ${idx === caseStudyStart ? "bg-purple-600 w-6" : "bg-white/20 w-2"}`}
                />
              ))}
            </div>
            <button
              onClick={showNextCaseStudies}
              aria-label="Next case studies"
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-purple-400/30 text-purple-500 hover:bg-purple-500/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Desktop position dots */}
          <div className="hidden sm:flex justify-center gap-2 mt-8">
            {CASE_STUDIES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCaseStudyStart(idx)}
                aria-label={`Go to case study ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${idx === caseStudyStart ? "bg-purple-600 w-8" : "bg-white/20 w-2 hover:bg-white/40"}`}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/case-studies">
              <Button variant="outline" className="border-purple-400/50 hover:bg-purple-500/10">
                View All Case Studies
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              In their words
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-12 rounded-2xl bg-white/5 border-2 border-purple-900/20 text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <motion.p key={testimonialIndex} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-8 text-foreground">
              "{TESTIMONIALS[testimonialIndex].content}"
            </motion.p>
            <motion.div key={`author-${testimonialIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <User size={28} className="text-white" />
                </div>
              </div>
              <p className="font-bold text-lg">{TESTIMONIALS[testimonialIndex].name}</p>
              <p className="text-foreground/60">{TESTIMONIALS[testimonialIndex].role}</p>
            </motion.div>
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === testimonialIndex ? "bg-purple-600 w-8" : "bg-white/20 w-2 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#7C3AED] rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Not sure where to start? That's normal.
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Book a free audit. We'll show you what's worth automating, what it's worth to you, and how fast we can get it live. No jargon, no obligation, no lock-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-5 font-bold">
                  Get Your Free Audit
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white/50 text-white hover:bg-white/10 text-lg px-8 py-5">
                  Just say hello
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

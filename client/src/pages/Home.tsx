import { SEO } from "@/components/SEO";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS, CASE_STUDIES } from "@/const";
import { ArrowRight, ChevronLeft, ChevronRight, Star, User, Hammer, Stethoscope, ShoppingBag, UtensilsCrossed, Briefcase, Rocket, X, Check } from "lucide-react";
import { ServiceFinderQuiz } from "@/components/ServiceFinderQuiz";
import { HomeHero } from "@/components/home/HomeHero";

const WHO_WE_HELP = [
  { icon: Hammer, who: "Trades and construction", pain: "Quotes, scheduling and follow-ups eat your evenings." },
  { icon: Stethoscope, who: "Clinics and allied health", pain: "Bookings, reminders and patient admin pile up at the front desk." },
  { icon: ShoppingBag, who: "Retail and e-commerce", pain: "Orders, stock and customer emails never stop." },
  { icon: UtensilsCrossed, who: "Hospitality", pain: "Enquiries, bookings and rosters live in five different places." },
  { icon: Briefcase, who: "Professional services", pain: "Proposals, onboarding and reporting are all manual." },
  { icon: Rocket, who: "Startups", pain: "You need systems that grow with you, without hiring for each one." },
];

const USUAL_WAY = [
  "Months of planning before anything goes live",
  "Jargon-heavy proposals and slide decks",
  "Long contracts that lock you in",
  "A system only the builder understands",
];

const OUR_WAY = [
  "Live in weeks, not months",
  "Plain English from the first conversation",
  "No lock-in contracts, so you stay because it works",
  "Connected to the tools you already use, with your team trained to run it",
];

const HOW_IT_WORKS = [
  { title: "Tell us how you work", text: "Answer a few questions about what eats your week. We send you a free report showing where AI and automation can save you time, and what that's worth. No obligation." },
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
      <SEO
        title="OptimAI | AI and Automation for Real Businesses"
        description="Practical AI and automation for SMEs, startups and everyday business owners. No jargon, no lock-in contracts, live in weeks not months. Get your free report."
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "OptimAI",
          url: "https://optimai.com.au",
          email: "hello@optimai.com.au",
          description: "Practical AI and automation systems for SMEs, startups and everyday business owners.",
          address: { "@type": "PostalAddress", addressLocality: "Melbourne", addressRegion: "Victoria", addressCountry: "AU" },
          areaServed: "AU",
        }}
      />
      <Navigation />

      <HomeHero />

      {/* PRACTICAL: the usual way vs our way */}
      <section className="py-24 bg-white border-y border-[#1E1038]/10">
        <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E1038] max-w-2xl text-center md:text-left mx-auto md:mx-0">
            Practical AI, not a science project.
          </h2>
          <p className="mt-4 text-lg text-[#1E1038]/65 max-w-2xl text-center md:text-left mx-auto md:mx-0">
            You shouldn't need a tech team to use AI and automation. Here's how we keep it simple.
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-[#F4F2F8] border border-[#1E1038]/10 p-8">
              <p className="text-sm font-semibold text-[#1E1038]/50">The usual way</p>
              <ul className="mt-5 space-y-4">
                {USUAL_WAY.map((t) => (
                  <li key={t} className="flex gap-3 text-[#1E1038]/60">
                    <span className="mt-0.5 grid place-items-center w-6 h-6 shrink-0 rounded-full bg-[#1E1038]/10 text-[#1E1038]/50"><X size={14} strokeWidth={3} /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#1E1038] via-[#3B1A7A] to-[#8B1FA9] p-8 shadow-xl shadow-fuchsia-900/20">
              <p className="text-sm font-semibold text-white/60">The OptimAI way</p>
              <ul className="mt-5 space-y-4">
                {OUR_WAY.map((t) => (
                  <li key={t} className="flex gap-3 text-white">
                    <span className="mt-0.5 grid place-items-center w-6 h-6 shrink-0 rounded-full bg-emerald-500 text-white"><Check size={14} strokeWidth={3.5} /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="py-24 bg-[#F8F5FF]">
        <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E1038] max-w-2xl text-center md:text-left mx-auto md:mx-0">
            Built for businesses that are too busy to become tech experts.
          </h2>
          <p className="mt-4 text-lg text-[#1E1038]/65 max-w-2xl text-center md:text-left mx-auto md:mx-0">
            You run the business. We handle the AI and automation side, in plain English.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_WE_HELP.map((item) => (
              <div key={item.who} className="text-center sm:text-left rounded-2xl bg-white border border-[#1E1038]/10 p-6 shadow-[0_1px_2px_rgba(30,16,56,0.04)] transition-all hover:shadow-lg hover:shadow-purple-900/5 hover:border-[#7C3AED]/30">
                <span className="grid place-items-center w-11 h-11 mx-auto sm:mx-0 rounded-xl bg-brand-gradient text-white shadow-md shadow-fuchsia-600/20"><item.icon size={20} /></span>
                <h3 className="mt-4 font-semibold text-[#1E1038]">{item.who}</h3>
                <p className="mt-2 text-sm text-[#1E1038]/65 leading-relaxed">{item.pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E1038] text-center md:text-left">Three steps, no surprises.</h2>
          <ol className="relative mt-12 grid md:grid-cols-3 gap-10">
            <span aria-hidden className="hidden md:block absolute top-5 left-[8%] right-[8%] h-px bg-gradient-to-r from-[#7C3AED]/40 via-[#7C3AED]/20 to-[#7C3AED]/40" />
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="text-center md:text-left">
                <span className="relative grid place-items-center w-10 h-10 mx-auto md:mx-0 rounded-full bg-brand-gradient text-white font-bold ring-8 ring-white shadow-md shadow-fuchsia-600/30">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-[#1E1038]">{step.title}</h3>
                <p className="mt-2 text-[#1E1038]/65 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
            <Link href="/free-report">
              <Button className="bg-brand-gradient hover:brightness-110 text-white rounded-xl px-6 py-5">
                Start with the free report
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
      <section className="py-24 bg-[#F8F5FF]">
        <div className="container mx-auto px-6 sm:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#1E1038]">
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
                className="p-5 rounded-2xl bg-white border border-[#1E1038]/10 shadow-sm hover:border-[#7C3AED]/40 hover:shadow-lg hover:shadow-purple-900/5 transition-all"
              >
                <h3 className="font-bold text-foreground mb-1.5">{product.name}</h3>
                <p className="text-sm text-foreground/60 mb-4">{product.desc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/50">{product.timeline}</span>
                  <span className="font-bold text-brand-gradient">{product.price} AUD</span>
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#1E1038]">
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
                    className={`p-6 rounded-2xl bg-white border border-[#1E1038]/10 shadow-sm hover:border-[#7C3AED]/40 hover:shadow-lg hover:shadow-purple-900/5 transition-all flex flex-col ${
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
                        <p className="text-lg font-bold bg-[#7C3AED] bg-clip-text text-transparent">
                          {study.results.timeSaved}
                        </p>
                        <p className="text-foreground/50 text-xs">Time saved</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold bg-[#7C3AED] bg-clip-text text-transparent">
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
                  className={`h-2 rounded-full transition-all ${idx === caseStudyStart ? "bg-brand-gradient w-6" : "bg-white/20 w-2"}`}
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
                className={`h-2 rounded-full transition-all ${idx === caseStudyStart ? "bg-brand-gradient w-8" : "bg-white/20 w-2 hover:bg-white/40"}`}
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#1E1038]">
              In their words
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-12 rounded-2xl bg-white border border-[#1E1038]/10 shadow-sm text-center"
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
                <div className="w-14 h-14 rounded-full bg-[#7C3AED] flex items-center justify-center">
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
                  className={`h-2 rounded-full transition-all ${index === testimonialIndex ? "bg-brand-gradient w-8" : "bg-white/20 w-2 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6 sm:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-br from-[#1E1038] via-[#3B1A7A] to-[#8B1FA9] rounded-3xl p-12 md:p-16 text-center shadow-2xl shadow-purple-900/30"
          >
            <span aria-hidden className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-[#E10BD6]/40 blur-[90px]" />
            <h2 className="relative text-3xl lg:text-4xl font-bold text-white mb-4">
              Not sure where to start? That's normal.
            </h2>
            <p className="relative text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Get your free report. It shows where AI and automation can save you time, what that's worth to you, and how fast we can get it live. No jargon, no obligation, no lock-in.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-report">
                <Button className="bg-white text-[#3B1A7A] hover:bg-white/90 text-lg px-8 py-5 font-bold">
                  Get Your Free Report
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white text-lg px-8 py-5">
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

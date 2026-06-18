import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SERVICES, TESTIMONIALS, CASE_STUDIES } from "@/const";
import { ArrowRight, Star, Target, TrendingUp, Settings, Cpu, Shield, Search, User, CheckCircle, Zap, Package, Wrench, Sprout } from "lucide-react";
import { ServiceFinderQuiz } from "@/components/ServiceFinderQuiz";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  target: <Target size={28} className="text-purple-500" />,
  "trending-up": <TrendingUp size={28} className="text-purple-500" />,
  settings: <Settings size={28} className="text-purple-500" />,
  cpu: <Cpu size={28} className="text-purple-500" />,
  shield: <Shield size={28} className="text-purple-500" />,
  search: <Search size={28} className="text-purple-500" />,
};

const WHAT_WE_DO = [
  {
    icon: <Search size={24} className="text-purple-500" />,
    label: "Just starting out",
    title: "Audit & Roadmap",
    description: "OptimAI maps your business, finds the hours being wasted, and hands you a clear plan. Zero obligation to go further.",
  },
  {
    icon: <Wrench size={24} className="text-purple-500" />,
    label: "Got a specific problem",
    title: "Fix One Thing",
    description: "You know what's broken. OptimAI fixes it fast, one workflow, one integration, done properly.",
  },
  {
    icon: <Zap size={24} className="text-purple-500" />,
    label: "Ready to build",
    title: "Build Something New",
    description: "A CRM, onboarding flow, chatbot, dashboard. OptimAI scopes it, builds it, hands it over ready to run.",
  },
  {
    icon: <Sprout size={24} className="text-purple-500" />,
    label: "Growing fast",
    title: "Scale What's Working",
    description: "You've got traction. OptimAI builds the systems to keep up, without adding headcount for every new thing.",
  },
];

export default function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);
  const TICKER_WORDS = ["processes", "marketing", "workflows", "outreach", "admin", "social posting", "email campaigns", "quoting", "onboarding", "follow-ups",  "invoicing", "scheduling", "proposals", "reporting", "nurturing", "client updates", "business"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ticker = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % 17);
    }, 2000);
    return () => clearInterval(ticker);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen pt-40 pb-20 overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663450259077/VZWvecVBL3bTuGctm3Rvj5/Screenshot2026-04-15at11.08.49am_b8405e5d.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/10 -z-10" />

        {/* Waves */}
        <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
          <motion.svg className="absolute top-0 left-0 w-full h-40 text-purple-600/50" viewBox="0 0 1200 120" preserveAspectRatio="none" animate={{ x: [0, 100, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
            <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="currentColor" opacity="0.5" />
          </motion.svg>
          <motion.svg className="absolute top-20 left-0 w-full h-40 text-pink-600/40" viewBox="0 0 1200 120" preserveAspectRatio="none" animate={{ x: [0, -100, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
            <path d="M0,70 Q300,30 600,70 T1200,70 L1200,120 L0,120 Z" fill="currentColor" opacity="0.4" />
          </motion.svg>
          <motion.svg className="absolute bottom-0 left-0 w-full h-48 text-purple-500/35" viewBox="0 0 1200 120" preserveAspectRatio="none" animate={{ x: [0, 80, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
            <path d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" fill="currentColor" opacity="0.35" />
          </motion.svg>
        </div>

        <motion.div
          className="container mx-auto px-4 w-full flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="backdrop-blur-2xl bg-white/30 border border-white/40 rounded-3xl p-8 md:p-16 lg:p-20 text-center max-w-5xl w-full shadow-2xl space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/50 text-foreground text-sm font-medium">
                AI & Automation for Real Businesses
              </span>

              <h1 className="font-bold flex flex-col items-center gap-1">
                <div className="text-4xl lg:text-5xl text-foreground font-bold">Automate the</div>
                <div className="relative flex justify-center items-center overflow-visible py-1">
                  <motion.div
                    key={tickerIndex}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap capitalize tracking-tight pb-1"
                  >
                    {TICKER_WORDS[tickerIndex]}
                  </motion.div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">Scale what matters</div>
              </h1>

              <p className="text-lg lg:text-xl text-foreground/70 max-w-xl mx-auto">
                OptimAI builds practical AI and automation systems for SMEs, startups, and everyday business owners. In weeks, not months.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-6 rounded-xl">
                  Get Your Free Audit
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/what-we-actually-do">
                <Button variant="outline" className="border-purple-500/50 hover:bg-purple-600/10 text-lg px-8 py-6 rounded-xl">
                  See How It Works
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex gap-4 sm:gap-8 pt-6 border-t border-white/20 justify-center flex-nowrap">
              <div>
                <p className="text-base sm:text-2xl font-bold text-purple-700">40+ Hours</p>
                <p className="text-foreground/60 text-xs sm:text-sm">Back. Every Month.</p>
              </div>
              <div>
                <p className="text-base sm:text-2xl font-bold text-purple-700">15 Days</p>
                <p className="text-foreground/60 text-xs sm:text-sm">To Measurable Impact</p>
              </div>
              <div>
                <p className="text-base sm:text-2xl font-bold text-purple-700">5 Stars</p>
                <p className="text-foreground/60 text-xs sm:text-sm">No Exceptions</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-white/10 bg-gradient-to-b from-purple-100/40 via-purple-50/20 to-transparent">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              Why we exist
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              AI is moving fast.<br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Most businesses are being left behind.</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-6">
              Enterprise companies are automating entire departments. SMEs, startups, and everyday business owners - tradies, clinics, agencies, retailers - are still doing everything manually. Not because they don't want to change, but because no one's made it accessible.
            </p>
            <p className="text-xl font-semibold text-foreground/90 max-w-2xl mx-auto">
              That's what OptimAI fixes. Practical AI and automation, built for the businesses that need it most.
            </p>
            <div className="mt-8">
              <Link href="/about">
                <Button variant="outline" className="border-purple-400/50 hover:bg-purple-500/10">
                  Our Story
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE ACTUALLY DO ──────────────────────────────────────── */}
      <section className="py-24 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Liquid glass container */}
            <div className="relative rounded-3xl overflow-hidden p-8 md:p-12"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(168,85,247,0.08) 50%, rgba(236,72,153,0.06) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(168,85,247,0.25)",
                boxShadow: "0 8px 32px rgba(168,85,247,0.12), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 30% 0%, rgba(168,85,247,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(236,72,153,0.08) 0%, transparent 60%)",
                }}
              />

              <div className="relative z-10">
                <div className="text-center mb-10">
                  <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                    We meet you <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">where you are</span>
                  </h2>
                  <p className="text-foreground/60 text-lg">You don't need to buy the whole package. Start with what makes sense right now.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {WHAT_WE_DO.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.07 }}
                      className="flex gap-4 p-5 rounded-2xl transition-all"
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(168,85,247,0.2)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div className="flex-shrink-0 p-2.5 rounded-xl h-fit"
                        style={{ background: "rgba(168,85,247,0.15)" }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">{item.label}</div>
                        <h3 className="text-lg font-bold text-foreground mb-1.5">{item.title}</h3>
                        <p className="text-foreground/65 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/what-we-actually-do">
                    <Button variant="outline" className="border-purple-400/50 hover:bg-purple-500/10 backdrop-blur-sm">
                      See the full picture
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CORE SERVICES (headings only) ────────────────────────────── */}
      <section className="py-20 border-b border-white/10 bg-gradient-to-b from-pink-50/10 via-purple-50/5 to-transparent">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Core Services</span>
            </h2>
            <p className="text-foreground/60 text-lg">Six specialised practices, strategy through to ongoing support.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
              >
                <Link href="/services">
                  <div className="group flex items-center gap-3 p-5 rounded-2xl bg-white/5 border-2 border-purple-900/20 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all cursor-pointer">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-purple-600/10 group-hover:bg-purple-600/20 transition-colors">
                      {SERVICE_ICONS[service.icon]}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm leading-snug group-hover:text-purple-600 transition-colors">{service.title}</h3>
                    </div>
                    <ArrowRight size={14} className="text-foreground/30 group-hover:text-purple-500 ml-auto flex-shrink-0 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Explore All Services
                <ArrowRight className="ml-2" size={16} />
              </Button>
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
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              <Package className="w-5 h-5 sm:w-4 sm:h-4" />
              Ready to Go Products
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Need something{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">deployed fast?</span>
            </h2>
            <p className="text-foreground/65 text-lg max-w-2xl mx-auto">
              Pre-scoped, fixed-price products built by OptimAI for common business needs. Pick one, we deploy it in days, not weeks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { name: "AI Chatbot Setup", desc: "Automate customer interactions 24/7", timeline: "2–3 weeks", price: "$2,500" },
              { name: "CRM Build & Setup", desc: "Organise leads and automate your sales workflow", timeline: "3–4 weeks", price: "$3,500" },
              { name: "Full Stack Business Setup", desc: "Everything you need to run your business efficiently", timeline: "4–6 weeks", price: "$5,500" },
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
              Client <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Real results from real businesses.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-8 rounded-2xl bg-white/5 border-2 border-purple-900/20 hover:border-purple-500/40 transition-all"
              >
                <h3 className="text-xl font-bold mb-1">{study.title}</h3>
                <p className="text-foreground/50 text-sm mb-6">{study.client}</p>
                <div className="space-y-4 mb-6 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-1">Challenge</p>
                    <p className="text-foreground/80 text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-foreground/80 text-sm">{study.solution}</p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-5 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  <p className="text-green-400 font-bold text-sm">{study.result}</p>
                </div>
              </motion.div>
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
              What Our Clients <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Say</span>
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
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to work with OptimAI?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Start with a free OptimAI audit. We'll map exactly what to automate, what it's worth, and how fast we can get it live.
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
                  Talk to the Team
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

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Hammer, TrendingUp, CheckCircle, Wrench, Sprout, Building2 } from "lucide-react";

const ENGAGEMENT_TYPES = [
  {
    icon: <Search size={28} className="text-purple-500" />,
    label: "Just starting out",
    title: "Audit & Roadmap",
    description: "Not sure where to begin? We map your business, find the bottlenecks, and hand you a clear plan — with zero obligation to take it further.",
    examples: ["Process audit", "Automation opportunity report", "Tool recommendations", "Priority roadmap"],
    cta: "Perfect if you want clarity before committing.",
  },
  {
    icon: <Wrench size={28} className="text-purple-500" />,
    label: "Got a specific problem",
    title: "Fix One Thing",
    description: "You know what's broken. We fix it. One workflow, one integration, one system — done properly, deployed fast.",
    examples: ["A leaking lead process", "A manual task eating hours", "Two tools that don't talk", "A follow-up that never happens"],
    cta: "Perfect if you have one clear pain point.",
  },
  {
    icon: <Hammer size={28} className="text-purple-500" />,
    label: "Ready to build",
    title: "Build Something New",
    description: "You want a proper system — a CRM, an onboarding flow, a reporting dashboard. We scope it, build it, and hand it over ready to run.",
    examples: ["CRM setup and automation", "Client onboarding system", "AI chatbot for your site", "Invoice and payment automation"],
    cta: "Perfect if you know what you want built.",
  },
  {
    icon: <Sprout size={28} className="text-purple-500" />,
    label: "Growing fast",
    title: "Scale What's Working",
    description: "You've got traction. Now you need systems that grow with you — without hiring more people for every new thing.",
    examples: ["Expand automations across teams", "Add analytics and reporting", "Integrate new tools as you grow", "Reduce manual load as volume increases"],
    cta: "Perfect if you're scaling and need to keep up.",
  },
  {
    icon: <Building2 size={28} className="text-purple-500" />,
    label: "Want the full picture",
    title: "Full Stack Transformation",
    description: "You're ready to go end-to-end — from strategy through to fully automated operations. We become your long-term automation partner.",
    examples: ["Full business process audit", "All systems connected and automated", "AI integrated across operations", "Ongoing support and optimisation"],
    cta: "Perfect if you want a long-term partner.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We listen first",
    description: "Every engagement starts the same way — we ask questions, understand your business, and figure out what actually matters. No assumptions, no templates.",
  },
  {
    step: "02",
    title: "We show you what's possible",
    description: "We map out exactly what we'd do, why, and what it's worth to you. You see the plan before you commit to anything.",
  },
  {
    step: "03",
    title: "We build it with you",
    description: "You're involved throughout. Nothing is hidden in a black box. You understand what we're building and why — so your team can own it.",
  },
  {
    step: "04",
    title: "We hand it over properly",
    description: "Documentation, training, and a handover your team actually understands. You're not dependent on us forever — unless you want to be.",
  },
];

const PRINCIPLES = [
  "No lock-in contracts",
  "Plain English, always",
  "You own everything we build",
  "We tell you if something isn't worth doing",
  "Results before complexity",
  "Your team learns alongside you",
];

export default function WhatWeActuallyDo() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              No jargon. No fluff.
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              What we{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                actually do
              </span>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              We help businesses automate the work that shouldn't need a human — so you and your team can focus on the work that does.
            </p>
            <p className="text-lg text-foreground/60 mt-4">
              You don't need to buy the whole package. We work with you at whatever stage makes sense.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Engagement Types */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">We meet you where you are</h2>
            <p className="text-foreground/60 text-lg">Pick the one that sounds like you right now.</p>
          </motion.div>

          <div className="space-y-5">
            {ENGAGEMENT_TYPES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="p-6 lg:p-8 rounded-2xl bg-white/5 border-2 border-purple-900/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left */}
                  <div className="flex items-start gap-4 lg:w-80 flex-shrink-0">
                    <div className="p-3 rounded-xl bg-purple-600/10 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">{item.label}</div>
                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    </div>
                  </div>

                  {/* Middle */}
                  <div className="flex-1">
                    <p className="text-foreground/75 leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.examples.map((ex, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 bg-purple-600/10 text-purple-700 font-medium rounded-full ring-1 ring-purple-400/20">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="lg:w-56 flex-shrink-0">
                    <p className="text-sm text-foreground/50 italic leading-snug">{item.cta}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How every engagement works</h2>
            <p className="text-foreground/60 text-lg">Regardless of where you start, the approach is the same.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HOW_IT_WORKS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex gap-5 p-6 rounded-2xl bg-white/5 border-2 border-purple-900/20"
              >
                <div className="text-3xl font-bold text-purple-500/30 flex-shrink-0 leading-none mt-1">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/65 leading-relaxed text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our non-negotiables</h2>
            <p className="text-foreground/60 text-lg">Things that are true regardless of project size or scope.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-purple-900/20"
              >
                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                <span className="text-foreground/80 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Not sure which stage you're at?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Start with a free audit. We'll work it out together — no pressure, no sales pitch, just an honest conversation about what makes sense for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-5 font-bold">
                  Get Your Free Audit
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border-white/50 text-white hover:bg-white/10 text-lg px-8 py-5">
                  Explore Our Services
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

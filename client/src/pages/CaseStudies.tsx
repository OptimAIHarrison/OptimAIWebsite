import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES } from "@/const";
import { ArrowRight, ChevronDown, Clock, DollarSign, TrendingUp, CheckCircle, ArrowUpRight } from "lucide-react";
import { SEO } from "@/components/SEO";

const CATEGORY_COLORS = [
  "from-purple-600 to-indigo-600",
  "from-pink-600 to-purple-600",
  "from-indigo-600 to-cyan-600",
];

const CATEGORY_BG = [
  "bg-purple-600/10 border-purple-500/30",
  "bg-pink-600/10 border-pink-500/30",
  "bg-indigo-600/10 border-indigo-500/30",
];

export default function CaseStudies() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const totals = {
    timeSaved: "67 hrs/week",
    costSavings: "$27,500/month",
    avgProductivity: "+117%",
  };

  const categories = ["All", ...Array.from(new Set(CASE_STUDIES.map((s) => s.client)))];
  const filteredStudies =
    activeFilter === "All" ? CASE_STUDIES : CASE_STUDIES.filter((s) => s.client === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO
        title="Client Success Stories — Real AI Automation Results | OptimAI"
        description="See exactly what OptimAI built for real clients, what changed, and what it was worth. 67+ hours saved per week, $27,500/month in cost savings, +117% avg productivity gain across all case studies."
        canonical="/case-studies"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "OptimAI Client Case Studies",
          "description": "Real AI and automation results delivered by OptimAI for SMEs, startups and business owners across Australia.",
          "itemListElement": CASE_STUDIES.map((study, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": study.title,
            "description": study.result
          }))
        }}
      />

      {/* Hero */}
      <section className="pt-40 pb-10 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              Real clients. Real numbers.
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Client Success{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              No fluff, no vague claims. Here's exactly what we built, what changed, and what it was worth.
            </p>
          </motion.div>

          {/* Aggregate stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="grid grid-cols-3 gap-3 mt-12 max-w-3xl mx-auto"
          >
            {[
              { icon: <Clock size={20} />, value: totals.timeSaved, label: "Combined time saved" },
              { icon: <DollarSign size={20} />, value: totals.costSavings, label: "Combined cost savings" },
              { icon: <TrendingUp size={20} />, value: totals.avgProductivity, label: "Avg productivity gain" },
            ].map((stat, idx) => (
              <div key={idx} className="px-4 py-5 rounded-2xl bg-white/60 border-2 border-purple-200/60 backdrop-blur-sm">
                <div className="text-purple-600 flex justify-center mb-2">{stat.icon}</div>
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                  {stat.value}
                </div>
                <div className="text-xs text-foreground/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter tags */}
      <section className="pt-12 pb-2">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-full border transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent"
                      : "bg-white/5 text-foreground/60 border-purple-900/20 hover:border-purple-500/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl space-y-4">
          {filteredStudies.map((study) => {
            const index = CASE_STUDIES.indexOf(study);
            const isOpen = expanded === study.title;
            const gradient = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
            const bgColor = CATEGORY_BG[index % CATEGORY_BG.length];

            return (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-purple-500/50 shadow-lg shadow-purple-600/10" : "border-purple-900/20 hover:border-purple-500/30"
                }`}
              >
                {/* Card Header — always visible */}
                <button
                  onClick={() => setExpanded(isOpen ? null : study.title)}
                  className="w-full text-left p-8 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      {/* Label + client */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${bgColor}`}>
                          {study.client}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-2">{study.title}</h3>
                      <p className="text-foreground/60">{study.description}</p>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <ChevronDown size={22} className="text-purple-500" />
                    </motion.div>
                  </div>

                  {/* Key metrics row */}
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                    <div>
                      <p className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {study.results.timeSaved}
                      </p>
                      <p className="text-foreground/50 text-xs mt-0.5">Time Saved</p>
                    </div>
                    <div>
                      <p className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {study.results.costSavings}
                      </p>
                      <p className="text-foreground/50 text-xs mt-0.5">Cost Savings</p>
                    </div>
                    <div>
                      <p className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                        {study.results.productivityGain}
                      </p>
                      <p className="text-foreground/50 text-xs mt-0.5">Productivity</p>
                    </div>
                  </div>
                </button>

                {/* Expandable detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 p-8 space-y-8 bg-white/[0.02]">
                        {/* Challenge + Solution */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-5 rounded-xl bg-red-500/5 border border-red-400/15">
                            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">The Challenge</p>
                            <p className="text-foreground/80 leading-relaxed">{study.challenge}</p>
                          </div>
                          <div className="p-5 rounded-xl bg-green-500/5 border border-green-400/15">
                            <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3">The Solution</p>
                            <p className="text-foreground/80 leading-relaxed">{study.solution}</p>
                          </div>
                        </div>

                        {/* Before / After metrics */}
                        <div>
                          <p className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-4">Before vs After</p>
                          <div className="space-y-3">
                            {study.metrics.map((metric, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-purple-900/20"
                              >
                                <p className="text-foreground/80 font-medium">{metric.label}</p>
                                <div className="flex items-center gap-3 text-sm">
                                  <span className="text-foreground/40 line-through">{metric.before}</span>
                                  <ArrowRight size={14} className="text-foreground/30 flex-shrink-0" />
                                  <span className={`font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                                    {metric.after}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Result callout */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-600/10 border border-purple-500/20">
                          <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-foreground/80 font-medium">{study.result}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 max-w-3xl mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to be the next one?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Start with a free audit. We'll show you exactly what's possible for your business — with real numbers, not estimates.
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

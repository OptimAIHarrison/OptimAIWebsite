import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, DollarSign, Zap, Users, Shield, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { SEO } from "@/components/SEO";

const PAIN_POINTS = [
  "Spending hours on tasks that should take minutes",
  "Missing leads because no one followed up fast enough",
  "Your team doing the same manual work every single day",
  "Paying for tools that don't talk to each other",
  "Guessing on decisions instead of using your own data",
  "Falling behind competitors who've already automated",
];

const OUTCOMES = [
  { stat: "40+", label: "Hours saved per client, per month", icon: <Clock size={24} /> },
  { stat: "15", label: "Days to first measurable results", icon: <Zap size={24} /> },
  { stat: "5★", label: "Rated by every single client", icon: <TrendingUp size={24} /> },
  { stat: "100%", label: "Of clients see ROI within 90 days", icon: <DollarSign size={24} /> },
];

const DIFFERENTIATORS = [
  {
    title: "We don't sell software. We solve problems.",
    description: "Most agencies push a tool and leave. We map your actual business, find the bottlenecks costing you time and money, then build solutions around your workflow — not the other way around.",
  },
  {
    title: "You're live in 15 days, not 6 months.",
    description: "Enterprise consultants bill you for 3-month discovery phases. We move fast — most clients have their first automation running within two weeks of our first call.",
  },
  {
    title: "Plain English, no BS.",
    description: "We don't hide behind jargon to justify our fees. You'll always know exactly what we're building, why we're building it, and what it's saving you.",
  },
  {
    title: "When needed, we're there.",
    description: "Your automations can be monitored, maintained, and improved on an on-going basis. If that is what you need. If you tools update API's and breaks your workflow, we can fix it.",
  },
  {
    title: "Tailored to your size, not a corporate template.",
    description: "Whether you're a solo operator or a 200-person team, you get a solution that fits your budget, your tools, and your goals — not a one-size-fits-all package.",
  },
  {
    title: "Your team actually adopts it.",
    description: "We've seen too many automation projects fail because the team didn't buy in. We train your people, document everything, and make sure the tools get used.",
  },
];

const VERSUS = [
  { label: "Time to first results", them: "3–6 months", us: "15 days" },
  { label: "Contracts required", them: "12-month lock-in", us: "No lock-in" },
  { label: "Communication", them: "Weekly status reports", us: "Direct access, always" },
  { label: "Setup approach", them: "Generic template", us: "Built for your business" },
  { label: "Pricing", them: "Enterprise rates", us: "SME-friendly pricing" },
];

export default function WhyOptimAI() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO
        title="Why Choose OptimAI? Results in 15 Days, No Lock-In, SME-Friendly Pricing"
        description="OptimAI delivers first results in 15 days, saves clients 40+ hours per month, and has a 5-star rating across every client. See how we compare to typical agencies — no lock-in contracts, direct access, built for your business."
        canonical="/why-optimai"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Why choose OptimAI over other automation agencies?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "OptimAI delivers first results in 15 days (not 6 months), has no lock-in contracts, charges SME-friendly pricing, and provides direct access to the team — not junior account managers. 100% of clients see ROI within 90 days."
              }
            },
            {
              "@type": "Question",
              "name": "How quickly does OptimAI get results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most OptimAI clients have their first automation live within 15 days of the first call. We prioritise high-impact quick wins before long-term projects."
              }
            },
            {
              "@type": "Question",
              "name": "Does OptimAI require long-term contracts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. OptimAI has no lock-in contracts. You can start with a single project and scale from there."
              }
            }
          ]
        }}
      />

      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              The honest answer
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Why <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">OptimAI?</span>
            </h1>
            <p className="text-xl lg:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Because you're losing hours every week to work that shouldn't exist — and that's fixable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Sound familiar?</h2>
            <p className="text-foreground/60 text-lg">If you're nodding at any of these, you're in the right place.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAIN_POINTS.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-400/20"
              >
                <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">{point}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10 text-foreground/60 text-lg"
          >
            These aren't signs of a broken business — they're signs of a business that's ready to scale.
            <span className="text-purple-600 font-semibold"> That's exactly what we fix.</span>
          </motion.p>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What our clients actually get</h2>
            <p className="text-foreground/60 text-lg">Not promises. Numbers from real projects.</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {OUTCOMES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/5 border-2 border-purple-500/20 hover:border-purple-500/50 transition-all"
              >
                <div className="text-purple-500 flex justify-center mb-3">{item.icon}</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {item.stat}
                </div>
                <p className="text-sm text-foreground/60 leading-snug">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Differentiators */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What makes us different</h2>
            <p className="text-foreground/60 text-lg">The six things we hear from every client who's worked with others first.</p>
          </motion.div>

          <div className="space-y-5">
            {DIFFERENTIATORS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="flex gap-5 p-6 rounded-2xl bg-white/5 border-2 border-purple-900/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/65 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Us vs Them */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">OptimAI vs the rest</h2>
            <p className="text-foreground/60 text-lg">We'll let the comparison do the talking.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border-2 border-purple-500/30"
          >
            {/* Header */}
            <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
              <div className="p-4 text-sm font-semibold text-foreground/50 uppercase tracking-wider"></div>
              <div className="p-4 text-center text-sm font-semibold text-foreground/50 uppercase tracking-wider border-l border-white/10">
                Typical Agency
              </div>
              <div className="p-4 text-center text-sm font-bold text-purple-600 uppercase tracking-wider border-l border-purple-500/30 bg-purple-600/5">
                OptimAI
              </div>
            </div>

            {VERSUS.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-3 border-b border-white/10 last:border-0 ${idx % 2 === 0 ? "" : "bg-white/[0.02]"}`}
              >
                <div className="p-4 text-sm font-medium text-foreground/70">{row.label}</div>
                <div className="p-4 text-center text-sm text-foreground/50 border-l border-white/10 flex items-center justify-center gap-2">
                  <XCircle size={15} className="text-red-400 flex-shrink-0" />
                  {row.them}
                </div>
                <div className="p-4 text-center text-sm font-semibold text-foreground border-l border-purple-500/20 bg-purple-600/5 flex items-center justify-center gap-2">
                  <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
                  {row.us}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Human element */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Users size={40} className="text-purple-500 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">We're a small team. That's the point.</h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-6">
              You won't get handed off to a junior account manager six weeks in. When you work with OptimAI, you're working directly with the people who build and maintain your automations.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              We're selective about who we take on because we only commit to work we can do exceptionally well. If we're not the right fit, we'll tell you — and point you in the right direction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Still not sure? Let's find out together.
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Book a free audit. We'll map your biggest time and money leaks, tell you exactly what we'd fix — and there's zero obligation to work with us.
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

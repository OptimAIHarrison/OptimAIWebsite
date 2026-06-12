import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Users, TrendingUp } from "lucide-react";
import { SEO } from "@/components/SEO";

const WHAT_WE_DO = [
  {
    icon: <Target size={24} className="text-purple-500" />,
    title: "We find what's costing you",
    description: "A free audit that maps every manual task, missed lead, and broken process in your business. Most clients find 10+ hours of waste in the first session.",
  },
  {
    icon: <Zap size={24} className="text-purple-500" />,
    title: "We build and deploy fast",
    description: "No 6-month roadmaps. We prioritise the highest-impact fixes first and get them live within weeks, so you see results before you've paid a fraction of what it saves.",
  },
  {
    icon: <Users size={24} className="text-purple-500" />,
    title: "We make your team capable",
    description: "Every system we build comes with training, documentation, and if needed, ongoing support. You own it. You understand it. You're not dependent on us forever.",
  },
  {
    icon: <TrendingUp size={24} className="text-purple-500" />,
    title: "We grow with you",
    description: "As your business scales, your systems scale. We continuously optimise and expand what's working, so automation compounds over time, not just on day one.",
  },
];

const TIMELINE = [
  {
    year: "The Problem",
    heading: "AI was moving fast. Everyone else was getting left behind.",
    body: "By 2026, the gap between businesses using AI and those that weren't had become impossible to ignore. Larger companies were automating entire departments. SMEs and startups were still doing everything manually, not because they didn't want to change, but because they had no idea where to start, who to trust, or what was actually worth the investment.",
  },
  {
    year: "The Gap",
    heading: "The advice out there was either too vague or too expensive.",
    body: "Enterprise consultants charged six figures for strategy decks. SaaS tools promised to solve everything but required technical knowledge most small teams didn't have. YouTube tutorials went in circles. And the AI hype made it worse, everyone was talking about potential, nobody was delivering practical results for the businesses that needed it most.",
  },
  {
    year: "The Decision",
    heading: "So we built OptimAI for the businesses being left out.",
    body: "OptimAI was founded on a simple belief: the productivity gains that AI and automation unlock shouldn't be reserved for companies with enterprise budgets. Startups and SMEs work harder, move faster, and have more to gain, they just need a practical partner who speaks plain English, works at their pace, and delivers results they can actually measure.",
  },
  {
    year: "Today",
    heading: "We're the team that makes it real.",
    body: "We work hands-on with founders, operators, and small teams to identify what to automate, build it properly, and make sure it sticks. No fluff, no jargon, no disappearing after go-live. Just genuine outcomes - hours reclaimed, leads captured, revenue protected.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO
        title="About OptimAI - Why We Built Australia's Practical AI Automation Agency"
        description="OptimAI was founded to make AI and automation accessible to SMEs, startups, tradies, and everyday business owners across Australia, not just enterprise companies. Learn our story."
        canonical="/about"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About OptimAI",
          "url": "https://optimai.com.au/about",
          "description": "OptimAI was founded to make AI and automation accessible to every business, not just the ones with enterprise budgets.",
          "publisher": {
            "@type": "Organization",
            "name": "OptimAI",
            "url": "https://optimai.com.au",
            "foundingLocation": "Melbourne, VIC, Australia",
            "areaServed": "AU",
            "description": "AI and automation agency helping SMEs, startups and everyday business owners across Australia."
          }
        }}
      />

      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              Our story
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              AI is moving fast.<br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                We help you keep up.
              </span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              OptimAI was built because SMEs and startups were being priced out of the AI revolution and that felt wrong.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Origin Story Timeline */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why OptimAI exists</h2>
            <p className="text-foreground/60 text-lg">The honest version, not the polished pitch.</p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600 hidden md:block" />

            <div className="space-y-10">
              {TIMELINE.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="md:pl-16 relative"
                >
                  {/* Dot */}
                  <div className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {idx + 1}
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border-2 border-purple-900/20 hover:border-purple-500/30 transition-all">
                    <div className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{item.heading}</h3>
                    <p className="text-foreground/70 leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Our mission, simply put</h2>
            <blockquote className="text-2xl lg:text-3xl font-bold text-foreground/90 leading-relaxed border-l-4 border-purple-500 pl-6 text-left mb-8">
              "Make the productivity gains of AI and automation accessible to every business, not just the ones with enterprise budgets."
            </blockquote>
            <p className="text-lg text-foreground/70 leading-relaxed mb-4">
              We don't believe in gatekeeping transformational technology. A 10-person agency or a 3-person startup deserves the same operational leverage as a 500-person corporate - they just need a partner who builds for their scale, their budget, and their reality.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              That's what we show up to do every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What we actually do</h2>
            <p className="text-foreground/60 text-lg">From the first conversation to long after go-live.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHAT_WE_DO.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex gap-4 p-6 rounded-2xl bg-white/5 border-2 border-purple-900/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-purple-600/10 h-fit">
                  {item.icon}
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

      {/* Who we're for */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">Who we're built for</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {[
                {
                  label: "Everyday Business Owners",
                  examples: "Tradies, hairdressers, clinics, real estate agents, cleaners, consultants, retailers",
                  desc: "You're great at what you do: the admin, follow-ups, and manual work are just getting in the way. We cut through the noise and build simple systems that give you your time back.",
                },
                {
                  label: "Startups",
                  examples: "Early-stage founders, product teams, solo operators with big ambitions",
                  desc: "Moving fast and need systems that scale without hiring a 10-person ops team. We help you build the infrastructure to grow without the growing pains.",
                },
                {
                  label: "SMEs",
                  examples: "10–200 person businesses ready to stop doing things manually",
                  desc: "You've got a proven model and a real team. Now it's time to stop repeating the same manual work and start compounding the results you've already earned.",
                },
                {
                  label: "Agencies & Service Providers",
                  examples: "Marketing agencies, law firms, accountants, coaches, recruiters",
                  desc: "Client-facing work is your product. We automate the backend - onboarding, reporting, follow-ups, admin - so you can deliver better work without burning out.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/5 border-2 border-purple-500/20"
                >
                  <div className="text-lg font-bold text-foreground mb-1">{item.label}</div>
                  <div className="text-xs text-purple-600 font-medium mb-3">{item.examples}</div>
                  <p className="text-sm text-foreground/65 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-foreground/60 text-lg">
              If you're a Fortune 500 looking for a 12-month engagement and a 200-page strategy deck -{" "}
              <span className="text-foreground/80 font-medium">we're probably not the right fit.</span>
              <br />
              If you're a business owner who just wants things to run better -{" "}
              <span className="text-purple-600 font-semibold">you're exactly who we built this for.</span>
            </p>
          </motion.div>
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
              Ready to see what's possible?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Start with a free audit. We'll show you exactly where automation fits in your business and what it would be worth.
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
                  See Our Services
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

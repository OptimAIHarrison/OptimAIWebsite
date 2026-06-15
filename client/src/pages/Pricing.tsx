import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, ChevronDown, Zap, Hammer, Wrench, TrendingUp, Building2, HelpCircle } from "lucide-react";
import { SEO } from "@/components/SEO";

// ─── Pricing Models ────────────────────────────────────────────────────────────

const ENGAGEMENT_MODELS = [
  {
    id: "audit",
    icon: <Zap size={28} className="text-purple-500" />,
    name: "Audit & Roadmap",
    tagline: "Start here if you're not sure where to begin",
    price: "Free",
    priceNote: "No obligation",
    description: "We map your business, identify every automation opportunity, and hand you a prioritised action plan — with no commitment to go further.",
    includes: [
      "60-minute discovery session",
      "Full business process audit",
      "Automation opportunity report",
      "ROI estimates per opportunity",
      "Prioritised implementation roadmap",
      "Tool and platform recommendations",
    ],
    cta: "Book Free Audit",
    ctaLink: "/free-audit",
    highlight: false,
    badge: null,
  },
  {
    id: "fix",
    icon: <Wrench size={28} className="text-purple-500" />,
    name: "Fix One Thing",
    tagline: "You know what's broken. We fix it fast.",
    price: "From $1,500",
    priceNote: "AUD, fixed price",
    description: "One workflow, one integration, one system — scoped, built, and deployed. Perfect for a specific pain point you need sorted quickly.",
    includes: [
      "Scoping session to define the problem",
      "Custom solution built for your business",
      "Full testing before go-live",
      "Deployment and handover",
      "Documentation and training",
      "30 days of post-launch support",
    ],
    cta: "Get a Quote",
    ctaLink: "/contact",
    highlight: false,
    badge: null,
  },
  {
    id: "build",
    icon: <Hammer size={28} className="text-purple-500" />,
    name: "Build Something New",
    tagline: "A proper system, built right and handed over ready to run",
    price: "From $2,500",
    priceNote: "AUD, fixed price",
    description: "A CRM, onboarding flow, AI chatbot, reporting dashboard — scoped properly, built to spec, tested, and yours.",
    includes: [
      "Full requirements and scoping",
      "Custom system design and build",
      "Integration with your existing tools",
      "Quality assurance and testing",
      "Deployment to your live environment",
      "Team training and documentation",
      "60 days of post-launch support",
    ],
    cta: "Start a Project",
    ctaLink: "/contact",
    highlight: true,
    badge: "Most Popular",
  },
  {
    id: "scale",
    icon: <TrendingUp size={28} className="text-purple-500" />,
    name: "Scale & Optimise",
    tagline: "Ongoing automation as your business grows",
    price: "From $1,200/mo",
    priceNote: "AUD, monthly retainer",
    description: "We become your ongoing automation partner — monitoring what's live, improving it, and adding new capabilities as your needs evolve.",
    includes: [
      "Monthly strategy and review calls",
      "Proactive monitoring of all automations",
      "Performance optimisation",
      "New automation builds included",
      "Priority support response",
      "Quarterly roadmap updates",
    ],
    cta: "Talk to Us",
    ctaLink: "/contact",
    highlight: false,
    badge: null,
  },
  {
    id: "transform",
    icon: <Building2 size={28} className="text-purple-500" />,
    name: "Full Stack Transformation",
    tagline: "End-to-end automation across your entire business",
    price: "Custom",
    priceNote: "Scoped to your business",
    description: "For businesses ready to go all-in. We audit, plan, build, and maintain a complete automation ecosystem across every department.",
    includes: [
      "Full business process audit",
      "Multi-system automation strategy",
      "All systems connected and automated",
      "AI integrated across operations",
      "Dedicated OptimAI team",
      "Ongoing support and evolution",
      "Quarterly business reviews",
    ],
    cta: "Let's Talk",
    ctaLink: "/contact",
    highlight: false,
    badge: "Enterprise",
  },
];

// ─── Ready-to-Go Products (featured) ──────────────────────────────────────────

const FEATURED_PRODUCTS = [
  { name: "AI Chatbot Setup", price: "$2,500", timeline: "2–3 weeks", desc: "Custom chatbot trained on your business, deployed to your site" },
  { name: "CRM Build & Setup", price: "$3,500", timeline: "3–4 weeks", desc: "Full CRM configured for your sales and client workflows" },
  { name: "Email Marketing Setup", price: "$1,800", timeline: "1–2 weeks", desc: "Automated email sequences that nurture and convert" },
  { name: "Process Automation", price: "$2,000", timeline: "2–3 weeks", desc: "Automate 3–5 of your most time-consuming workflows" },
  { name: "Full Stack Business Setup", price: "$5,500", timeline: "4–6 weeks", desc: "CRM, email, booking, invoicing, chatbot — the complete package" },
  { name: "Invoice & Payment Automation", price: "$1,800", timeline: "1–2 weeks", desc: "Stop chasing payments — automate the whole process" },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Do you charge hourly or fixed price?",
    a: "Almost always fixed price. Before any project starts you'll have a clear quote — no hourly rate surprises. The only exception is for ongoing retainers, which are a fixed monthly fee.",
  },
  {
    q: "What if the scope changes mid-project?",
    a: "We scope carefully upfront to minimise this. If genuine scope changes arise, we'll discuss them openly and agree on any adjustment before proceeding — never a surprise invoice.",
  },
  {
    q: "Is there a contract or lock-in?",
    a: "No lock-in on project work — you pay per project. Retainer clients can cancel with 30 days notice. We believe in earning your business every month, not trapping you in a contract.",
  },
  {
    q: "How do I know what my project will cost?",
    a: "Start with the free audit. We'll scope your project properly and give you a fixed quote before anything begins. No obligation to proceed.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. For larger projects we typically split into a deposit on start and balance on completion. For very large builds we can discuss milestone-based payments.",
  },
  {
    q: "What's included in post-launch support?",
    a: "Every project includes a support period (30–90 days depending on size) where we fix any issues, answer questions, and optimise based on real usage — at no extra cost.",
  },
  {
    q: "Can I start small and scale up?",
    a: "Absolutely — and that's what we recommend. Start with the audit or a single fix, see the results, and expand from there. Most clients start with one thing and grow from there.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO
        title="Pricing — Fixed-Price AI Automation Projects & Retainers | OptimAI"
        description="OptimAI pricing starts with a free audit. Project work from $1,500 AUD fixed price. Monthly retainers from $1,200/mo. No lock-in contracts, no hourly surprises. See all engagement models and ready-to-go product prices."
        canonical="/pricing"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "PriceSpecification",
            "name": "OptimAI Pricing",
            "description": "Fixed-price AI and automation project work starting from $1,500 AUD. Monthly retainers from $1,200/mo. Free audit available.",
            "priceCurrency": "AUD",
            "eligibleRegion": "AU"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          }
        ]}
      />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              No hidden fees. No lock-in.
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Straightforward{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Fixed-price projects, honest quotes, and no surprises. Start free — only pay when you're ready to build.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-16 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How you can work with OptimAI</h2>
            <p className="text-foreground/60 text-lg">Pick the model that fits where you are right now.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className={`relative rounded-2xl border-2 flex flex-col transition-all ${
                  model.highlight
                    ? "border-purple-500/60 bg-gradient-to-b from-purple-600/10 to-transparent shadow-lg shadow-purple-600/10"
                    : "border-purple-900/20 bg-white/5 hover:border-purple-500/40"
                }`}
              >
                {model.badge && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full">
                      {model.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 pb-4 border-b border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-purple-600/10">
                      {model.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">{model.price}</div>
                      <div className="text-xs text-foreground/50">{model.priceNote}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{model.name}</h3>
                  <p className="text-xs text-purple-500 font-medium mb-3">{model.tagline}</p>
                  <p className="text-foreground/65 text-sm leading-relaxed">{model.description}</p>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {model.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/75">
                        <Check size={14} className="text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={model.ctaLink}>
                    <Button className={`w-full ${
                      model.highlight
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        : "bg-white/10 hover:bg-purple-600/10 border border-purple-500/30 text-foreground"
                    }`}>
                      {model.cta}
                      <ArrowRight size={15} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready-to-Go Products */}
      <section className="py-16 border-b border-white/10 bg-gradient-to-b from-purple-600/5 to-transparent">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-block mb-4 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              Pre-scoped & fixed price
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready-to-Go Products</h2>
            <p className="text-foreground/60 text-lg">Common business needs, already scoped and priced. Deploy in weeks.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {FEATURED_PRODUCTS.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="p-5 rounded-2xl bg-white/5 border-2 border-purple-900/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground">{product.name}</h3>
                  <span className="text-purple-600 font-bold text-sm flex-shrink-0 ml-2">{product.price}</span>
                </div>
                <p className="text-sm text-foreground/60 mb-3">{product.desc}</p>
                <div className="text-xs text-foreground/40">{product.timeline}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button variant="outline" className="border-purple-400/50 hover:bg-purple-500/10">
                Browse All 20 Products
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What's always included */}
      <section className="py-16 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What's always included</h2>
            <p className="text-foreground/60 text-lg">Regardless of which engagement you choose.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Fixed price quotes", desc: "You know the cost before we start. No hourly surprises." },
              { title: "No lock-in contracts", desc: "Project work has no ongoing commitment. Retainers cancel with 30 days notice." },
              { title: "Plain English throughout", desc: "We explain everything without jargon. You always know what's happening and why." },
              { title: "You own everything", desc: "Every system, workflow, and document we build belongs to you." },
              { title: "Post-launch support", desc: "30–90 days of included support after every go-live." },
              { title: "Training & documentation", desc: "Your team understands what we built and how to use it." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="flex gap-3 p-5 rounded-2xl bg-white/5 border border-purple-900/20"
              >
                <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-foreground mb-1">{item.title}</div>
                  <div className="text-xs text-foreground/60 leading-relaxed">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Pricing questions</h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl border-2 overflow-hidden transition-all ${
                  openFaq === idx ? "border-purple-500/40" : "border-purple-900/20"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={18} className="text-purple-500 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-foreground/70 text-sm leading-relaxed border-t border-white/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              Not sure what you need?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Start with the free audit. We'll scope everything properly and give you a fixed quote — no obligation to proceed.
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

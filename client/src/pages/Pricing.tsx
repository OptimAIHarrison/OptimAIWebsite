import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/const";
import { Check, ArrowRight, Target, TrendingUp, Settings, Cpu, Shield, Search, Package, Info } from "lucide-react";
import { SEO } from "@/components/SEO";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  target: <Target size={22} className="text-purple-500" />,
  "trending-up": <TrendingUp size={22} className="text-purple-500" />,
  settings: <Settings size={22} className="text-purple-500" />,
  cpu: <Cpu size={22} className="text-purple-500" />,
  shield: <Shield size={22} className="text-purple-500" />,
  search: <Search size={22} className="text-purple-500" />,
};

const SERVICE_PRICING: Record<string, { base: number; perComplexity: number; timeline: string }> = {
  "strategic-advisory": { base: 1500, perComplexity: 800, timeline: "1-2 weeks" },
  "marketing-automation": { base: 1800, perComplexity: 1200, timeline: "1-3 weeks" },
  "business-automation": { base: 2000, perComplexity: 1500, timeline: "2-4 weeks" },
  "ai-integration": { base: 2500, perComplexity: 1800, timeline: "2-4 weeks" },
  "managed-services": { base: 800, perComplexity: 400, timeline: "Ongoing (monthly)" },
  "ai-search-optimization": { base: 1600, perComplexity: 900, timeline: "2-3 weeks" },
};

const COMPLEXITY_LEVELS = [
  { value: 1, label: "Simple", description: "Single workflow or quick fix" },
  { value: 2, label: "Standard", description: "Multiple steps, some integration" },
  { value: 3, label: "Complex", description: "Full system, multiple integrations" },
];

const BUSINESS_SIZES = [
  { value: "solo", label: "Solo / Sole Trader", multiplier: 0.8 },
  { value: "small", label: "Small Team (2-10)", multiplier: 1 },
  { value: "growing", label: "Growing Business (11-50)", multiplier: 1.3 },
  { value: "established", label: "Established (50+)", multiplier: 1.6 },
];

export default function Pricing() {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(["business-automation"]);
  const [complexity, setComplexity] = useState(2);
  const [businessSize, setBusinessSize] = useState("small");
  const [isManaged, setIsManaged] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServiceIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const sizeMultiplier = BUSINESS_SIZES.find(b => b.value === businessSize)?.multiplier ?? 1;

  const estimate = useMemo(() => {
    if (selectedServiceIds.length === 0) return { low: 0, high: 0, timeline: "—" };

    let total = 0;
    const timelines: string[] = [];

    selectedServiceIds.forEach(id => {
      const pricing = SERVICE_PRICING[id];
      if (!pricing) return;
      const cost = (pricing.base + pricing.perComplexity * (complexity - 1)) * sizeMultiplier;
      total += cost;
      timelines.push(pricing.timeline);
    });

    const discount = selectedServiceIds.length >= 3 ? 0.9 : selectedServiceIds.length === 2 ? 0.95 : 1;
    total *= discount;

    const low = Math.round((total * 0.85) / 100) * 100;
    const high = Math.round((total * 1.15) / 100) * 100;

    return { low, high, timeline: timelines[0] || "2-4 weeks" };
  }, [selectedServiceIds, complexity, sizeMultiplier]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SEO
        title="Pricing — Build Your Custom AI Automation Quote | OptimAI"
        description="Get an instant estimate for your AI automation project. Select your services, business size, and complexity to see real pricing. Transparent, project-based, no hidden fees. SME-friendly."
        canonical="/pricing"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How much does OptimAI charge for AI automation services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "OptimAI pricing is project-based and depends on the services selected, business size, and complexity. Simple single-service projects start from around $1,200 AUD. Use the interactive pricing builder on the OptimAI pricing page for an instant estimate."
              }
            },
            {
              "@type": "Question",
              "name": "Does OptimAI offer ongoing managed services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. OptimAI offers Managed Services as an ongoing monthly engagement for continuous monitoring, optimisation, and support after your initial automation is deployed."
              }
            },
            {
              "@type": "Question",
              "name": "Are there discounts for bundling multiple services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. OptimAI applies a bundle discount when clients select two or more services together — up to 10% off compared to pricing each service separately."
              }
            }
          ]
        }}
      />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              Real numbers, instantly
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Build your{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                custom quote
              </span>
            </h1>
            <p className="text-xl text-foreground/70">
              Pick what you need, tell us your size, and see a real estimate — no sales call required to get started.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Builder */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left — Builder controls */}
            <div className="lg:col-span-3 space-y-6">

              {/* Step 1: Services */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5 border-2 border-purple-900/20"
              >
                <h2 className="text-lg font-bold text-foreground mb-1">1. Which services do you need?</h2>
                <p className="text-sm text-foreground/60 mb-5">Select one or more. Bundle 2+ for a discount.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((service) => {
                    const isSelected = selectedServiceIds.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                          isSelected
                            ? "border-purple-600 bg-purple-600/15 shadow-md shadow-purple-600/15"
                            : "border-purple-300/40 bg-white/5 hover:border-purple-500/60"
                        }`}
                      >
                        <div className={`p-2 rounded-lg flex-shrink-0 ${isSelected ? "bg-purple-600/20" : "bg-white/10"}`}>
                          {SERVICE_ICONS[service.icon]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-foreground leading-snug">{service.title}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                          isSelected ? "border-purple-600 bg-purple-600" : "border-purple-300/60"
                        }`}>
                          {isSelected && <Check size={12} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Step 2: Business size */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5 border-2 border-purple-900/20"
              >
                <h2 className="text-lg font-bold text-foreground mb-1">2. What's your business size?</h2>
                <p className="text-sm text-foreground/60 mb-5">This affects scope and integration complexity.</p>
                <div className="grid grid-cols-2 gap-3">
                  {BUSINESS_SIZES.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setBusinessSize(size.value)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        businessSize === size.value
                          ? "border-purple-600 bg-purple-600/15 text-foreground"
                          : "border-purple-300/40 bg-white/5 text-foreground/70 hover:border-purple-500/60"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 3: Complexity */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5 border-2 border-purple-900/20"
              >
                <h2 className="text-lg font-bold text-foreground mb-1">3. How complex is the project?</h2>
                <p className="text-sm text-foreground/60 mb-5">Be honest — a rough guide is fine.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {COMPLEXITY_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setComplexity(level.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        complexity === level.value
                          ? "border-purple-600 bg-purple-600/15"
                          : "border-purple-300/40 bg-white/5 hover:border-purple-500/60"
                      }`}
                    >
                      <div className="font-semibold text-sm text-foreground mb-1">{level.label}</div>
                      <div className="text-xs text-foreground/60">{level.description}</div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 4: Ongoing support toggle */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5 border-2 border-purple-900/20 flex items-center justify-between gap-4"
              >
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">4. Add ongoing managed support?</h2>
                  <p className="text-sm text-foreground/60">Monitoring, optimisation, and support after launch.</p>
                </div>
                <button
                  onClick={() => setIsManaged(!isManaged)}
                  className={`relative w-14 h-8 rounded-full flex-shrink-0 transition-colors ${isManaged ? "bg-purple-600" : "bg-white/20"}`}
                >
                  <motion.div
                    animate={{ x: isManaged ? 24 : 2 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md"
                  />
                </button>
              </motion.div>
            </div>

            {/* Right — Live estimate */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:sticky lg:top-24 p-6 rounded-2xl bg-gradient-to-br from-purple-600/15 to-pink-600/10 border-2 border-purple-500/30"
              >
                <h2 className="text-lg font-bold text-foreground mb-1">Your Estimate</h2>
                <p className="text-sm text-foreground/60 mb-6">Based on what you've selected</p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${estimate.low}-${estimate.high}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {selectedServiceIds.length === 0 ? (
                      <p className="text-foreground/50 text-sm py-8 text-center">Select at least one service to see your estimate.</p>
                    ) : (
                      <>
                        <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                          ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
                        </div>
                        <p className="text-xs text-foreground/50 mb-6">AUD, one-time project investment</p>

                        <div className="space-y-3 mb-6 pb-6 border-b border-purple-500/20">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground/60">Estimated timeline</span>
                            <span className="font-semibold text-foreground">{estimate.timeline}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground/60">Services selected</span>
                            <span className="font-semibold text-foreground">{selectedServiceIds.length}</span>
                          </div>
                          {selectedServiceIds.length >= 2 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground/60">Bundle discount</span>
                              <span className="font-semibold text-green-500">
                                {selectedServiceIds.length >= 3 ? "10% off" : "5% off"}
                              </span>
                            </div>
                          )}
                          {isManaged && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground/60">+ Managed Services</span>
                              <span className="font-semibold text-foreground">from $800/mo</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-start gap-2 mb-6 text-xs text-foreground/50">
                          <Info size={14} className="flex-shrink-0 mt-0.5" />
                          <span>This is an estimate. Your free audit gives you an exact, fixed-price quote.</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <Link href="/free-audit">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-5">
                    Get Exact Pricing
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to go products callout */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 border-2 border-purple-900/20"
          >
            <Package size={32} className="text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Want something pre-scoped instead?</h2>
            <p className="text-foreground/60 mb-6 max-w-xl mx-auto">
              Browse our 20 Ready-to-Go Products — fixed-price solutions like AI Chatbot Setup, CRM Build, and Full Stack Business Setup, deployed in days.
            </p>
            <Link href="/products">
              <Button variant="outline" className="border-purple-400/50 hover:bg-purple-500/10">
                Browse Ready-to-Go Products
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Usage-based explanation */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 border-2 border-purple-900/20"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">A note on usage-based costs</h3>
            <p className="text-foreground/70 mb-5">
              For solutions that rely heavily on external AI APIs (like large language models), we transparently pass through usage costs. You only pay for what you use, with no surprises.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Transparent API cost pass-through",
                "Scale up or down without fixed overheads",
                "Small administrative markup for management",
                "Detailed usage reports and recommendations",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-foreground/75">
                  <Check size={15} className="text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Pricing Questions?
          </motion.h3>
          <div className="space-y-4">
            {[
              { q: "Can I switch plans or scope later?", a: "Yes. You can expand, reduce, or change scope at any time. We'll always quote changes upfront before any work begins." },
              { q: "What's included in support?", a: "All projects include initial training and documentation. Managed Services adds ongoing monitoring, priority support, and continuous optimisation." },
              { q: "Do you offer discounts for annual billing?", a: "Yes — annual billing for Managed Services includes a 15% discount. Contact us for custom enterprise pricing." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="p-5 rounded-xl bg-white/5 border border-purple-900/20"
              >
                <h4 className="font-bold text-foreground mb-1.5">{item.q}</h4>
                <p className="text-foreground/65 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready for an exact number?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              The estimate above is a starting point. A free audit gets you a fixed, no-surprises quote.
            </p>
            <Link href="/free-audit">
              <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-5 font-bold">
                Get Your Free Audit
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

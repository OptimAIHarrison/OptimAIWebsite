import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/const";
import { ChevronDown, ArrowRight, Target, TrendingUp, Settings, Cpu, Shield, Search, CheckCircle, Clock, Users, Zap } from "lucide-react";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  target: <Target size={32} className="text-purple-500" />,
  "trending-up": <TrendingUp size={32} className="text-purple-500" />,
  settings: <Settings size={32} className="text-purple-500" />,
  cpu: <Cpu size={32} className="text-purple-500" />,
  shield: <Shield size={32} className="text-purple-500" />,
  search: <Search size={32} className="text-purple-500" />,
};

const SERVICE_LABELS: Record<string, string> = {
  "strategic-advisory": "Strategic Advisory",
  "marketing-automation": "Marketing Automation",
  "business-automation": "Business Process",
  "ai-integration": "AI Integration",
  "managed-services": "Managed Services",
  "ai-search-optimization": "AI Visibility",
};

export default function Services() {
  const [expanded, setExpanded] = useState<string | null>(SERVICES[0].id);
  const [viewMode, setViewMode] = useState<"simple" | "technical">("simple");
  const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleServiceButtonClick = (serviceId: string) => {
    setExpanded(serviceId);
    setTimeout(() => {
      const element = serviceRefs.current[serviceId];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-16 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div
          className="container mx-auto px-4 text-center max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Core Services
            </span>
          </h1>
          <p className="text-xl text-foreground/70">
            Six specialised practices — from strategy through to ongoing support — designed to transform how your business operates and grows.
          </p>
        </motion.div>
      </section>

      {/* Sticky Nav + Toggle */}
      <section className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-white/10 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          {/* View toggle */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex rounded-lg border-2 border-purple-300/50 overflow-hidden">
              <button
                onClick={() => setViewMode("simple")}
                className={`px-6 py-2 font-medium text-sm transition-all ${
                  viewMode === "simple"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-transparent text-foreground/70 hover:bg-purple-500/5"
                }`}
              >
                Simple Overview
              </button>
              <button
                onClick={() => setViewMode("technical")}
                className={`px-6 py-2 font-medium text-sm transition-all border-l-2 border-purple-300/50 ${
                  viewMode === "technical"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-transparent text-foreground/70 hover:bg-purple-500/5"
                }`}
              >
                Technical Details
              </button>
            </div>
          </div>

          {/* Service nav pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceButtonClick(service.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all border-2 ${
                  expanded === service.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-600"
                    : "bg-transparent text-foreground/70 border-purple-300/50 hover:border-purple-500 hover:bg-purple-500/5"
                }`}
              >
                {SERVICE_LABELS[service.id] || service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-4">
          {SERVICES.map((service, index) => {
            const isOpen = expanded === service.id;
            return (
              <motion.div
                key={service.id}
                ref={(el) => { if (el) serviceRefs.current[service.id] = el; }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-purple-500/60 shadow-lg shadow-purple-600/10"
                    : "border-purple-900/20 hover:border-purple-500/40"
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : service.id)}
                  className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-colors ${isOpen ? "bg-purple-600/20" : "bg-white/5"}`}>
                      {SERVICE_ICONS[service.icon]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                        <span className="text-xs px-2.5 py-1 bg-purple-600/15 text-purple-700 font-semibold rounded-full ring-1 ring-purple-400/30">
                          {SERVICE_LABELS[service.id]}
                        </span>
                      </div>
                      <p className="text-foreground/60 text-sm mt-1">{service.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="text-purple-500" size={22} />
                  </motion.div>
                </button>

                {/* Expanded Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10">
                        {viewMode === "simple" ? (
                          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* What we do */}
                            <div>
                              <h4 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-4">What We Do</h4>
                              <p className="text-foreground/80 leading-relaxed mb-6">{service.whatWeDo}</p>

                              <h4 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-4">What's Included</h4>
                              <ul className="space-y-2.5">
                                {service.details.map((detail, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5 text-foreground/80">
                                    <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Options + Process */}
                            <div>
                              <h4 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-4">Service Options</h4>
                              <div className="space-y-3 mb-6">
                                {service.options.map((option, idx) => (
                                  <div key={idx} className="p-3 rounded-lg bg-white/5 border border-purple-900/20">
                                    <div className="font-semibold text-sm text-foreground mb-0.5">{option.name}</div>
                                    <div className="text-xs text-foreground/60">{option.description}</div>
                                  </div>
                                ))}
                              </div>

                              <h4 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-4">Best For</h4>
                              <ul className="space-y-2">
                                {service.useCases.map((useCase, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                                    <Zap size={14} className="text-purple-500 flex-shrink-0 mt-0.5" />
                                    <span>{useCase}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6 space-y-6">
                            {/* Technical narrative */}
                            <div>
                              <h4 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-4">Technical Breakdown</h4>
                              <p className="text-foreground/80 leading-relaxed">{service.technicalDetails}</p>
                            </div>

                            {/* Process steps */}
                            <div>
                              <h4 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-4">Implementation Process</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {service.process.map((step, idx) => (
                                  <div key={idx} className="flex gap-3 p-3 rounded-lg bg-white/5 border border-purple-900/20">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                                      {idx + 1}
                                    </div>
                                    <p className="text-sm text-foreground/80">{step}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Integration callouts */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock size={16} className="text-purple-500" />
                                  <span className="text-sm font-bold text-foreground">Implementation</span>
                                </div>
                                <p className="text-xs text-foreground/70">All technical setup, integration, and deployment handled end-to-end with minimal disruption to your operations.</p>
                              </div>
                              <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Settings size={16} className="text-purple-500" />
                                  <span className="text-sm font-bold text-foreground">Integration</span>
                                </div>
                                <p className="text-xs text-foreground/70">Seamless connection with your existing CRM, ERP, accounting software, and custom applications.</p>
                              </div>
                              <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Users size={16} className="text-purple-500" />
                                  <span className="text-sm font-bold text-foreground">Support</span>
                                </div>
                                <p className="text-xs text-foreground/70">Continuous monitoring, performance tuning, and proactive optimisation to ensure maximum ROI.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Footer CTA */}
                        <div className="px-6 pb-6 flex items-center justify-between flex-wrap gap-4 border-t border-white/10 pt-5">
                          <p className="text-sm text-foreground/60">Ready to get started with {service.title}?</p>
                          <div className="flex items-center gap-3">
                            <Link href="/free-audit">
                              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                Get a Free Audit
                                <ArrowRight size={15} className="ml-2" />
                              </Button>
                            </Link>
                            <Link href="/contact">
                              <Button variant="outline" className="border-purple-400/50 text-foreground hover:bg-purple-500/10">
                                Start Now
                                <ArrowRight size={15} className="ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="container mx-auto px-4 mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Not sure which service fits?</h2>
            <p className="text-white/90 mb-8 text-lg">Get a free audit and we'll map the right services to your business goals.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-audit">
              <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-5 font-bold">
                Get Your Free AI Audit
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/50 text-white hover:bg-white/10 text-lg px-8 py-5 font-bold">
                Start Now
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

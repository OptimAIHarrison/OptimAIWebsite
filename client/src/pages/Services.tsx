import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/const";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function Services() {
  const [expanded, setExpanded] = useState<string | null>(SERVICES[0].id);
  const [viewMode, setViewMode] = useState<"simple" | "technical">("simple");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-900/10 to-transparent">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-foreground/70">
              Comprehensive AI and automation solutions across five core pillars, designed to transform your business operations and accelerate growth.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* View Mode Toggle */}
      <section className="py-8 border-b border-white/10">
        <motion.div
          className="container mx-auto px-4 flex justify-center gap-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <button
            onClick={() => setViewMode("simple")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              viewMode === "simple"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/10 text-foreground/70 hover:bg-white/20"
            }`}
          >
            Simple Overview
          </button>
          <button
            onClick={() => setViewMode("technical")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              viewMode === "technical"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/10 text-foreground/70 hover:bg-white/20"
            }`}
          >
            Technical Details
          </button>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            {SERVICES.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="glass-card p-8 cursor-pointer hover:border-purple-500/50 transition-all"
                onClick={() =>
                  setExpanded(expanded === service.id ? null : service.id)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-4xl">{service.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-foreground/70">{service.description}</p>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expanded === service.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-accent" size={24} />
                  </motion.div>
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expanded === service.id ? "auto" : 0,
                    opacity: expanded === service.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-white/10">
                    {viewMode === "simple" ? (
                      <ul className="space-y-3">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-accent mt-1 font-bold">•</span>
                            <span className="text-foreground/80">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-foreground/80 leading-relaxed">
                          {service.technicalDetails}
                        </p>
                        <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
                          <p className="text-sm text-foreground/70">
                            <strong>Implementation:</strong> Our team handles all technical setup, integration, and deployment. We ensure minimal disruption to your operations while maximizing the value delivered.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-lg text-foreground/70 mb-6">
              Ready to explore how these services can transform your business?
            </p>
            <Link href="/free-audit">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-6 rounded-xl">
                Get Your Free Audit
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

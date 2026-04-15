import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES } from "@/const";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function CaseStudies() {
  const [expanded, setExpanded] = useState<number | null>(0);

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

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-900/10 to-transparent">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            Client Success <span className="gradient-text">Stories</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Real results from real clients. See how we've helped businesses achieve significant growth and efficiency gains.
          </motion.p>
        </motion.div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-4 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="space-y-8">
            {CASE_STUDIES.map((study, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all"
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-accent font-bold text-sm mb-2">CASE STUDY</p>
                      <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                      <p className="text-foreground/70">{study.client}</p>
                    </div>
                    <TrendingUp className="text-accent flex-shrink-0" size={32} />
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                    <div>
                      <p className="text-accent font-bold text-2xl">{study.results.timeSaved}</p>
                      <p className="text-foreground/70 text-sm">Time Saved</p>
                    </div>
                    <div>
                      <p className="text-accent font-bold text-2xl">{study.results.costSavings}</p>
                      <p className="text-foreground/70 text-sm">Cost Savings</p>
                    </div>
                    <div>
                      <p className="text-accent font-bold text-2xl">{study.results.productivityGain}</p>
                      <p className="text-foreground/70 text-sm">Productivity</p>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expanded === index ? "auto" : 0,
                      opacity: expanded === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-white/10 space-y-6">
                      <div>
                        <p className="font-bold mb-2">Challenge</p>
                        <p className="text-foreground/80">{study.challenge}</p>
                      </div>
                      <div>
                        <p className="font-bold mb-2">Solution</p>
                        <p className="text-foreground/80">{study.solution}</p>
                      </div>
                      <div>
                        <p className="font-bold mb-4">Detailed Metrics</p>
                        <div className="space-y-3">
                          {study.metrics.map((metric, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                              <p className="text-foreground/80">{metric.label}</p>
                              <div className="flex gap-4">
                                <span className="text-foreground/70 line-through">{metric.before}</span>
                                <span className="text-accent font-bold">{metric.after}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-lg text-foreground/70 mb-6">
              Ready to become our next success story?
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

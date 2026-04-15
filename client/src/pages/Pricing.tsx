import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PRICING_TIERS } from "@/const";
import { Check, ArrowRight } from "lucide-react";

export default function Pricing() {
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
            Transparent <span className="gradient-text">Pricing</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Flexible pricing models designed for businesses of all sizes. No hidden fees, just real value.
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {PRICING_TIERS.map((tier) => (
              <motion.div
                key={tier.name}
                variants={itemVariants}
                className={`rounded-2xl p-8 transition-all ${
                  tier.highlighted
                    ? "glass-card border-2 border-accent scale-105"
                    : "glass-card"
                }`}
              >
                {tier.highlighted && (
                  <div className="mb-4 inline-block px-4 py-2 bg-accent/20 border border-accent/50 rounded-full text-sm font-semibold text-accent">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-foreground/70 mb-6">{tier.description}</p>

                <div className="mb-8">
                  <p className="text-4xl font-bold mb-2">{tier.price}</p>
                  {tier.name === "Initial Assessment" && (
                    <p className="text-foreground/70 text-sm">One-time investment</p>
                  )}
                  {tier.name === "Project Implementation" && (
                    <p className="text-foreground/70 text-sm">Project-based</p>
                  )}
                  {tier.name === "Managed Services" && (
                    <p className="text-foreground/70 text-sm">Per month, billed annually</p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/free-audit">
                  <Button
                    className={`w-full text-lg py-6 rounded-xl border-0 ${
                      tier.highlighted
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-foreground"
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Usage-Based Explanation */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-8 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4">Usage-Based Components</h3>
            <p className="text-foreground/70 mb-4">
              For solutions that rely heavily on external AI APIs (such as large language models), we transparently pass through usage costs to you. This ensures you only pay for what you use, with no surprises.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span className="text-foreground/80">Transparent API cost pass-through</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span className="text-foreground/80">Scale up or down without fixed overheads</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span className="text-foreground/80">Small administrative markup for management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span className="text-foreground/80">Detailed usage reports and optimization recommendations</span>
              </li>
            </ul>
          </motion.div>

          {/* FAQ */}
          <motion.div
            variants={itemVariants}
            className="mt-16 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Pricing Questions?</h3>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h4 className="font-bold mb-2">Can I switch plans later?</h4>
                <p className="text-foreground/70">
                  Yes! You can upgrade or downgrade your plan at any time. We'll prorate any changes to your billing.
                </p>
              </div>
              <div className="glass-card p-6">
                <h4 className="font-bold mb-2">What's included in support?</h4>
                <p className="text-foreground/70">
                  All plans include email support. Managed Services tier includes priority support and dedicated account management.
                </p>
              </div>
              <div className="glass-card p-6">
                <h4 className="font-bold mb-2">Do you offer discounts for annual billing?</h4>
                <p className="text-foreground/70">
                  Yes! Annual billing for Managed Services includes a 15% discount. Contact us for custom enterprise pricing.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
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

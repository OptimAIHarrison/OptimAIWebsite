import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

export default function WhyOptimAI() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const reasons = [
    {
      icon: <Zap size={32} />,
      title: "Fast Implementation",
      description: "Get results quickly with our streamlined deployment process. Most projects go live within 6-10 weeks.",
    },
    {
      icon: <Shield size={32} />,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with GDPR, CCPA, and industry compliance built in from day one.",
    },
    {
      icon: <Users size={32} />,
      title: "Expert Support",
      description: "Dedicated team of AI and automation experts available throughout your journey.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div className="container mx-auto px-4" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            Why <span className="gradient-text">Optimai</span> is Your Best Choice
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-3xl">
            We're not just another consulting firm. We're your growth partner, committed to your success.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20">
        <motion.div className="container mx-auto px-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {reasons.map((reason, idx) => (
              <motion.div key={idx} variants={itemVariants} className="glass-card p-8 text-center">
                <div className="text-accent mb-4 flex justify-center">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
                <p className="text-foreground/70">{reason.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="glass-card p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join 150+ companies that have already discovered the power of AI and automation with Optimai.
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

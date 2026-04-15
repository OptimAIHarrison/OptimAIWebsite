import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-40 pb-20 bg-background">
        <motion.div className="container mx-auto px-4 text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            About <span className="gradient-text">Optimai</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-3xl mx-auto">
            We're a team of AI and automation experts dedicated to helping SMEs and startups unlock their full potential through practical, results-driven solutions.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20">
        <motion.div className="container mx-auto px-4 max-w-4xl" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants} className="glass-card p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              To empower SMEs and startups to compete effectively in a rapidly evolving digital landscape by providing accessible, high-impact AI and automation solutions that deliver measurable ROI.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              We believe that cutting-edge technology shouldn't be exclusive to large enterprises. Our mission is to democratize AI and automation, making it practical and affordable for businesses of all sizes.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-12">
            <h2 className="text-3xl font-bold mb-6">Why Choose Optimai?</h2>
            <ul className="space-y-4">
              {[
                "Specialized expertise in SME and startup challenges",
                "Practical, results-driven approach focused on measurable ROI",
                "Transparent pricing with no hidden fees",
                "Dedicated support throughout implementation",
                "Proven track record with 150+ successful projects",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 text-center">
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

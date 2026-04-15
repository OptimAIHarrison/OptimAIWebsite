import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FAQ_ITEMS } from "@/const";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function FAQ() {
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
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Get answers to common questions about our services, pricing, and implementation process.
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-4 max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                >
                  <h3 className="text-lg font-bold pr-4">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: expanded === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-accent flex-shrink-0" size={24} />
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expanded === index ? "auto" : 0,
                    opacity: expanded === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-white/10 pt-6">
                    <p className="text-foreground/80 leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Still have questions? */}
          <motion.div
            variants={itemVariants}
            className="mt-16 glass-card p-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-foreground/70 mb-8">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-6 rounded-xl">
                Contact Us
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

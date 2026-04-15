import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function FreeAudit() {
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
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-900/10 to-transparent">
        <motion.div className="container mx-auto px-4 text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            Get Your Free <span className="gradient-text">Audit</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover specific opportunities to save time, reduce costs, and accelerate growth with a personalized assessment.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20">
        <motion.div className="container mx-auto px-4 max-w-2xl" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants} className="glass-card p-12">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent" placeholder="your@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent" placeholder="Your company" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Team Size</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent">
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-100 employees</option>
                  <option>100+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Main Challenge</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent" placeholder="Tell us about your biggest operational challenge..." />
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg py-6 rounded-xl">
                Request Free Audit
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}

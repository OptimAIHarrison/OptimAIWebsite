import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Resources() {
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
            Resources & <span className="gradient-text">Blog</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Learn from industry experts and stay updated with the latest trends in AI and automation.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20">
        <motion.div className="container mx-auto px-4 max-w-4xl" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants} className="glass-card p-12 text-center">
            <p className="text-lg text-foreground/70 mb-6">
              Our resource library is coming soon. Check back for whitepapers, case studies, webinars, and industry insights.
            </p>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}

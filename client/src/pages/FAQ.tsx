import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FAQ_DATA, FAQ_CATEGORIES, searchFAQ, getFAQByCategory, getRelatedFAQs } from "@/const/faqData";
import { ChevronDown, ArrowRight, Search, MessageCircle, Zap } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showChatSuggestion, setShowChatSuggestion] = useState(false);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    let results = FAQ_DATA;

    if (searchQuery.trim()) {
      results = searchFAQ(searchQuery);
    } else if (selectedCategory) {
      results = getFAQByCategory(selectedCategory);
    }

    return results;
  }, [searchQuery, selectedCategory]);

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
      <SEO
        title="FAQ — Common Questions About OptimAI AI & Automation Services"
        description="Find answers to common questions about OptimAI services, pricing, implementation timelines, ROI, and how AI automation works for SMEs, startups, and everyday business owners across Australia."
        canonical="/faq"
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_DATA.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Find answers to common questions about OptimAI services, pricing, implementation, and more.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/50" size={20} />
              <input
                type="text"
                placeholder="Search FAQs... (e.g., 'pricing', 'implementation', 'ROI')"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCategory(null);
                }}
                className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-purple-300/60 bg-white/80 backdrop-blur-sm text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? "bg-accent text-white"
                  : "bg-white/80 text-foreground/80 border border-purple-200 hover:bg-purple-50 hover:text-foreground"
              }`}
            >
              All FAQs
            </button>
            {FAQ_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchQuery("");
                }}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-white"
                    : "bg-white/80 text-foreground/80 border border-purple-200 hover:bg-purple-50 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-8"
          >
            <p className="text-foreground/70">
              Showing <span className="font-bold text-accent">{filteredFAQs.length}</span> of{" "}
              <span className="font-bold">{FAQ_DATA.length}</span> FAQs
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-5"
          >
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  className="glass-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-left flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="inline-flex items-center px-2.5 py-1 bg-accent/15 text-accent font-semibold text-xs rounded-full ring-1 ring-accent/25">
                          {faq.category}
                        </span>
                        {faq.featured && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full font-medium">
                            <Zap size={12} /> Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} className="text-accent flex-shrink-0" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedId === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/10"
                      >
                        <div className="px-6 py-6 bg-white/5">
                          <div className="text-foreground/80 leading-relaxed mb-4 space-y-3">
                            {faq.answer.split('\n').map((line, i) => {
                              const trimmed = line.trim();
                              if (!trimmed) return null;
                              // Bullet lines starting with - or •
                              if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                                return (
                                  <div key={i} className="flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                    <span>{trimmed.replace(/^[-•]\s+/, '')}</span>
                                  </div>
                                );
                              }
                              return <p key={i}>{trimmed}</p>;
                            })}
                          </div>

                          {/* CTA Button */}
                          {faq.cta && faq.ctaLink && (
                            <a href={faq.ctaLink}>
                              <Button className="mb-4">
                                {faq.cta}
                                <ArrowRight size={16} className="ml-2" />
                              </Button>
                            </a>
                          )}

                          {/* Related Questions */}
                          {faq.relatedQuestions.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-white/10">
                              <p className="text-sm font-bold text-foreground/70 mb-3">Related Questions:</p>
                              <div className="space-y-2">
                                {getRelatedFAQs(faq.id).map((related) => (
                                  <button
                                    key={related.id}
                                    onClick={() => setExpandedId(related.id)}
                                    className="block text-left text-sm text-accent hover:text-accent/80 transition-colors"
                                  >
                                    • {related.question}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={itemVariants}
                className="text-center py-12"
              >
                <p className="text-foreground/70 mb-6">
                  No FAQs found matching "{searchQuery}". Try a different search or browse by category.
                </p>
                <Button
                  onClick={() => {
                    setShowChatSuggestion(true);
                    setTimeout(() => setShowChatSuggestion(false), 5000);
                  }}
                  variant="outline"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Ask Our Chatbot
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Chat Suggestion */}
          <AnimatePresence>
            {showChatSuggestion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-24 right-6 bg-accent text-white p-4 rounded-lg shadow-lg max-w-xs"
              >
                <p className="text-sm">
                  Didn't find what you're looking for? Try asking our AI chatbot in the bottom right corner!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Still have questions?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get personalized answers and recommendations from our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/audit">
                <Button className="bg-white text-accent hover:bg-white/90">
                  Get Your Free Audit
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />


    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// EDITABLE: Add or modify articles here
const ARTICLES = [
  {
    id: "ai-automation-smb",
    title: "The Complete Guide to AI Automation for SMBs",
    excerpt: "Discover how small and medium-sized businesses are leveraging AI to automate operations, reduce costs, and scale faster than ever before.",
    category: "AI & Automation",
    readTime: "8 min read",
    author: "OptimAI Team",
    date: "Apr 15, 2026",
    image: "https://images.unsplash.com/photo-1677442d019cecf8e5c1a1a10b53d537?w=600&h=400&fit=crop",
    content: "Artificial intelligence is no longer just for enterprise companies. SMBs are discovering that AI-powered automation can help them compete with larger organizations by streamlining operations and improving efficiency..."
  },
  {
    id: "marketing-automation-roi",
    title: "Marketing Automation: ROI Strategies That Work",
    excerpt: "Learn how to implement marketing automation that actually drives results. We break down the metrics, tools, and strategies that deliver measurable ROI.",
    category: "Marketing",
    readTime: "6 min read",
    author: "Sarah Chen",
    date: "Apr 10, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    content: "Marketing automation isn't about sending more emails. It's about sending the right message to the right person at the right time. In this guide, we explore proven strategies..."
  },
  {
    id: "business-process-automation",
    title: "Business Process Automation: Where to Start",
    excerpt: "Not sure where to begin with BPA? This guide walks you through identifying automation opportunities and implementing solutions that stick.",
    category: "Process Automation",
    readTime: "7 min read",
    author: "James Wilson",
    date: "Apr 5, 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    content: "Business process automation can transform how your team works. The key is starting with the right processes. We'll show you how to identify, prioritize, and automate..."
  },
  {
    id: "ai-integration-challenges",
    title: "Common AI Integration Challenges and How to Solve Them",
    excerpt: "Thinking about integrating AI into your business? Learn about common pitfalls and proven solutions from companies that have successfully made the transition.",
    category: "AI Integration",
    readTime: "9 min read",
    author: "OptimAI Team",
    date: "Mar 30, 2026",
    image: "https://images.unsplash.com/photo-1620712014215-c8ee4a8d3467?w=600&h=400&fit=crop",
    content: "AI integration doesn't have to be complicated. In this comprehensive guide, we break down the most common challenges companies face and provide practical solutions..."
  },
  {
    id: "automation-best-practices",
    title: "5 Best Practices for Successful Automation",
    excerpt: "Whether you're automating marketing, sales, or operations, these five principles will help ensure your automation projects deliver real value.",
    category: "Best Practices",
    readTime: "5 min read",
    author: "Michael Zhang",
    date: "Mar 25, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    content: "Successful automation requires more than just technology. It requires strategy, planning, and a commitment to continuous improvement. Here are the five principles..."
  },
  {
    id: "future-of-automation",
    title: "The Future of Automation: What's Next?",
    excerpt: "Explore emerging trends in automation and AI, and discover how to prepare your business for the opportunities ahead.",
    category: "Industry Trends",
    readTime: "6 min read",
    author: "OptimAI Team",
    date: "Mar 20, 2026",
    image: "https://images.unsplash.com/photo-1677442d019cecf8e5c1a1a10b53d537?w=600&h=400&fit=crop",
    content: "The automation landscape is evolving rapidly. From generative AI to intelligent process automation, new technologies are creating unprecedented opportunities for businesses..."
  }
];

const CATEGORIES = ["All", "AI & Automation", "Marketing", "Process Automation", "AI Integration", "Best Practices", "Industry Trends"];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const filteredArticles = selectedCategory === "All" 
    ? ARTICLES 
    : ARTICLES.filter(article => article.category === selectedCategory);

  const selectedArticleData = ARTICLES.find(a => a.id === selectedArticle);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div 
          className="container mx-auto px-4 text-center" 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            Resources & <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Insights</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Learn from industry experts and stay updated with the latest trends in AI and automation for SMBs.
          </motion.p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-b border-purple-200">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variants={itemVariants}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-purple-100 text-foreground hover:bg-purple-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <motion.div 
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                onClick={() => setSelectedArticle(article.id)}
                className="glass-card rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-foreground/70 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-foreground/60 mb-4">
                    <span>{article.readTime}</span>
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground/70">{article.author}</span>
                    <ArrowRight size={16} className="text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-lg text-foreground/70">No articles found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && selectedArticleData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedArticle(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={selectedArticleData.image} 
                alt={selectedArticleData.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {selectedArticleData.category}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{selectedArticleData.title}</h2>
              <div className="flex items-center gap-4 mb-6 text-sm text-foreground/70">
                <span>{selectedArticleData.author}</span>
                <span>•</span>
                <span>{selectedArticleData.date}</span>
                <span>•</span>
                <span>{selectedArticleData.readTime}</span>
              </div>
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-foreground/80 leading-relaxed">{selectedArticleData.content}</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
                Read Full Article
                <ArrowRight size={20} />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <motion.div 
          className="container mx-auto px-4 text-center max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-4">
            Stay Updated
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/90 mb-8">
            Subscribe to our newsletter for the latest insights on AI, automation, and business growth.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg">
              Subscribe
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

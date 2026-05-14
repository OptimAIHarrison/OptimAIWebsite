import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Clock, User, Download, ExternalLink, BookOpen } from "lucide-react";

const DEFAULT_ARTICLES = [
  {
    id: "ai-automation-smb",
    slug: "ai-automation-smb",
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
    slug: "marketing-automation-roi",
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
    slug: "business-process-automation",
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
    slug: "ai-integration-challenges",
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
    slug: "automation-best-practices",
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
    slug: "future-of-automation",
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
  const [articles, setArticles] = useState(DEFAULT_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
    const publishedArticles = savedArticles
      .filter((article: any) => article.status === 'published')
      .map((article: any) => ({
        id: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.tags?.[0] || 'AI & Automation',
        readTime: article.readTime || '5 min read',
        author: 'OptimAI Team',
        date: new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' }),
        image: article.featuredImage || 'https://images.unsplash.com/photo-1677442d019cecf8e5c1a1a10b53d537?w=600&h=400&fit=crop',
        content: article.content,
        slug: article.slug,
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        tags: article.tags,
        pdf: article.pdf,
        embedLinks: article.embedLinks,
        embedVideos: article.embedVideos
      }));
    setArticles([...publishedArticles, ...DEFAULT_ARTICLES]);
  }, []);

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const selectedArticleData = articles.find(a => a.id === selectedArticle);

  // Featured = first article
  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              Guides, insights & practical advice
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Resources &{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              No fluff. Practical guides on AI, automation, and how to make it work for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-white/10 sticky top-0 z-20 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/80 text-foreground/70 border border-purple-200 hover:border-purple-400/80 hover:bg-purple-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-foreground/60">No articles in this category yet.</p>
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedArticle(featured.id)}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border-2 border-purple-900/20 hover:border-purple-500/40 transition-all cursor-pointer mb-12"
                >
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 lg:p-10 bg-white/5 flex flex-col justify-center">
                    <span className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3">{featured.category}</span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-purple-600 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-foreground/65 leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-foreground/50 mb-6">
                      <span className="flex items-center gap-1.5"><User size={13} />{featured.author}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} />{featured.readTime}</span>
                      <span>{featured.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      Read article <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Rest of articles grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article, idx) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.06 }}
                      onClick={() => setSelectedArticle(article.id)}
                      className="group rounded-2xl overflow-hidden border-2 border-purple-900/20 hover:border-purple-500/40 transition-all cursor-pointer bg-white/5"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2.5 py-1 rounded-full text-xs font-bold">
                          {article.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-foreground/60 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-foreground/50">
                          <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                          <span className="text-xs font-medium text-foreground/60">{article.author}</span>
                          <ArrowRight size={14} className="text-purple-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && selectedArticleData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border-2 border-purple-900/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal image */}
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedArticleData.image}
                  alt={selectedArticleData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <span className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {selectedArticleData.category}
                </span>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-3">{selectedArticleData.title}</h2>
                <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-foreground/60">
                  <span className="flex items-center gap-1.5"><User size={13} />{selectedArticleData.author}</span>
                  <span>·</span>
                  <span>{selectedArticleData.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} />{selectedArticleData.readTime}</span>
                </div>

                <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap mb-8">
                  {selectedArticleData.content}
                </p>

                {/* Embed Links */}
                {(selectedArticleData as any)?.embedLinks?.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-white/5 border border-purple-900/20">
                    <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <ExternalLink size={14} className="text-purple-500" />
                      Related Resources
                    </h3>
                    <div className="space-y-2">
                      {(selectedArticleData as any)?.embedLinks?.map((link: string, idx: number) => (
                        <a key={idx} href={link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm transition-colors">
                          <ArrowRight size={12} />
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* PDF Download */}
                {(selectedArticleData as any)?.pdf && (
                  <div className="mb-6">
                    <Button className="bg-white/10 hover:bg-white/20 border border-purple-500/30 text-foreground gap-2">
                      <Download size={16} />
                      Download PDF Guide
                    </Button>
                  </div>
                )}

                <a href={`/articles/${selectedArticleData.slug || selectedArticleData.id}`}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-5 text-base font-semibold">
                    <BookOpen size={18} className="mr-2" />
                    Read Full Article
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Stay in the loop</h2>
            <p className="text-white/90 mb-8 text-lg max-w-xl mx-auto">
              New guides, automation tips, and practical insights — straight to your inbox.
            </p>
            <div className="flex gap-3 max-w-md mx-auto flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/90 text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-white/50 border-2 border-white/20"
              />
              <Button className="bg-white text-purple-600 hover:bg-white/90 font-bold px-8 rounded-xl whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

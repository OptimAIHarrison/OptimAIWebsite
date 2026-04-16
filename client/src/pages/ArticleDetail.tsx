import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// Default articles (same as Resources)
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
    content: "Artificial intelligence is no longer just for enterprise companies. SMBs are discovering that AI-powered automation can help them compete with larger organizations by streamlining operations and improving efficiency. In this comprehensive guide, we explore the key benefits, implementation strategies, and real-world examples of AI automation in action.\n\nFrom customer service chatbots to predictive analytics, AI-powered automation is transforming how small businesses operate. The key is understanding where to start and how to measure success.\n\nWe'll walk you through the entire process: identifying automation opportunities, selecting the right tools, implementing solutions, and measuring ROI. By the end, you'll have a clear roadmap for bringing AI automation to your organization."
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
    content: "Marketing automation isn't about sending more emails. It's about sending the right message to the right person at the right time. In this guide, we explore proven strategies that deliver measurable results.\n\nThe most successful marketing automation programs share common characteristics: clear goals, well-defined workflows, and continuous optimization. We'll show you how to build each of these elements.\n\nYou'll learn about email sequences, lead scoring, behavioral triggers, and analytics that matter. Plus, we share case studies from companies that have achieved 300%+ ROI with marketing automation."
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
    content: "Business process automation can transform how your team works. The key is starting with the right processes. We'll show you how to identify, prioritize, and automate the workflows that matter most.\n\nThe best candidates for automation are repetitive, rule-based processes with high transaction volumes. These are the processes that consume the most time and resources while offering the greatest ROI potential.\n\nIn this guide, we walk through a proven methodology for identifying automation opportunities, evaluating tools, and implementing solutions that stick. You'll also learn how to manage change and ensure your team embraces automation."
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
    content: "AI integration doesn't have to be complicated. In this comprehensive guide, we break down the most common challenges companies face and provide practical solutions based on real-world implementations.\n\nThe most common challenges include: data quality issues, lack of internal expertise, integration complexity, and change management. We address each of these head-on.\n\nYou'll learn how to assess your organization's readiness for AI, build the right team, select appropriate tools and vendors, and manage the transition. Plus, we share lessons learned from companies that have successfully integrated AI into their operations."
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
    content: "Successful automation requires more than just technology. It requires strategy, planning, and a commitment to continuous improvement. Here are the five principles that separate successful automation initiatives from failed ones.\n\n1. Start with clear goals and metrics\n2. Involve your team from day one\n3. Choose the right tools for your needs\n4. Implement gradually, not all at once\n5. Monitor, measure, and optimize continuously\n\nEach of these principles is critical to success. Skip any one of them, and you risk wasting time and resources on automation that doesn't deliver value."
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
    content: "The automation landscape is evolving rapidly. From generative AI to intelligent process automation, new technologies are creating unprecedented opportunities for businesses.\n\nThe most exciting developments include: generative AI for content creation and analysis, autonomous agents that can handle complex workflows, and AI-powered decision-making systems.\n\nBut with these opportunities come challenges. Organizations need to think carefully about data privacy, security, and the impact on their workforce. In this guide, we explore the trends shaping the future of automation and how to prepare your business for what's ahead."
  }
];

export default function ArticleDetail() {
  const [match, params] = useRoute('/articles/:slug');
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!match) return;

    // Try to find article from localStorage first (user-created articles)
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      const articles = JSON.parse(storedArticles);
      const found = articles.find((a: any) => a.slug === params?.slug);
      if (found) {
        setArticle(found);
        setLoading(false);
        return;
      }
    }

    // Fall back to default articles
    const found = DEFAULT_ARTICLES.find(a => a.slug === params?.slug);
    if (found) {
      setArticle(found);
    }
    setLoading(false);
  }, [match, params?.slug]);

  if (!match) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-foreground/60">Loading article...</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-foreground/70 mb-8">The article you're looking for doesn't exist.</p>
            <a href="/resources">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
                <ArrowLeft size={20} />
                Back to Resources
              </Button>
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Image */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-4 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <a href="/resources" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Resources
          </a>

          {/* Metadata */}
          <div className="mb-8">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
              {article.category}
            </span>
            <h1 className="text-5xl font-bold mb-6 text-foreground">{article.title}</h1>
            <div className="flex items-center gap-4 text-foreground/70 text-sm">
              <span className="font-semibold">{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-12"></div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap text-lg">
              {article.content}
            </p>
          </div>

          {/* Embed Links */}
          {article.embedLinks && article.embedLinks.length > 0 && (
            <div className="mb-12 p-6 bg-white/5 border border-purple-900/20 rounded-lg">
              <h3 className="text-2xl font-bold text-foreground mb-4">Related Resources</h3>
              <div className="space-y-3">
                {article.embedLinks.map((link: string, idx: number) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-accent hover:text-accent/80 hover:underline transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* PDF Download */}
          {article.pdf && (
            <div className="mb-12">
              <a href={article.pdf} download>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
                  Download PDF Guide
                  <ArrowRight size={20} />
                </Button>
              </a>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Transform Your Business?</h3>
            <p className="text-foreground/70 mb-6">
              Learn how OptimAI can help you implement AI and automation strategies tailored to your business needs.
            </p>
            <a href="/contact">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
                Get in Touch
                <ArrowRight size={20} />
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

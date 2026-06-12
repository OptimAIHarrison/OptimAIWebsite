// Comprehensive FAQ Data Structure optimized for AEO, AIO, and GEO
// AEO: Answer Engine Optimization (Google AI Overviews, Perplexity, etc.)
// AIO: AI Optimization (LLM-friendly structured content)
// GEO: Geographic Optimization (location-based answers)

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  subcategory?: string;
  keywords: string[];
  relatedQuestions: string[];
  cta?: string;
  ctaLink?: string;
  locations?: string[]; // For GEO optimization
  featured?: boolean; // For AEO featured snippets
}

export const FAQ_CATEGORIES = [
  "Getting Started",
  "Services",
  "Pricing & ROI",
  "Implementation",
  "Technology & Integration",
  "Support & Maintenance",
  "Case Studies & Results",
  "Contact & Next Steps"
];

export const FAQ_DATA: FAQItem[] = [
  // ===== GETTING STARTED =====
  {
    id: "gs-001",
    question: "What is OptimAI and what do you do?",
    answer: "OptimAI is an AI and automation consultancy that helps businesses scale with practical, understandable solutions. We specialize in eliminating manual work, improving efficiency, and enabling data-driven decision-making through intelligent automation and AI integration. Our mission is to make automation accessible and human-centered, so your team can focus on high-value work.",
    category: "Getting Started",
    keywords: ["OptimAI", "AI automation", "consultancy", "what is OptimAI", "about OptimAI"],
    relatedQuestions: ["gs-002", "svc-001"],
    featured: true,
  },
  {
    id: "gs-002",
    question: "How is OptimAI different from other automation agencies?",
    answer: "OptimAI stands out through our human-centered approach. We don't just implement technology - we enhance your team's capabilities. Our key differentiators include: (1) Practical, understandable solutions that your team can actually use, (2) Proven track record with 3-6 month ROI timelines, (3) Scalable solutions from quick wins to enterprise transformations, (4) Ongoing support and continuous optimization, (5) Focus on real business outcomes, not just technology for technology's sake.",
    category: "Getting Started",
    keywords: ["difference", "why OptimAI", "unique", "better than", "competitive advantage"],
    relatedQuestions: ["gs-001", "case-001"],
    featured: true,
  },
  {
    id: "gs-003",
    question: "Is OptimAI right for my business?",
    answer: "OptimAI is ideal if you: (1) Spend significant time on manual, repetitive tasks, (2) Want to improve efficiency and reduce operational costs, (3) Are looking to scale without proportionally increasing headcount, (4) Want to make data-driven decisions with better insights, (5) Are ready to invest in automation and AI solutions. We work with businesses of all sizes - from 1-person startups to 500+ employee enterprises. The key is having clear goals and a willingness to embrace automation.",
    category: "Getting Started",
    keywords: ["right for me", "suitable", "fit", "qualify", "good fit", "startup", "enterprise"],
    relatedQuestions: ["gs-004", "pricing-001"],
    featured: true,
  },
  {
    id: "gs-004",
    question: "What company sizes do you work with?",
    answer: "We work with businesses of all sizes: (1) 1-10 employees: Perfect for focused automation projects with high ROI, (2) 11-50 employees: Growing businesses looking to scale operations, (3) 50-200 employees: Established companies optimizing workflows, (4) 200+ employees: Enterprise-wide digital transformations. Regardless of size, we tailor solutions to your specific needs, budget, and timeline.",
    category: "Getting Started",
    keywords: ["company size", "startup", "enterprise", "small business", "large company", "team size"],
    relatedQuestions: ["gs-003", "impl-001"],
  },

  // ===== SERVICES =====
  {
    id: "svc-001",
    question: "What are OptimAI's core services?",
    answer: "OptimAI offers five core services: (1) Strategic Advisory & Consulting - Expert guidance on automation and AI adoption, (2) Marketing & Growth Automation - Automate campaigns and customer engagement, (3) Business Process Automation - Eliminate manual work and improve efficiency, (4) AI Integration & Analytics - Integrate AI for smarter decisions, (5) Managed Services & Support (if needed) - Ongoing optimisation and continuous improvement. Each service is designed to address specific business challenges and deliver measurable ROI.",
    category: "Services",
    keywords: ["services", "what do you offer", "solutions", "offerings", "core services"],
    relatedQuestions: ["svc-002", "svc-003", "svc-004", "svc-005"],
    featured: true,
  },
  {
    id: "svc-002",
    question: "What is Strategic Advisory & Consulting?",
    answer: "Strategic Advisory & Consulting helps you understand where automation can have the biggest business impact. We analyze your current processes, identify high-value opportunities, and create a clear implementation roadmap. This service includes: (1) Readiness Assessment - Evaluate your current processes and technology, (2) Strategy & Roadmap - Create a step-by-step implementation plan, (3) Technology Review - Assess your tools and recommend solutions, (4) ROI Projection - Show estimated time and cost savings.",
    category: "Services",
    subcategory: "Strategic Advisory",
    keywords: ["strategic advisory", "consulting", "readiness assessment", "roadmap", "strategy"],
    relatedQuestions: ["svc-001", "impl-001"],
  },
  {
    id: "svc-003",
    question: "What is Business Process Automation (BPA)?",
    answer: "Business Process Automation (BPA) eliminates repetitive manual tasks and streamlines workflows. We automate processes like: (1) Data entry and processing, (2) Invoice and payment processing, (3) Scheduling and calendar management, (4) Report generation and distribution, (5) Customer follow-ups and reminders. BPA is perfect for companies spending excessive time on manual work. Most clients see 40-80% time savings on automated processes.",
    category: "Services",
    subcategory: "Business Process Automation",
    keywords: ["business process automation", "BPA", "automate workflows", "manual tasks", "efficiency"],
    relatedQuestions: ["svc-001", "case-001", "case-002"],
    featured: true,
  },
  {
    id: "svc-004",
    question: "What is Marketing & Growth Automation?",
    answer: "Marketing & Growth Automation helps you generate more leads and engage customers automatically. We set up systems that work 24/7 to nurture prospects and improve conversion rates. This includes: (1) Email campaign automation and nurture sequences, (2) Lead scoring and qualification, (3) Social media posting and engagement, (4) Customer follow-ups and reminders, (5) Webinar and event automation. Clients typically see 35%+ increase in conversion rates.",
    category: "Services",
    subcategory: "Marketing Automation",
    keywords: ["marketing automation", "lead generation", "customer engagement", "growth", "sales"],
    relatedQuestions: ["svc-001", "case-003"],
  },
  {
    id: "svc-005",
    question: "What is AI Integration & Analytics?",
    answer: "AI Integration & Analytics helps you make smarter business decisions by integrating AI into your existing systems. We set up: (1) Predictive analytics and forecasting, (2) AI-powered customer insights, (3) Automated reporting and dashboards, (4) Data consolidation and analysis, (5) Machine learning models for specific use cases. This transforms raw data into actionable intelligence.",
    category: "Services",
    subcategory: "AI Integration",
    keywords: ["AI integration", "data analytics", "machine learning", "data-driven", "insights"],
    relatedQuestions: ["svc-001", "tech-001"],
  },

  // ===== PRICING & ROI =====
  {
    id: "pricing-001",
    question: "How much does OptimAI cost?",
    answer: "We offer flexible pricing models to fit different business needs: (1) Fixed Fee Projects - Ideal for specific, well-defined projects, (2) Project-Based Pricing - For larger initiatives with variable scope, (3) Managed Retainer - Ongoing support with predictable monthly costs. Most implementations range from $5,000 to $50,000+ depending on complexity. We typically see ROI within 3-6 months for most implementations. For a personalized quote, schedule a free audit.",
    category: "Pricing & ROI",
    keywords: ["cost", "price", "pricing", "how much", "investment", "budget"],
    relatedQuestions: ["pricing-002", "pricing-003"],
    featured: true,
  },
  {
    id: "pricing-002",
    question: "What's the typical ROI timeline?",
    answer: "Most clients see measurable ROI within 3-6 months: (1) Quick Wins (1-3 months) - Small, focused automation projects with immediate impact, (2) Medium-term (3-6 months) - Larger initiatives with multiple processes, (3) Long-term (6+ months) - Enterprise-wide transformations. Many clients see initial results within the first month. The exact timeline depends on project scope, complexity, and your team's adoption speed.",
    category: "Pricing & ROI",
    keywords: ["ROI", "timeline", "return on investment", "payback", "how long"],
    relatedQuestions: ["pricing-001", "case-001"],
    featured: true,
  },
  {
    id: "pricing-003",
    question: "Do you offer a free consultation or audit?",
    answer: "Yes! We offer a Free AI & Automation Audit where our experts analyze your business and provide personalized recommendations at no cost. During the audit, we: (1) Assess your current processes and pain points, (2) Identify high-value automation opportunities, (3) Estimate potential time and cost savings, (4) Provide a clear implementation roadmap, (5) Answer all your questions. This is a great way to understand where automation can help and what the potential ROI could be.",
    category: "Pricing & ROI",
    keywords: ["free", "trial", "consultation", "no cost", "audit", "free audit"],
    relatedQuestions: ["pricing-001", "gs-003"],
    featured: true,
  },

  // ===== IMPLEMENTATION =====
  {
    id: "impl-001",
    question: "What is your typical implementation process?",
    answer: "Our implementation process follows a proven 6-step approach: (1) Discovery & Assessment - Analyze your current processes and identify opportunities, (2) Strategy & Planning - Create a detailed roadmap and timeline, (3) Setup & Configuration - Implement the automation solution, (4) Testing & Optimisation - Thoroughly test and optimize performance, (5) Training & Handoff - Train your team on the new system, (6) Support & Optimisation - Provide ongoing support and continuous improvement. The entire process typically takes 1-6 months depending on scope.",
    category: "Implementation",
    keywords: ["process", "how does it work", "steps", "implementation", "workflow"],
    relatedQuestions: ["impl-002", "impl-003"],
    featured: true,
  },
  {
    id: "impl-002",
    question: "How long does implementation typically take?",
    answer: "Implementation timelines vary based on project scope: (1) Quick Wins (1-3 months) - Small, focused automation projects, (2) Medium-term (3-6 months) - Larger initiatives with multiple processes, (3) Long-term (6+ months) - Enterprise-wide transformations. Most clients see initial results within the first month. We work closely with you to minimize disruption to your business.",
    category: "Implementation",
    keywords: ["timeline", "how long", "duration", "implementation", "how fast"],
    relatedQuestions: ["impl-001", "impl-003"],
  },
  {
    id: "impl-003",
    question: "Will implementation disrupt my business?",
    answer: "We minimize disruption by: (1) Planning carefully to avoid peak business periods, (2) Implementing in phases rather than all at once, (3) Providing thorough training before going live, (4) Maintaining parallel systems during transition, (5) Offering 24/7 support during critical periods. Most businesses experience minimal disruption, and many see productivity improvements immediately after implementation.",
    category: "Implementation",
    keywords: ["disruption", "downtime", "business impact", "risk", "transition"],
    relatedQuestions: ["impl-001", "supp-001"],
  },

  // ===== TECHNOLOGY & INTEGRATION =====
  {
    id: "tech-001",
    question: "What tools and platforms do you work with?",
    answer: "We work with a wide range of industry-leading tools: (1) Automation Platforms - Zapier, Make, n8n, and custom solutions, (2) AI & Analytics - OpenAI, custom ML models, data warehouses, (3) CRM & Marketing - HubSpot, Salesforce, Marketo, (4) Business Tools - Airtable, Notion, Google Workspace, Microsoft 365, (5) Custom Integrations - We can integrate virtually any system. If your specific tool isn't listed, we likely can still work with it.",
    category: "Technology & Integration",
    keywords: ["tools", "platforms", "technology", "integration", "software", "systems"],
    relatedQuestions: ["tech-002", "tech-003"],
    featured: true,
  },
  {
    id: "tech-002",
    question: "Can you integrate with our existing systems?",
    answer: "Yes! We specialize in integrating with existing systems. Whether you use Salesforce, HubSpot, QuickBooks, or custom software, we can connect them with automation and AI solutions. Our approach: (1) Assess your current tech stack, (2) Identify integration opportunities, (3) Build custom connectors if needed, (4) Ensure data flows seamlessly, (5) Test thoroughly before going live. Most integrations are completed within 2-4 weeks.",
    category: "Technology & Integration",
    keywords: ["integrate", "integration", "existing", "current system", "compatibility"],
    relatedQuestions: ["tech-001", "impl-001"],
    featured: true,
  },
  {
    id: "tech-003",
    question: "Is my data secure with OptimAI?",
    answer: "Data security is our top priority. We implement: (1) Enterprise-grade encryption for data in transit and at rest, (2) Regular security audits and penetration testing, (3) Compliance with GDPR, CCPA, and industry standards, (4) Secure API connections and authentication, (5) Regular backups and disaster recovery plans, (6) Limited access controls with role-based permissions. We sign comprehensive NDAs and security agreements with all clients.",
    category: "Technology & Integration",
    keywords: ["security", "data security", "privacy", "encryption", "compliance", "GDPR"],
    relatedQuestions: ["tech-001", "supp-001"],
    featured: true,
  },

  // ===== SUPPORT & MAINTENANCE =====
  {
    id: "supp-001",
    question: "What support do you provide after implementation?",
    answer: "We provide comprehensive post-implementation support: (1) 30-day intensive support period with daily check-ins, (2) Ongoing monitoring and performance optimization, (3) Monthly strategy reviews and recommendations, (4) Proactive issue resolution before problems occur, (5) Continuous training for new team members, (6) Regular updates and improvements. Support can be project-based or through our Managed Services retainer.",
    category: "Support & Maintenance",
    keywords: ["support", "after implementation", "maintenance", "ongoing", "help"],
    relatedQuestions: ["supp-002", "svc-001"],
    featured: true,
  },
  {
    id: "supp-002",
    question: "How do I get help if something breaks?",
    answer: "We provide multiple support channels: (1) Email support - Response within 24 hours, (2) Phone support - For urgent issues, (3) Live chat - Quick questions and troubleshooting, (4) Dedicated support portal - Track issues and solutions, (5) Emergency hotline - For critical business-impacting issues. Response times depend on your support plan. Most issues are resolved within 24-48 hours.",
    category: "Support & Maintenance",
    keywords: ["help", "support", "issue", "problem", "broken", "emergency"],
    relatedQuestions: ["supp-001", "contact-001"],
  },

  // ===== CASE STUDIES & RESULTS =====
  {
    id: "case-001",
    question: "Do you have case studies showing real results?",
    answer: "Yes! We have several case studies demonstrating real business impact: (1) 80% reduction in manual data entry work, (2) 35% increase in lead conversion rates, (3) 60% improvement in customer response times, (4) $500K+ annual savings through process automation, (5) 3-month ROI on automation investments. Our clients span various industries including e-commerce, SaaS, professional services, and manufacturing. View our full case studies to see detailed results.",
    category: "Case Studies & Results",
    keywords: ["case studies", "examples", "success stories", "results", "clients"],
    relatedQuestions: ["case-002", "case-003"],
    featured: true,
  },
  {
    id: "case-002",
    question: "What kind of time savings can we expect?",
    answer: "Time savings vary by process, but typical results include: (1) Data entry & processing - 40-80% time reduction, (2) Report generation - 50-90% time reduction, (3) Customer follow-ups - 60-85% time reduction, (4) Invoice processing - 70-95% time reduction, (5) Scheduling - 80-100% automation. For a business with 5 employees spending 20 hours/week on manual tasks, automation could free up 80-160 hours/month - equivalent to 1-2 full-time employees.",
    category: "Case Studies & Results",
    keywords: ["time savings", "efficiency", "productivity", "hours saved", "time reduction"],
    relatedQuestions: ["case-001", "pricing-002"],
    featured: true,
  },
  {
    id: "case-003",
    question: "What's the average cost savings from automation?",
    answer: "Cost savings depend on your current operations, but typical results include: (1) Labor cost reduction - $50K-$500K+ annually depending on team size, (2) Error reduction - 5-15% fewer costly mistakes, (3) Faster processing - Reduced overhead and faster cash flow, (4) Improved efficiency - Lower operational costs per transaction. For example, a company automating invoice processing might save $100K+ annually in labor and error costs. We provide detailed ROI projections during your free audit.",
    category: "Case Studies & Results",
    keywords: ["cost savings", "savings", "ROI", "financial impact", "money saved"],
    relatedQuestions: ["case-001", "pricing-002"],
    featured: true,
  },

  // ===== CONTACT & NEXT STEPS =====
  {
    id: "contact-001",
    question: "How do I get started with OptimAI?",
    answer: "Getting started is easy: (1) Schedule a Free Audit - Book a 30-minute consultation with our team, (2) Assessment - We analyze your business and identify opportunities, (3) Proposal - Receive a detailed proposal with timeline and pricing, (4) Implementation - We handle everything from setup to training, (5) Ongoing Support - Continuous optimization and support. Start with our free audit to see if OptimAI is right for you.",
    category: "Contact & Next Steps",
    keywords: ["get started", "start", "begin", "how to start", "next steps"],
    relatedQuestions: ["contact-002", "pricing-003"],
    featured: true,
    cta: "Get Your Free Audit",
    ctaLink: "/audit",
  },
  {
    id: "contact-002",
    question: "How can I contact OptimAI?",
    answer: "You can reach us through multiple channels: (1) Email - hello@optimai.com.au, (2) Contact Form - Fill out our contact form and we'll respond within 24 hours, (3) Free Audit - Start with our free AI & Automation Audit, (4) Live Chat - Chat with us right now using our chatbot, (5) Phone - Available during business hours. We're here to answer your questions and help you find the right solution.",
    category: "Contact & Next Steps",
    keywords: ["contact", "reach out", "get in touch", "call", "email", "message"],
    relatedQuestions: ["contact-001", "contact-003"],
    featured: true,
    cta: "Contact Us",
    ctaLink: "/contact",
  },
  {
    id: "contact-003",
    question: "What's the next step after my free audit?",
    answer: "After your free audit, here's what happens next: (1) Detailed Report - You receive a comprehensive report with findings and recommendations, (2) Proposal - We provide a detailed proposal with timeline, pricing, and expected ROI, (3) Q&A Session - We answer all your questions about the proposal, (4) Decision - You decide if you want to move forward, (5) Onboarding - If you say yes, we begin the implementation process. There's no obligation - the audit is completely free.",
    category: "Contact & Next Steps",
    keywords: ["next step", "after audit", "what happens next", "proposal", "timeline"],
    relatedQuestions: ["contact-001", "impl-001"],
    featured: true,
  },
];

// Helper function to get FAQ by category
export function getFAQByCategory(category: string): FAQItem[] {
  return FAQ_DATA.filter((item) => item.category === category);
}

// Helper function to search FAQ
export function searchFAQ(query: string): FAQItem[] {
  const lowerQuery = query.toLowerCase();
  return FAQ_DATA.filter((item) => {
    const matchesQuestion = item.question.toLowerCase().includes(lowerQuery);
    const matchesAnswer = item.answer.toLowerCase().includes(lowerQuery);
    const matchesKeywords = item.keywords.some((keyword) =>
      keyword.toLowerCase().includes(lowerQuery)
    );
    return matchesQuestion || matchesAnswer || matchesKeywords;
  });
}

// Helper function to get featured FAQs (for AEO optimization)
export function getFeaturedFAQs(): FAQItem[] {
  return FAQ_DATA.filter((item) => item.featured);
}

// Helper function to get related FAQs
export function getRelatedFAQs(faqId: string): FAQItem[] {
  const faq = FAQ_DATA.find((item) => item.id === faqId);
  if (!faq) return [];
  return faq.relatedQuestions
    .map((id) => FAQ_DATA.find((item) => item.id === id))
    .filter((item): item is FAQItem => item !== undefined);
}

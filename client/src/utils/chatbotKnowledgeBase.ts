// Chatbot Knowledge Base Utility
// This utility provides intelligent question matching and response generation
// based on the CHATBOT_KNOWLEDGE_BASE.md file

interface QAEntry {
  keywords: string[];
  answer: string;
  pageSuggestions: string[];
}

interface MatchResult {
  confidence: number;
  answer: string;
  pageSuggestions: string[];
}

// Knowledge base entries - extracted from CHATBOT_KNOWLEDGE_BASE.md
const knowledgeBase: Record<string, QAEntry[]> = {
  serviceInquiry: [
    {
      keywords: ["services", "what do you do", "offerings", "solutions", "help with"],
      answer: "OptimAI offers five core services to help businesses scale with AI and automation:\n\n1. **Strategic Advisory & Consulting** - Expert guidance on automation and AI adoption\n2. **Marketing & Growth Automation** - Automate campaigns and customer engagement\n3. **Business Process Automation** - Eliminate manual work and improve efficiency\n4. **AI Integration & Analytics** - Integrate AI into your systems for smarter decisions\n5. **Managed Services & Support** - Ongoing optimization and continuous improvement",
      pageSuggestions: [
        "[View All Services](/services)",
        "[Our Core Services](#core-services)",
        "[Ready to Go Products](/products)",
        "[Take Our Service Finder Quiz](/services)",
        "[Get Your Free Audit](/audit)"
      ]
    },
    {
      keywords: ["strategic advisory", "consulting", "readiness assessment", "roadmap", "strategy"],
      answer: "Strategic Advisory & Consulting helps you understand where automation can have the biggest impact on your business. We analyze your current processes, identify opportunities, and create a clear roadmap for implementing AI and automation solutions.\n\n**What we do:**\n- Readiness Assessment: Evaluate your current processes and technology\n- Strategy & Roadmap: Create a step-by-step implementation plan\n- Technology Review: Assess your tools and recommend the best solutions",
      pageSuggestions: [
        "[Learn More About Strategic Advisory](/services)",
        "[Our Core Services](#core-services)",
        "[Get Your Free Audit](/audit)",
        "[Ready to Go Products](/products)"
      ]
    },
    {
      keywords: ["business process automation", "BPA", "automate workflows", "manual tasks", "efficiency"],
      answer: "Business Process Automation (BPA) helps you eliminate repetitive manual tasks and streamline your workflows. We automate processes like data entry, invoice processing, scheduling, and more—so your team can focus on high-value work.\n\n**Perfect for:** Companies spending too much time on manual, repetitive tasks",
      pageSuggestions: [
        "[Learn More About BPA](/services)",
        "[Our Core Services](#core-services)",
        "[See Case Studies](/case-studies)",
        "[Ready to Go Products](/products)",
        "[Get Your Free Audit](/audit)"
      ]
    },
    {
      keywords: ["marketing automation", "lead generation", "customer engagement", "growth", "sales"],
      answer: "Marketing & Growth Automation helps you generate more leads and engage customers automatically. We set up systems that work 24/7 to nurture prospects, improve conversion rates, and accelerate your sales pipeline.\n\n**What we automate:**\n- Email campaigns and nurture sequences\n- Lead scoring and qualification\n- Social media posting and engagement\n- Customer follow-ups and reminders",
      pageSuggestions: [
        "[Learn More About Marketing Automation](/services)",
        "[Our Core Services](#core-services)",
        "[Check Our ROI Calculator](/roi-calculator)",
        "[Ready to Go Products](/products)",
        "[Get Your Free Audit](/audit)"
      ]
    },
    {
      keywords: ["AI integration", "data analytics", "machine learning", "data-driven", "insights"],
      answer: "AI Integration & Analytics helps you make smarter business decisions by integrating AI into your existing systems. We set up data pipelines, predictive analytics, and AI-powered insights so you can understand your business better and act faster.\n\n**What we integrate:**\n- Predictive analytics and forecasting\n- AI-powered customer insights\n- Automated reporting and dashboards\n- Data consolidation and analysis",
      pageSuggestions: [
        "[Learn More About AI Integration](/services)",
        "[Our Core Services](#core-services)",
        "[Get Your Free Audit](/audit)",
        "[Ready to Go Products](/products)"
      ]
    },
    {
      keywords: ["managed services", "ongoing support", "maintenance", "monitoring", "optimization"],
      answer: "Managed Services & Support provides ongoing optimization and peace of mind. We monitor your automation systems, continuously improve performance, and handle updates and maintenance so you can focus on your business.\n\n**What we provide:**\n- 24/7 monitoring and support\n- Performance optimization\n- Regular updates and improvements\n- Proactive issue resolution",
      pageSuggestions: [
        "[Learn More About Managed Services](/services)",
        "[Our Core Services](#core-services)",
        "[Contact Us](/contact)",
        "[Get Your Free Audit](/audit)"
      ]
    }
  ],
  pricing: [
    {
      keywords: ["cost", "price", "pricing", "how much", "investment", "budget"],
      answer: "We offer flexible pricing models to fit different business needs:\n\n1. **Fixed Fee Projects** - Ideal for specific, well-defined projects\n2. **Project-Based Pricing** - For larger initiatives with variable scope\n3. **Managed Retainer** - Ongoing support with predictable monthly costs\n\nWe typically see ROI within 3-6 months for most implementations.",
      pageSuggestions: [
        "[View Pricing Details](/pricing)",
        "[Calculate Your ROI](/roi-calculator)",
        "[Get Your Free Audit](/audit)",
        "[Ready to Go Products](/products)"
      ]
    },
    {
      keywords: ["free", "trial", "consultation", "no cost", "audit"],
      answer: "Yes! We offer a **Free AI & Automation Audit** where our experts analyze your business and provide personalized recommendations at no cost. This is a great way to understand where automation can help you and what the potential ROI could be.",
      pageSuggestions: [
        "[Get Your Free Audit](/audit)",
        "[Contact Us](/contact)"
      ]
    }
  ],
  process: [
    {
      keywords: ["timeline", "how long", "duration", "implementation", "how fast"],
      answer: "Implementation timelines vary based on project scope:\n\n- **Quick Wins (1-3 months)** - Small, focused automation projects\n- **Medium-term (3-6 months)** - Larger initiatives with multiple processes\n- **Long-term (6+ months)** - Enterprise-wide transformations\n\nMost clients see initial results within the first month.",
      pageSuggestions: [
        "[Get Your Free Audit](/audit)",
        "[View Case Studies](/case-studies)",
        "[Contact Us](/contact)"
      ]
    },
    {
      keywords: ["process", "how does it work", "steps", "implementation", "workflow"],
      answer: "Our typical implementation process includes:\n\n1. **Discovery & Assessment** - Analyze your current processes\n2. **Strategy & Planning** - Create a detailed roadmap\n3. **Setup & Configuration** - Implement the solution\n4. **Testing & Optimization** - Thoroughly test and optimize\n5. **Training & Handoff** - Train your team\n6. **Support & Optimization** - Provide ongoing support",
      pageSuggestions: [
        "[Learn More About Our Process](/what-we-actually-do)",
        "[Our Core Services](#core-services)",
        "[Get Your Free Audit](/audit)",
        "[Contact Us](/contact)"
      ]
    }
  ],
  qualification: [
    {
      keywords: ["right for me", "fit", "suitable", "qualify", "good fit"],
      answer: "OptimAI is a great fit if you:\n- Spend significant time on manual, repetitive tasks\n- Want to improve efficiency and reduce costs\n- Are looking to scale without increasing headcount\n- Want to make data-driven decisions\n- Are ready to invest in automation and AI\n\n**Not sure?** Take our Service Finder Quiz to get personalized recommendations!",
      pageSuggestions: [
        "[Take Our Service Finder Quiz](/services)",
        "[Get Your Free Audit](/audit)",
        "[View Case Studies](/case-studies)",
        "[Our Core Services](#core-services)"
      ]
    },
    {
      keywords: ["company size", "startup", "enterprise", "small business", "large company"],
      answer: "We work with businesses of all sizes:\n\n- **1-10 employees** - Perfect for focused automation projects\n- **11-50 employees** - Growing businesses looking to scale\n- **50-200 employees** - Established companies optimizing operations\n- **200+ employees** - Enterprise-wide transformations\n\nThe key is having clear goals and a willingness to embrace automation.",
      pageSuggestions: [
        "[Get Your Free Audit](/audit)",
        "[View Case Studies](/case-studies)",
        "[Ready to Go Products](/products)"
      ]
    }
  ],
  general: [
    {
      keywords: ["about", "who are you", "company", "background", "OptimAI"],
      answer: "OptimAI is an AI and automation consultancy dedicated to helping businesses scale with practical, understandable solutions. We make automation accessible and human-centered, so your team can focus on what matters most.\n\n**Our mission:** Help businesses eliminate manual work, make smarter decisions, and grow faster with AI and automation.",
      pageSuggestions: [
        "[Learn About OptimAI](/about)",
        "[Why Choose OptimAI](/why-optimai)",
        "[Our Core Services](#core-services)"
      ]
    },
    {
      keywords: ["why", "choose", "difference", "unique", "advantage", "better"],
      answer: "Here's what sets OptimAI apart:\n\n1. **Practical & Understandable** - We explain things clearly\n2. **Human-Centered** - We enhance your team, not replace them\n3. **Scalable Solutions** - From small quick wins to enterprise transformations\n4. **Proven Results** - Clients see real ROI within 3-6 months\n5. **Ongoing Support** - We don't just implement and leave",
      pageSuggestions: [
        "[Why Choose OptimAI](/why-optimai)",
        "[View Case Studies](/case-studies)",
        "[Get Your Free Audit](/audit)"
      ]
    },
    {
      keywords: ["case studies", "examples", "success stories", "results", "clients"],
      answer: "Yes! We have several case studies showing how we've helped businesses achieve real results. Our clients have seen:\n\n- 80% reduction in manual work\n- 35% increase in conversion rates\n- 3-month ROI on automation investments\n- Significant time and cost savings",
      pageSuggestions: [
        "[View Case Studies](/case-studies)",
        "[Get Your Free Audit](/audit)",
        "[Our Core Services](#core-services)"
      ]
    }
  ],
  technical: [
    {
      keywords: ["tools", "platforms", "technology", "integration", "software", "systems"],
      answer: "We work with a wide range of tools and platforms:\n\n- **Automation Platforms:** Zapier, Make, n8n, and custom solutions\n- **AI & Analytics:** OpenAI, custom ML models, data warehouses\n- **CRM & Marketing:** HubSpot, Salesforce, Marketo\n- **Business Tools:** Airtable, Notion, Google Workspace, Microsoft 365\n- **Custom Integrations:** We can integrate virtually any system",
      pageSuggestions: [
        "[Get Your Free Audit](/audit)",
        "[Contact Us](/contact)",
        "[Our Core Services](#core-services)"
      ]
    },
    {
      keywords: ["integrate", "integration", "existing", "current system", "compatibility"],
      answer: "Yes! We specialize in integrating with existing systems. Whether you use Salesforce, HubSpot, QuickBooks, or custom software, we can connect them with automation and AI solutions.\n\n**Our approach:**\n- Assess your current tech stack\n- Identify integration opportunities\n- Build custom connectors if needed\n- Ensure data flows seamlessly",
      pageSuggestions: [
        "[Get Your Free Audit](/audit)",
        "[Contact Us](/contact)",
        "[AI Integration Service](/services)"
      ]
    }
  ],
  contact: [
    {
      keywords: ["contact", "reach out", "get in touch", "call", "email", "message"],
      answer: "You can reach us in several ways:\n\n- **Email:** hello@optimai.com.au\n- **Contact Form:** Fill out our contact form and we'll get back to you within 24 hours\n- **Free Audit:** Start with our free AI & Automation Audit\n- **Live Chat:** You're chatting with us right now!",
      pageSuggestions: [
        "[Contact Us](/contact)",
        "[Get Your Free Audit](/audit)",
        "**[Send a Message](#send-message)** - Click here to send a detailed message"
      ]
    },
    {
      keywords: ["call", "consultation", "meeting", "discuss", "talk"],
      answer: "Absolutely! We offer free consultation calls to discuss your business needs and explore how OptimAI can help.",
      pageSuggestions: [
        "[Contact Us](/contact)",
        "[Get Your Free Audit](/audit)"
      ]
    }
  ],
  products: [
    {
      keywords: ["ready to go", "products", "pre-built", "templates", "quick solutions", "marketplace"],
      answer: "Ready to Go Products are pre-built, turnkey automation solutions designed for common business challenges. They're faster and more affordable than custom implementations, perfect for businesses looking for quick wins.\n\n**Our current Ready to Go Products include solutions for:**\n- Customer support automation\n- Email marketing workflows\n- Lead generation and qualification\n- Data processing and reporting\n- And more!",
      pageSuggestions: [
        "[View Ready to Go Products](/products)",
        "[Our Marketplace](/products)",
        "[Our Core Services](#core-services)",
        "[Get Your Free Audit](/audit)"
      ]
    },
    {
      keywords: ["quick", "fast", "start", "ready to go", "implementation", "marketplace"],
      answer: "Ready to Go Products are designed for speed! Most can be set up and running within 1-2 weeks, depending on your specific setup and integrations needed.",
      pageSuggestions: [
        "[View Ready to Go Products](/products)",
        "[Our Marketplace](/products)",
        "**[Send a Message](#send-message)** - Ask about specific product timelines",
        "[Get Your Free Audit](/audit)"
      ]
    }
  ]
};

// Calculate similarity between two strings (simple Levenshtein-based approach)
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Calculate Levenshtein distance
function getEditDistance(s1: string, s2: string): number {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// Find best matching Q&A entry
export function findBestMatch(userMessage: string): MatchResult | null {
  let bestMatch: MatchResult | null = null;
  let highestConfidence = 0;

  const userWords = userMessage.toLowerCase().split(/\s+/);

  // Search through all categories
  Object.values(knowledgeBase).forEach((entries) => {
    entries.forEach((entry) => {
      // Check keyword matches
      let matchScore = 0;
      entry.keywords.forEach((keyword) => {
        const similarity = calculateSimilarity(userMessage, keyword);
        if (similarity > 0.6) {
          matchScore += similarity;
        }
      });

      // Check individual word matches
      userWords.forEach((word) => {
        entry.keywords.forEach((keyword) => {
          if (keyword.includes(word) && word.length > 2) {
            matchScore += 0.3;
          }
        });
      });

      // Normalize score
      const confidence = Math.min(1, matchScore / entry.keywords.length);

      if (confidence > highestConfidence) {
        highestConfidence = confidence;
        bestMatch = {
          confidence,
          answer: entry.answer,
          pageSuggestions: entry.pageSuggestions
        };
      }
    });
  });

  return bestMatch;
}

// Get fallback response based on attempt count
export function getFallbackResponse(attemptCount: number): { answer: string; pageSuggestions: string[] } {
  if (attemptCount < 2) {
    return {
      answer: "I'm not sure I understood that correctly. Here are some things I can help with:\n- Learn about our services\n- Understand pricing and ROI\n- Get your free audit\n- Browse Ready to Go Products\n- Schedule a consultation\n\nOr, send a message to our team and they'll get back to you within 24 hours.",
      pageSuggestions: [
        "[View All Services](/services)",
        "[Our Core Services](#core-services)",
        "[Get Your Free Audit](/audit)",
        "[Ready to Go Products](/products)",
        "[Contact Us](/contact)"
      ]
    };
  } else {
    return {
      answer: "I'm having trouble understanding your question. Let me connect you with our team who can help better. They'll respond within 24 hours.",
      pageSuggestions: [
        "**[Send a Message](#send-message)** - Contact our team",
        "[Contact Us](/contact)"
      ]
    };
  }
}

// Format response with page suggestions
export function formatResponse(answer: string, pageSuggestions: string[]): string {
  const suggestionsText = pageSuggestions.join(" | ");
  return `${answer}\n\n${suggestionsText}`;
}

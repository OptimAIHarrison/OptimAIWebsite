export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

// OptimAI branding and content constants
export const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450259077/VZWvecVBL3bTuGctm3Rvj5/OptimAI_Light_Purple_InifnityArrow_be421b66.png";
export const LOGO_ICON_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450259077/VZWvecVBL3bTuGctm3Rvj5/OptimAI_Light_Purple_InifnityArrow_be421b66.png";

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "All Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Why OptimAI", href: "/why-optimai" },
  { label: "Contact", href: "/contact" },
];

export const WHY_OPTIMAI_HREF = "/why-optimai";

export const SERVICES = [
  {
    id: "strategic-advisory",
    title: "Our Core Services - Strategic Advisory & Consulting",
    description: "Expert guidance on automation and AI adoption tailored for your business",
    icon: "🎯",
    details: [
      "Automation & AI Readiness Assessment",
      "Growth Strategy & Roadmapping",
      "Technology Stack Optimization",
    ],
    technicalDetails: "Comprehensive evaluation of current business processes, technology maturity, and data infrastructure to identify high-impact automation opportunities aligned with your growth trajectory.",
  },
  {
    id: "marketing-automation",
    title: "Marketing & Growth Automation",
    description: "Automated marketing systems to enhance visibility and lead generation",
    icon: "📈",
    details: [
      "AI Search Optimization (AIO)",
      "AI Answer Optimization (AEO)",
      "Automated Lead Generation Systems",
      "Content Marketing Automation",
    ],
    technicalDetails: "Implementation of AI-driven search optimization, CRM automation, email marketing sequences, and social media scheduling to nurture leads and accelerate customer acquisition.",
  },
  {
    id: "business-automation",
    title: "Business Process Automation (BPA)",
    description: "Streamline operational workflows and reduce manual effort",
    icon: "⚙️",
    details: [
      "Process Discovery & Optimization",
      "Robotic Process Automation (RPA)",
      "Workflow Automation",
      "Custom AI Chatbots",
    ],
    technicalDetails: "Analysis of existing workflows to identify bottlenecks, deployment of software robots for rule-based tasks, and development of intelligent chatbots trained on business-specific knowledge.",
  },
  {
    id: "ai-integration",
    title: "End-to-End AI Integration",
    description: "Seamless integration of advanced AI capabilities with existing systems",
    icon: "🤖",
    details: [
      "Intelligent Document Processing (IDP)",
      "AI-Powered Data Analytics",
      "Generative AI Solutions",
      "System Integration",
    ],
    technicalDetails: "Integration of AI models for predictive analytics, customer segmentation, advanced content generation, and seamless connection with existing CRM, ERP, and accounting platforms.",
  },
  {
    id: "managed-services",
    title: "Managed Services & Training",
    description: "Ongoing support, optimization, and team upskilling",
    icon: "🛡️",
    details: [
      "Ongoing Support & Maintenance",
      "Performance Monitoring & Optimization",
      "Team Training & Upskilling",
    ],
    technicalDetails: "Continuous monitoring and refinement of deployed solutions, regular performance reviews, and comprehensive training programs to empower your team to manage and optimize new technologies.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO, TechStart Co",
    content: "OptimAI transformed our operations. We went from manual processes taking 40 hours per week to fully automated workflows. The ROI was immediate.",
    image: "👩‍💼",
  },
  {
    name: "Marcus Johnson",
    role: "Operations Director, GrowthHub SME",
    content: "The team at OptimAI understood our pain points instantly. Their AI integration saved us $150k annually while improving our customer satisfaction scores.",
    image: "👨‍💼",
  },
  {
    name: "Elena Rodriguez",
    role: "Founder, Innovation Labs",
    content: "What impressed me most was how practical and implementable their solutions were. No fluff, just real results that directly impacted our bottom line.",
    image: "👩‍🔬",
  },
];

export const CASE_STUDIES = [
  {
    title: "E-Commerce Platform Automation",
    client: "Digital Retail Solutions",
    challenge: "Manual order processing taking 20+ hours daily",
    solution: "Implemented RPA and AI-powered inventory management",
    results: {
      timeSaved: "85%",
      costSavings: "$120,000",
      productivityGain: "3.5x",
    },
    metrics: [
      { label: "Processing Time", before: "20 hours", after: "3 hours" },
      { label: "Error Rate", before: "8%", after: "0.5%" },
      { label: "Customer Satisfaction", before: "78%", after: "94%" },
    ],
  },
  {
    title: "Marketing Automation for SaaS",
    client: "CloudFlow Technologies",
    challenge: "Lead generation bottleneck, low conversion rates",
    solution: "AI-powered lead scoring and marketing automation",
    results: {
      timeSaved: "60%",
      costSavings: "$85,000",
      productivityGain: "2.8x",
    },
    metrics: [
      { label: "Lead Quality Score", before: "42%", after: "78%" },
      { label: "Conversion Rate", before: "2.1%", after: "5.8%" },
      { label: "Sales Cycle", before: "45 days", after: "18 days" },
    ],
  },
  {
    title: "Customer Support AI Integration",
    client: "ServiceHub Startup",
    challenge: "Overwhelmed support team, high response times",
    solution: "Custom AI chatbot with intelligent routing",
    results: {
      timeSaved: "70%",
      costSavings: "$95,000",
      productivityGain: "4.2x",
    },
    metrics: [
      { label: "Response Time", before: "4 hours", after: "2 minutes" },
      { label: "Support Tickets Resolved", before: "60%", after: "89%" },
      { label: "Customer Satisfaction", before: "72%", after: "91%" },
    ],
  },
];

export const PRICING_TIERS = [
  {
    name: "Initial Assessment",
    description: "Perfect for getting started",
    price: "Fixed Fee",
    features: [
      "Automation & AI Readiness Assessment",
      "Strategic Roadmap Development",
      "Technology Stack Recommendations",
      "Executive Summary Report",
    ],
    cta: "Get Your Free Audit",
    highlighted: false,
  },
  {
    name: "Project Implementation",
    description: "For specific automation needs",
    price: "$3,000 - $50,000+",
    features: [
      "Custom Solution Development",
      "Process Automation Setup",
      "AI Integration & Deployment",
      "Team Training & Documentation",
      "3-Month Support Included",
    ],
    cta: "Check out what we do",
    highlighted: true,
  },
  {
    name: "Managed Services",
    description: "Ongoing optimization & support",
    price: "$500 - $5,000+/month",
    features: [
      "24/7 Monitoring & Support",
      "Performance Optimization",
      "Continuous Improvements",
      "Monthly Strategy Reviews",
      "Team Training & Updates",
    ],
    cta: "Schedule Consultation",
    highlighted: false,
  },
];

export const FAQ_ITEMS = [
  {
    question: "What's the typical ROI timeline for AI and automation projects?",
    answer: "Most clients see measurable ROI within 3-6 months of implementation. Quick wins like process automation often show results within weeks, while comprehensive AI integration typically delivers full ROI within 6-12 months.",
  },
  {
    question: "Do I need technical expertise to implement your solutions?",
    answer: "No. Our team handles all technical implementation. We provide comprehensive training to your team so they can manage and optimize the solutions post-deployment. We believe in empowering your team, not creating dependency.",
  },
  {
    question: "How do you ensure data security and compliance?",
    answer: "We follow industry best practices including encryption, secure API integrations, and compliance with GDPR, CCPA, and other relevant regulations. All solutions are audited for security before deployment.",
  },
  {
    question: "Can your solutions integrate with our existing systems?",
    answer: "Absolutely. We specialize in seamless integration with existing CRM, ERP, accounting, and other business systems. Our approach is designed to enhance what you already have, not replace it.",
  },
  {
    question: "What if the solution doesn't meet our expectations?",
    answer: "We provide a 30-day optimization period where we fine-tune the solution based on your feedback. We're committed to your success and won't consider a project complete until you're satisfied with the results.",
  },
  {
    question: "How do you handle ongoing support and updates?",
    answer: "Our Managed Services tier includes 24/7 monitoring, regular optimization, and proactive updates. We continuously monitor performance metrics and suggest improvements to maximize your ROI.",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery & Assessment",
    description: "We conduct a comprehensive audit of your current processes, technology stack, and business goals to identify high-impact automation opportunities.",
    timeline: "Week 1-2",
  },
  {
    number: "02",
    title: "Strategy & Roadmap",
    description: "Based on our findings, we develop a tailored roadmap with clear milestones, expected ROI, and implementation timeline aligned with your business objectives.",
    timeline: "Week 3",
  },
  {
    number: "03",
    title: "Solution Design",
    description: "Our team designs custom solutions that integrate seamlessly with your existing systems. We present prototypes and get your approval before development.",
    timeline: "Week 4-5",
  },
  {
    number: "04",
    title: "Implementation",
    description: "We deploy the solution with minimal disruption to your operations. Our team handles all technical work while keeping you informed of progress.",
    timeline: "Week 6-10",
  },
  {
    number: "05",
    title: "Training & Optimization",
    description: "We train your team on the new systems and conduct performance optimization. We're available for support during the critical first 30 days.",
    timeline: "Week 11-12",
  },
  {
    number: "06",
    title: "Ongoing Support",
    description: "Transition to managed services for continuous monitoring, optimization, and strategic guidance. We're your partner for long-term success.",
    timeline: "Ongoing",
  },
];

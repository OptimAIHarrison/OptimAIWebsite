import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Check, Clock, Package, Send, Search, Filter, ChevronDown, Bot, Mail, Database, Layers, Zap, Globe, BarChart2, Map, Star, FileText, CreditCard, FileEdit, Repeat, Brain, TrendingUp, Users, FileCheck, Receipt, PieChart, Share2, UserCheck, UserPlus, BadgeCheck } from "lucide-react";

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  "chatbot": <Bot size={36} className="text-purple-400" />,
  "email-marketing": <Mail size={36} className="text-purple-400" />,
  "crm-build": <Database size={36} className="text-purple-400" />,
  "full-stack-setup": <Layers size={36} className="text-purple-400" />,
  "process-automation": <Zap size={36} className="text-purple-400" />,
  "website-optimization": <Globe size={36} className="text-purple-400" />,
  "bi-dashboard": <BarChart2 size={36} className="text-purple-400" />,
  "customer-journey": <Map size={36} className="text-purple-400" />,
  "feedback-automation": <Star size={36} className="text-purple-400" />,
  "proposal-automation": <FileText size={36} className="text-purple-400" />,
  "subscription-management": <CreditCard size={36} className="text-purple-400" />,
  "ai-content-generation": <Brain size={36} className="text-purple-400" />,
  "seo-optimization": <TrendingUp size={36} className="text-purple-400" />,
  "data-cleanup": <FileCheck size={36} className="text-purple-400" />,
  "ai-search-optimization": <Search size={36} className="text-purple-400" />,
  "social-media-automation": <Share2 size={36} className="text-purple-400" />,
  "onboarding-automation": <UserCheck size={36} className="text-purple-400" />,
  "hr-recruitment-automation": <UserPlus size={36} className="text-purple-400" />,
  "invoice-payment-automation": <Receipt size={36} className="text-purple-400" />,
  "reporting-automation": <PieChart size={36} className="text-purple-400" />,
};


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  timeline: string;
  tags: string[];
  businessTypes: string[];
  image: string;
  shortDescription: string;
  deliverables: string[];
  whatsIncluded: string[];
  process: string[];
  bestFor: string;
}

interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
}

const BUSINESS_TYPES = ["All", "Startups", "SME", "Corporate", "Agencies", "Service Providers"];

const PRODUCTS: Product[] = [
  {
    id: "chatbot",
    name: "AI Chatbot Setup",
    description: "Custom AI-powered chatbot for your website or business",
    shortDescription: "Automate customer interactions with intelligent chatbots",
    price: 2500,
    currency: "AUD",
    timeline: "2-3 weeks",
    tags: ["Automation", "Sales"],
    businessTypes: ["Startups", "SME", "Corporate", "Agencies"],
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "E-commerce, SaaS, Customer Support",
    deliverables: [
      "Custom AI chatbot trained on your business data",
      "Website integration (embed code provided)",
      "24/7 customer support automation",
      "Lead capture and qualification",
      "Analytics dashboard",
      "30 days of support and optimisation"
    ],
    whatsIncluded: [
      "Initial consultation and requirements gathering",
      "Chatbot design and configuration",
      "Integration with your website",
      "Training on your products and services",
      "Testing and quality assurance",
      "Staff training and documentation",
      "Performance monitoring for 30 days"
    ],
    process: [
      "Week 1: Discovery & Design — We learn about your business, customers, and goals",
      "Week 2: Development & Training — Build and train the chatbot on your data",
      "Week 3: Integration & Testing — Deploy to your website and optimise performance"
    ]
  },
  {
    id: "email-marketing",
    name: "Email Marketing Setup",
    description: "Complete email marketing system with automation and templates",
    shortDescription: "Build automated email sequences that convert",
    price: 1800,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Marketing", "Automation"],
    businessTypes: ["Startups", "SME", "Corporate", "Agencies"],
    image: "https://images.pexels.com/photos/6804079/pexels-photo-6804079.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "E-commerce, SaaS, Agencies",
    deliverables: [
      "Email marketing platform setup (Mailchimp, ConvertKit, etc.)",
      "5-10 email sequence templates",
      "Subscriber list migration and segmentation",
      "Automation workflows configured",
      "Welcome series and nurture sequences",
      "Performance tracking setup",
      "30 days of optimisation"
    ],
    whatsIncluded: [
      "Platform selection and setup",
      "List import and segmentation",
      "Email template design (5-10 templates)",
      "Automation workflow creation",
      "Integration with your CRM and website",
      "A/B testing strategy",
      "Staff training and best practices guide"
    ],
    process: [
      "Week 1: Platform Setup — Choose and configure your email platform",
      "Week 1-2: Sequence Design — Create email sequences tailored to your business",
      "Week 2: Integration & Launch — Connect to your systems and go live"
    ]
  },
  {
    id: "crm-build",
    name: "CRM Build & Setup",
    description: "Custom CRM system tailored to your business processes",
    shortDescription: "Organise customer data and automate sales workflows",
    price: "4000-5000",
    currency: "AUD",
    timeline: "3-4 weeks",
    tags: ["Systems", "Sales"],
    businessTypes: ["SME", "Corporate", "Agencies", "Service Providers"],
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Sales Teams, Service Providers, Agencies",
    deliverables: [
      "Custom CRM configured for your workflows",
      "Contact and lead management system",
      "Sales pipeline automation",
      "Custom fields and forms",
      "Reporting and analytics dashboards",
      "Integration with email and calendar",
      "Team training and documentation",
      "60 days of support"
    ],
    whatsIncluded: [
      "Business process mapping and analysis",
      "CRM platform selection and setup",
      "Custom field configuration",
      "Workflow automation setup",
      "Data migration from existing systems",
      "Integration with your existing tools",
      "Team training (up to 10 users)",
      "Custom reporting dashboards"
    ],
    process: [
      "Week 1: Discovery — Map your sales and customer processes",
      "Week 2-3: Build — Configure CRM, custom fields, and automations",
      "Week 4: Migration & Training — Move your data and train the team"
    ]
  },
  {
    id: "full-stack-setup",
    name: "Full Stack Business Setup",
    description: "Complete business automation for sole traders and small teams",
    shortDescription: "Everything you need to run your business efficiently",
    price: "7000+",
    currency: "AUD",
    timeline: "4-6 weeks",
    tags: ["Complete Setup", "Automation", "Systems"],
    businessTypes: ["Startups", "SME"],
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Sole Traders, Startups, Small Businesses",
    deliverables: [
      "CRM system (leads, clients, projects)",
      "Email marketing automation",
      "Booking and scheduling system",
      "Invoice and payment automation",
      "Website contact forms and lead capture",
      "Chatbot for customer support",
      "Reporting and analytics dashboard",
      "90 days of support and optimisation"
    ],
    whatsIncluded: [
      "Complete business process audit",
      "CRM setup and configuration",
      "Email marketing system setup",
      "Booking system integration",
      "Invoice automation setup",
      "Website optimisation for lead capture",
      "Chatbot implementation",
      "Team training and documentation",
      "Quarterly optimisation reviews"
    ],
    process: [
      "Week 1-2: Discovery & Planning — Understand your business and goals",
      "Week 2-4: System Setup — Configure all tools and integrations",
      "Week 4-6: Integration & Training — Connect systems and train your team"
    ]
  },
  {
    id: "process-automation",
    name: "Process Automation",
    description: "Automate repetitive business processes and workflows",
    shortDescription: "Save hours every week by eliminating manual tasks",
    price: "2000+",
    currency: "AUD",
    timeline: "2-3 weeks",
    tags: ["Automation"],
    businessTypes: ["Startups", "SME", "Corporate", "Agencies", "Service Providers"],
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business, All Industries",
    deliverables: [
      "Process audit and optimisation recommendations",
      "Automated workflows for 3-5 key processes",
      "Integration between your tools",
      "Error handling and monitoring",
      "Documentation and runbooks",
      "Team training",
      "30 days of monitoring and optimisation"
    ],
    whatsIncluded: [
      "Current process mapping and analysis",
      "Automation opportunity identification",
      "Workflow design and configuration",
      "Tool integration (Zapier, Make, n8n, etc.)",
      "Testing and error handling",
      "Documentation for your team",
      "Training on new workflows"
    ],
    process: [
      "Week 1: Audit — Document your current processes and identify bottlenecks",
      "Week 2: Design — Plan and map automation workflows",
      "Week 3: Build — Implement, test, and hand over"
    ]
  },
  {
    id: "website-optimization",
    name: "Website Lead Optimisation",
    description: "Optimise your website to capture and convert more leads",
    shortDescription: "Turn website visitors into qualified leads",
    price: 1500,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Marketing", "Sales"],
    businessTypes: ["Startups", "SME", "Corporate", "Service Providers"],
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Service Providers, Consultants, Agencies",
    deliverables: [
      "Website audit and conversion recommendations",
      "Lead capture forms (3-5 forms)",
      "Automated lead routing",
      "Lead qualification system",
      "Follow-up automation",
      "Analytics tracking",
      "Conversion optimisation report"
    ],
    whatsIncluded: [
      "Website performance analysis",
      "Lead capture form design",
      "Form placement optimisation",
      "Automation workflow setup",
      "Analytics and tracking setup",
      "A/B testing recommendations",
      "Conversion optimisation report"
    ],
    process: [
      "Week 1: Audit — Analyse your website and visitor behaviour",
      "Week 1-2: Optimise — Add forms, automation, and tracking",
      "Week 2: Launch — Deploy changes and monitor performance"
    ]
  },
  {
    id: "bi-dashboard",
    name: "Business Intelligence Dashboard",
    description: "Custom dashboards pulling data from multiple sources into one unified view",
    shortDescription: "Make faster decisions with real-time data in one place",
    price: 3000,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Analytics", "Systems"],
    businessTypes: ["SME", "Corporate"],
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business, All Industries",
    deliverables: [
      "Custom dashboard connecting CRM, accounting, and sales data",
      "Real-time KPI tracking and alerts",
      "Automated report generation",
      "Mobile-friendly dashboard access",
      "Data visualisation and charts",
      "User access management",
      "30 days of optimisation"
    ],
    whatsIncluded: [
      "Data source integration (CRM, accounting, sales)",
      "Dashboard design and customisation",
      "KPI selection and tracking setup",
      "Automated report scheduling",
      "Mobile optimisation",
      "Team training on dashboard usage",
      "Documentation and best practices"
    ],
    process: [
      "Week 1: Discovery — Identify your key metrics and data sources",
      "Week 1-2: Build — Create the dashboard and connect your data",
      "Week 2: Launch — Deploy, train your team, and iterate"
    ]
  },
  {
    id: "customer-journey",
    name: "Customer Journey Mapping",
    description: "Analyse and improve how customers interact with your business at every stage",
    shortDescription: "Optimise every touchpoint in the customer experience",
    price: 2500,
    currency: "AUD",
    timeline: "2-3 weeks",
    tags: ["Strategy", "Marketing"],
    businessTypes: ["Startups", "SME", "Corporate", "Service Providers"],
    image: "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "E-commerce, SaaS, Service Providers",
    deliverables: [
      "Complete customer journey map",
      "Touchpoint analysis and optimisation",
      "Pain point identification and solutions",
      "Automation recommendations",
      "Implementation roadmap",
      "Conversion optimisation strategy",
      "60 days of support"
    ],
    whatsIncluded: [
      "Customer research and interviews",
      "Journey mapping workshop",
      "Touchpoint analysis",
      "Pain point documentation",
      "Optimisation recommendations",
      "Implementation roadmap",
      "Team training"
    ],
    process: [
      "Week 1: Research — Interview customers and analyse behaviour",
      "Week 2: Map — Create a detailed, actionable journey map",
      "Week 3: Optimise — Develop targeted improvement strategies"
    ]
  },
  {
    id: "feedback-automation",
    name: "Feedback Automation System",
    description: "Automated surveys, NPS tracking, and sentiment analysis",
    shortDescription: "Understand customer satisfaction and act on it automatically",
    price: 1900,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Analytics", "Automation"],
    businessTypes: ["Startups", "SME", "Corporate"],
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business, All Industries",
    deliverables: [
      "NPS survey setup and automation",
      "Customer feedback collection system",
      "Sentiment analysis dashboard",
      "Automated follow-up workflows",
      "Feedback reporting and insights",
      "Integration with CRM",
      "30 days of optimisation"
    ],
    whatsIncluded: [
      "Survey design and setup",
      "Automation workflow creation",
      "Feedback collection system",
      "Analytics dashboard",
      "Sentiment analysis configuration",
      "CRM integration",
      "Team training"
    ],
    process: [
      "Week 1: Design — Create surveys and feedback flows",
      "Week 1-2: Build — Set up automation and analytics",
      "Week 2: Launch — Deploy and monitor incoming feedback"
    ]
  },
  {
    id: "proposal-automation",
    name: "Proposal & Quote Automation",
    description: "Auto-generate professional proposals and quotes directly from customer data",
    shortDescription: "Create winning proposals in minutes, not hours",
    price: 2100,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Sales", "Automation"],
    businessTypes: ["Startups", "SME", "Corporate", "Agencies", "Service Providers"],
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Consultants, Agencies, Service Providers",
    deliverables: [
      "Proposal template design",
      "Automated proposal generation system",
      "Quote calculator setup",
      "E-signature integration",
      "Proposal tracking and analytics",
      "CRM integration",
      "30 days of support"
    ],
    whatsIncluded: [
      "Proposal template creation",
      "Automation workflow setup",
      "Quote calculator configuration",
      "E-signature integration",
      "CRM integration",
      "Team training",
      "Documentation"
    ],
    process: [
      "Week 1: Design — Create branded proposal templates",
      "Week 1-2: Build — Set up automation and integrations",
      "Week 2: Launch — Deploy, test, and hand over"
    ]
  },
  {
    id: "subscription-management",
    name: "Subscription Management System",
    description: "Set up recurring billing, payment automation, and customer lifecycle management",
    shortDescription: "Automate recurring revenue and reduce churn",
    price: 3200,
    currency: "AUD",
    timeline: "2-3 weeks",
    tags: ["Systems", "Sales"],
    businessTypes: ["Startups", "SME", "Corporate"],
    image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "SaaS, Membership Sites, Service Subscriptions",
    deliverables: [
      "Subscription platform setup (Stripe, Chargebee, etc.)",
      "Recurring billing configuration",
      "Payment automation workflows",
      "Customer lifecycle automation",
      "Retention and churn reduction strategies",
      "Analytics and reporting",
      "60 days of support"
    ],
    whatsIncluded: [
      "Platform selection and setup",
      "Subscription tier configuration",
      "Payment gateway integration",
      "Billing automation workflows",
      "Customer lifecycle automation",
      "Retention strategy implementation",
      "Team training"
    ],
    process: [
      "Week 1: Setup — Configure your subscription platform",
      "Week 2: Build — Create billing and automation workflows",
      "Week 3: Launch — Deploy, test, and optimise"
    ]
  },
  {
    id: "ai-content-generation",
    name: "AI Content Generation Suite",
    description: "Automated blog posts, social media content, and email copy using AI",
    shortDescription: "Generate on-brand content at scale",
    price: "2500+",
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Marketing", "Automation"],
    businessTypes: ["Startups", "SME", "Corporate", "Agencies"],
    image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Agencies, Content Creators, E-commerce",
    deliverables: [
      "AI content generation system setup",
      "Brand voice training and configuration",
      "Content calendar automation",
      "Social media content generation",
      "Email copy generation",
      "Blog post automation",
      "30 days of optimisation"
    ],
    whatsIncluded: [
      "Brand voice documentation",
      "AI tool setup and configuration",
      "Content template creation",
      "Automation workflow setup",
      "Quality control processes",
      "Team training",
      "Documentation"
    ],
    process: [
      "Week 1: Setup — Configure AI tools and document your brand voice",
      "Week 1-2: Build — Create content templates and production workflows",
      "Week 2: Launch — Deploy and refine quality controls"
    ]
  },
  {
    id: "seo-optimization",
    name: "SEO & Content Optimisation",
    description: "AI-driven keyword research, content audits, and optimisation recommendations",
    shortDescription: "Improve your search rankings and grow organic traffic",
    price: 2300,
    currency: "AUD",
    timeline: "2-3 weeks",
    tags: ["Marketing", "Strategy"],
    businessTypes: ["Startups", "SME", "Corporate"],
    image: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "E-commerce, Blogs, Service Websites",
    deliverables: [
      "Comprehensive SEO audit",
      "Keyword research and strategy",
      "Content optimisation recommendations",
      "Technical SEO fixes",
      "Backlink analysis and strategy",
      "Ranking tracking setup",
      "Monthly optimisation recommendations"
    ],
    whatsIncluded: [
      "Website audit and analysis",
      "Keyword research",
      "Content gap analysis",
      "Technical SEO review",
      "Competitor analysis",
      "Optimisation roadmap",
      "Team training"
    ],
    process: [
      "Week 1: Audit — Analyse your website and competitive landscape",
      "Week 2: Research — Conduct keyword and content gap research",
      "Week 3: Optimise — Implement recommendations and track rankings"
    ]
  },
  {
    id: "data-cleanup",
    name: "Data Cleanup & Deduplication",
    description: "Audit and clean messy customer or product databases before automation",
    shortDescription: "Clean data means better automation and sharper insights",
    price: 2200,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Systems", "Analytics"],
    businessTypes: ["SME", "Corporate"],
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business with Messy Data",
    deliverables: [
      "Data audit and quality report",
      "Duplicate record identification and removal",
      "Data standardisation and normalisation",
      "Missing data analysis and solutions",
      "Data validation rules setup",
      "Cleaned and organised database",
      "Documentation and best practices"
    ],
    whatsIncluded: [
      "Data assessment and analysis",
      "Duplicate detection and removal",
      "Data standardisation",
      "Quality validation rules",
      "Documentation",
      "Team training on data maintenance",
      "Preventive measures setup"
    ],
    process: [
      "Week 1: Audit — Analyse data quality and identify issues",
      "Week 1-2: Clean — Remove duplicates and standardise records",
      "Week 2: Validate — Set up quality controls to keep data clean"
    ]
  },
  {
    id: "ai-search-optimization",
    name: "AI Search & Answer Optimisation",
    description: "Get found by AI tools like ChatGPT, Perplexity, and Google's AI Overview",
    shortDescription: "Be the answer when AI tools respond to your customers",
    price: 2200,
    currency: "AUD",
    timeline: "2-3 weeks",
    tags: ["Marketing", "Strategy"],
    businessTypes: ["Startups", "SME", "Corporate", "Agencies", "Service Providers"],
    image: "https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any business wanting to be found by AI tools",
    deliverables: [
      "AI Answer Optimisation (AEO) — Get featured in AI chatbot responses",
      "Generative Engine Optimisation (GEO) — Appear in generative AI outputs",
      "AI Search Optimisation (AIO) — Rank in AI-powered search platforms",
      "Content audit and optimisation strategy",
      "Cross-platform monitoring dashboard",
      "Ongoing optimisation recommendations"
    ],
    whatsIncluded: [
      "Audit of current AI visibility across platforms",
      "Content optimisation for AI discovery",
      "Knowledge base and FAQ optimisation",
      "Entity recognition setup in AI systems",
      "Performance monitoring across ChatGPT, Perplexity, Google AI, and more",
      "Monthly optimisation reports",
      "Strategy adjustments based on performance"
    ],
    process: [
      "Week 1: Analysis — Audit how AI tools currently answer questions in your industry",
      "Week 2: Optimisation — Rewrite and structure your content for AI discovery",
      "Week 3: Monitoring — Set up tracking and begin monitoring AI mentions"
    ]
  },
  {
    id: "social-media-automation",
    name: "Social Media Automation",
    description: "Schedule, publish, and repurpose content across all your social channels automatically",
    shortDescription: "Stay consistently active on social without the daily grind",
    price: 1600,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Marketing", "Automation"],
    businessTypes: ["Startups", "SME", "Agencies", "Service Providers"],
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Agencies, Small Businesses, Personal Brands",
    deliverables: [
      "Social scheduling platform setup (Buffer, Later, etc.)",
      "Content repurposing workflows",
      "Automated posting calendar",
      "Engagement monitoring setup",
      "Hashtag and caption templates",
      "Analytics and performance reporting",
      "30 days of optimisation"
    ],
    whatsIncluded: [
      "Platform selection and account connection",
      "Content calendar template",
      "Repurposing workflow setup",
      "Scheduling automation",
      "Reporting dashboard",
      "Team training",
      "Best practices documentation"
    ],
    process: [
      "Week 1: Setup — Connect accounts and configure scheduling platform",
      "Week 1-2: Build — Create content workflows and repurposing automations",
      "Week 2: Launch — Go live and review first week of performance"
    ]
  },
  {
    id: "onboarding-automation",
    name: "Client Onboarding Automation",
    description: "Automate your entire client onboarding process from signed contract to first delivery",
    shortDescription: "Impress new clients from day one without the manual work",
    price: 2600,
    currency: "AUD",
    timeline: "2-3 weeks",
    tags: ["Automation", "Systems"],
    businessTypes: ["SME", "Agencies", "Service Providers"],
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Agencies, Consultants, Service Providers",
    deliverables: [
      "Automated welcome and onboarding sequence",
      "Contract and e-signature workflow",
      "Client portal setup",
      "Intake form automation",
      "Project kickoff workflow",
      "CRM integration",
      "30 days of support"
    ],
    whatsIncluded: [
      "Onboarding process mapping",
      "Welcome email sequence",
      "Contract delivery automation",
      "Intake form design and routing",
      "Client portal configuration",
      "CRM integration",
      "Team training and documentation"
    ],
    process: [
      "Week 1: Map — Document your current onboarding process end to end",
      "Week 2: Build — Automate each step and connect your tools",
      "Week 3: Test & Launch — Run a test client through and deploy"
    ]
  },
  {
    id: "hr-automation",
    name: "HR Automation",
    description: "Automate job posting, applicant screening, interview scheduling, and onboarding paperwork",
    shortDescription: "Hire faster and onboard smoother with less admin",
    price: 3000,
    currency: "AUD",
    timeline: "2-3 weeks",
    tags: ["Automation", "Systems"],
    businessTypes: ["SME", "Corporate", "Agencies"],
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Growing Teams, HR Departments, Agencies",
    deliverables: [
      "Job posting automation across platforms",
      "Applicant screening workflows",
      "Interview scheduling automation",
      "Offer letter automation",
      "New employee onboarding sequence",
      "HR system integration",
      "60 days of support"
    ],
    whatsIncluded: [
      "Recruitment workflow mapping",
      "Job board integration setup",
      "Screening criteria configuration",
      "Calendar integration for scheduling",
      "Onboarding document automation",
      "HR system integration",
      "Team training"
    ],
    process: [
      "Week 1: Discovery — Map your recruitment and onboarding workflows",
      "Week 2: Build — Automate screening, scheduling, and paperwork",
      "Week 3: Launch — Deploy and refine based on first hires"
    ]
  },
  {
    id: "invoice-payment-automation",
    name: "Invoice & Payment Automation",
    description: "Automate invoicing, payment follow-ups, and reconciliation to get paid faster",
    shortDescription: "Stop chasing payments — let automation do it for you",
    price: 1800,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Automation", "Systems"],
    businessTypes: ["Startups", "SME", "Service Providers"],
    image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Freelancers, Service Providers, SMEs",
    deliverables: [
      "Automated invoice generation and sending",
      "Payment reminder sequence",
      "Overdue payment escalation workflow",
      "Payment reconciliation automation",
      "Accounting system integration (Xero, MYOB, QuickBooks)",
      "Reporting dashboard",
      "30 days of support"
    ],
    whatsIncluded: [
      "Invoicing platform setup",
      "Reminder and escalation workflow setup",
      "Accounting system integration",
      "Payment gateway connection",
      "Reconciliation automation",
      "Team training",
      "Documentation"
    ],
    process: [
      "Week 1: Setup — Configure invoicing platform and accounting integration",
      "Week 1-2: Automate — Build reminder, escalation, and reconciliation workflows",
      "Week 2: Launch — Test with a live invoice and deploy"
    ]
  },
  {
    id: "reporting-automation",
    name: "Automated Reporting Suite",
    description: "Automatically generate and distribute weekly, monthly, and quarterly reports to stakeholders",
    shortDescription: "Reports that write themselves and land in inboxes on time",
    price: "2500+",
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Analytics", "Automation"],
    businessTypes: ["SME", "Corporate", "Agencies"],
    image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Agencies, Management Teams, Corporate",
    deliverables: [
      "Automated report templates (weekly, monthly, quarterly)",
      "Data source integration",
      "Scheduled report distribution",
      "Custom branding applied to reports",
      "Stakeholder distribution lists",
      "Analytics tracking on opens",
      "30 days of optimisation"
    ],
    whatsIncluded: [
      "Report template design",
      "Data source connection",
      "Scheduling and distribution setup",
      "Branding and formatting",
      "Stakeholder list management",
      "Team training",
      "Documentation"
    ],
    process: [
      "Week 1: Design — Define report structure, data sources, and distribution",
      "Week 1-2: Build — Automate data pulling, formatting, and sending",
      "Week 2: Launch — Send first automated reports and review quality"
    ]
  }
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedBusinessType, setSelectedBusinessType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    company: "",
    phone: ""
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Properly track desktop breakpoint — fixes the stuck-closed filter bug on resize
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const allTags = Array.from(new Set(PRODUCTS.flatMap(p => p.tags)));

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      if (selectedBusinessType !== "All" && !product.businessTypes.includes(selectedBusinessType)) return false;
      if (selectedTags.length > 0 && !selectedTags.some(tag => product.tags.includes(tag))) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q) ||
          product.bestFor.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedTags, selectedBusinessType, searchQuery]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
    setSelectedBusinessType("All");
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    try {
      const response = await fetch("/api/trpc/forms.submitProductInquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: { ...formData, product: selectedProduct?.name || "" } })
      });
      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          setShowForm(false);
          setSelectedProduct(null);
          setFormData({ name: "", email: "", company: "", phone: "" });
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  const hasActiveFilters = selectedTags.length > 0 || searchQuery.trim() !== "" || selectedBusinessType !== "All";
  const showFilters = isDesktop || sidebarOpen;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Ready to Go</span> Products
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            Off-the-shelf solutions built to deploy fast. Pick what your business needs and get moving.
          </p>

          {/* Search bar in hero */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <input
                type="text"
                placeholder="Search products... (e.g. 'chatbot', 'email', 'CRM')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-4 bg-white/80 border-2 border-purple-300/60 rounded-xl text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-72 flex-shrink-0"
            >
              <div className="bg-white/5 border border-purple-900/20 rounded-xl p-6 lg:sticky lg:top-24">

                {/* Mobile Toggle */}
                <div className="lg:hidden mb-4">
                  <button
                    onClick={() => setSidebarOpen(prev => !prev)}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <Filter size={18} />
                      {sidebarOpen ? "Hide Filters" : "Show Filters"}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${sidebarOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* Filter Content — always shown on desktop, toggled on mobile */}
                <div className={`space-y-6 ${showFilters ? "block" : "hidden"} lg:block`}>
                  <div>
                    <button
                      onClick={clearFilters}
                      className="w-full text-left px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      All Products
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-3">Categories</label>
                    <div className="space-y-2">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                            selectedTags.includes(tag)
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              : "bg-white/10 text-foreground/70 hover:text-foreground hover:bg-white/20"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-3">Business Type</label>
                    <div className="space-y-2">
                      {BUSINESS_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedBusinessType(type)}
                          className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                            selectedBusinessType === type
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              : "bg-white/10 text-foreground/70 hover:text-foreground hover:bg-white/20"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium py-2 px-3 bg-purple-600/10 hover:bg-purple-600/20 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <X size={16} />
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1"
            >
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-white/5 border border-purple-900/20 rounded-xl p-8">
                  <p className="text-lg text-foreground/70 mb-4">No products found matching your filters.</p>
                  <button onClick={clearFilters} className="text-purple-600 hover:text-purple-700 font-medium">
                    Clear filters and try again
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="group bg-white/5 border border-purple-900/20 rounded-xl overflow-hidden hover:border-purple-600/50 transition-all hover:shadow-lg hover:shadow-purple-600/10 flex flex-col"
                    >
                      {/* Card Header — icon + tags */}
                      <div className="relative p-6 pb-4 bg-gradient-to-br from-purple-600/10 via-purple-500/5 to-pink-600/5 border-b border-purple-900/20">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 rounded-xl bg-purple-600/15 ring-1 ring-purple-500/20">
                            {PRODUCT_ICONS[product.id] ?? <Package size={36} className="text-purple-400" />}
                          </div>
                          <div className="flex flex-wrap gap-1.5 justify-end">
                            {product.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-xs px-2.5 py-1 bg-purple-600/15 text-purple-700 font-semibold rounded-full ring-1 ring-purple-400/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
                        <p className="text-foreground/60 text-sm">{product.shortDescription}</p>
                      </div>

                      {/* Card Body — bullets + price + CTA */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Top 4 deliverables as bullets */}
                        <ul className="space-y-2 mb-5 flex-1">
                          {product.deliverables.slice(0, 4).map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/75">
                              <Check size={14} className="text-purple-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                          {product.deliverables.length > 4 && (
                            <li className="text-xs text-foreground/40 pl-[22px]">
                              +{product.deliverables.length - 4} more included
                            </li>
                          )}
                        </ul>

                        {/* Price + timeline */}
                        <div className="flex items-center justify-between mb-4 pt-4 border-t border-purple-900/20 text-sm">
                          <div className="flex items-center gap-1.5 text-foreground/50">
                            <Clock size={13} />
                            {product.timeline}
                          </div>
                          <div className="text-xl font-bold text-purple-600">
                            ${product.price.toLocaleString()} <span className="text-sm font-medium text-foreground/50">{product.currency}</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowForm(true);
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        >
                          Get Started
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-8 text-center text-foreground/60 text-sm">
                Showing {filteredProducts.length} of {PRODUCTS.length} products
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background border border-purple-900/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-background border-b border-purple-900/20 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">{selectedProduct.name}</h2>
              <button
                onClick={() => { setSelectedProduct(null); setShowForm(false); }}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Overview</h3>
                <p className="text-foreground/70 mb-4">{selectedProduct.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-purple-900/20 rounded-lg p-4">
                    <div className="text-sm text-foreground/60 mb-1">Price</div>
                    <div className="text-2xl font-bold text-purple-600">${selectedProduct.price.toLocaleString()}</div>
                  </div>
                  <div className="bg-white/5 border border-purple-900/20 rounded-lg p-4">
                    <div className="text-sm text-foreground/60 mb-1">Timeline</div>
                    <div className="text-lg font-bold text-foreground">{selectedProduct.timeline}</div>
                  </div>
                  <div className="bg-white/5 border border-purple-900/20 rounded-lg p-4">
                    <div className="text-sm text-foreground/60 mb-1">Best For</div>
                    <div className="text-sm font-bold text-foreground">{selectedProduct.bestFor}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Package size={20} className="text-purple-600" />
                  What You Get
                </h3>
                <ul className="space-y-3">
                  {selectedProduct.deliverables.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-foreground/80">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Implementation Process</h3>
                <div className="space-y-3">
                  {selectedProduct.process.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-foreground/80 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {showForm ? (
                <div className="bg-white/5 border border-purple-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Get Started</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {(["name", "email", "company", "phone"] as const).map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-foreground/80 mb-2 capitalize">{field}</label>
                        <input
                          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleFormChange}
                          required={field === "name" || field === "email"}
                          className="w-full px-4 py-3 bg-white/80 border-2 border-purple-300/60 rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all shadow-sm"
                          placeholder={field === "email" ? "your@email.com" : `Your ${field}`}
                        />
                      </div>
                    ))}

                    {submitStatus === "success" && (
                      <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-3 rounded-lg text-sm">
                        Thank you! We'll be in touch soon.
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-3 rounded-lg text-sm">
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      {submitStatus === "loading" ? "Submitting..." : "Submit Inquiry"}
                      <Send size={16} className="ml-2" />
                    </Button>
                  </form>
                </div>
              ) : (
                <Button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg"
                >
                  Get Started
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}

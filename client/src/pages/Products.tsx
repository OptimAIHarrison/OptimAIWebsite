import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Check, Clock, Package, Send } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  timeline: string;
  category: string;
  image: string;
  shortDescription: string;
  deliverables: string[];
  whatsIncluded: string[];
  process: string[];
  bestFor: string;
}

const PRODUCTS: Product[] = [
  // Original Products
  {
    id: "chatbot",
    name: "AI Chatbot Setup",
    description: "Custom AI-powered chatbot for your website or business",
    shortDescription: "Automate customer interactions with intelligent chatbots",
    price: 2500,
    currency: "AUD",
    timeline: "2-3 weeks",
    category: "Automation",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "E-commerce, SaaS, Customer Support",
    deliverables: [
      "Custom AI chatbot trained on your business data",
      "Website integration (embed code provided)",
      "24/7 customer support automation",
      "Lead capture and qualification",
      "Analytics dashboard",
      "30 days of support and optimization"
    ],
    whatsIncluded: [
      "Initial consultation and requirements gathering",
      "Chatbot design and configuration",
      "Integration with your website",
      "Training on your products/services",
      "Testing and quality assurance",
      "Staff training and documentation",
      "Performance monitoring for 30 days"
    ],
    process: [
      "Week 1: Discovery & Design - We learn about your business, customers, and goals",
      "Week 2: Development & Training - Build and train the chatbot on your data",
      "Week 3: Integration & Testing - Deploy to your website and optimize performance"
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
    category: "Marketing",
    image: "https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "E-commerce, SaaS, Agencies",
    deliverables: [
      "Email marketing platform setup (Mailchimp, ConvertKit, etc.)",
      "5-10 email sequence templates",
      "Subscriber list migration and segmentation",
      "Automation workflows configured",
      "Welcome series and nurture sequences",
      "Performance tracking setup",
      "30 days of optimization"
    ],
    whatsIncluded: [
      "Platform selection and setup",
      "List import and segmentation",
      "Email template design (5-10 templates)",
      "Automation workflow creation",
      "Integration with your CRM/website",
      "A/B testing strategy",
      "Staff training and best practices guide"
    ],
    process: [
      "Week 1: Platform Setup - Choose and configure your email platform",
      "Week 1-2: Sequence Design - Create email sequences for your business",
      "Week 2: Integration & Launch - Connect to your systems and go live"
    ]
  },
  {
    id: "crm-build",
    name: "CRM Build & Setup",
    description: "Custom CRM system tailored to your business processes",
    shortDescription: "Organize customer data and automate sales workflows",
    price: 3500,
    currency: "AUD",
    timeline: "3-4 weeks",
    category: "Systems",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
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
      "Integration with your tools",
      "Team training (up to 10 users)",
      "Custom reporting dashboards"
    ],
    process: [
      "Week 1: Discovery - Map your sales and customer processes",
      "Week 2-3: Build - Configure CRM, fields, and automations",
      "Week 4: Migration & Training - Move data and train your team"
    ]
  },
  {
    id: "full-stack-setup",
    name: "Full Stack Business Setup",
    description: "Complete business automation for sole traders and small teams",
    shortDescription: "Everything you need to run your business efficiently",
    price: 5500,
    currency: "AUD",
    timeline: "4-6 weeks",
    category: "Complete Setup",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Sole Traders, Startups, Small Businesses",
    deliverables: [
      "CRM system (leads, clients, projects)",
      "Email marketing automation",
      "Booking/scheduling system",
      "Invoice and payment automation",
      "Website contact forms and lead capture",
      "Chatbot for customer support",
      "Reporting and analytics dashboard",
      "90 days of support and optimization"
    ],
    whatsIncluded: [
      "Complete business process audit",
      "CRM setup and configuration",
      "Email marketing system setup",
      "Booking system integration",
      "Invoice automation setup",
      "Website optimization for leads",
      "Chatbot implementation",
      "Team training and documentation",
      "Quarterly optimization reviews"
    ],
    process: [
      "Week 1-2: Discovery & Planning - Understand your business and goals",
      "Week 2-4: System Setup - Configure all tools and integrations",
      "Week 4-6: Integration & Training - Connect systems and train your team"
    ]
  },
  {
    id: "process-automation",
    name: "Process Automation",
    description: "Automate repetitive business processes and workflows",
    shortDescription: "Save time by automating manual tasks",
    price: 2000,
    currency: "AUD",
    timeline: "2-3 weeks",
    category: "Automation",
    image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business, All Industries",
    deliverables: [
      "Process audit and optimization recommendations",
      "Automated workflows for 3-5 key processes",
      "Integration between your tools",
      "Error handling and monitoring",
      "Documentation and runbooks",
      "Team training",
      "30 days of monitoring and optimization"
    ],
    whatsIncluded: [
      "Current process mapping and analysis",
      "Automation opportunity identification",
      "Workflow design and configuration",
      "Tool integration (Zapier, Make, etc.)",
      "Testing and error handling",
      "Documentation for your team",
      "Training on new workflows"
    ],
    process: [
      "Week 1: Audit - Document your current processes",
      "Week 2: Design - Plan automation workflows",
      "Week 3: Build - Implement and test automations"
    ]
  },
  {
    id: "website-optimization",
    name: "Website Lead Optimization",
    description: "Optimize your website to capture and convert leads",
    shortDescription: "Turn website visitors into qualified leads",
    price: 1500,
    currency: "AUD",
    timeline: "1-2 weeks",
    category: "Marketing",
    image: "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Service Providers, Consultants, Agencies",
    deliverables: [
      "Website audit and recommendations",
      "Lead capture forms (3-5 forms)",
      "Automated lead routing",
      "Lead qualification system",
      "Follow-up automation",
      "Analytics tracking",
      "Conversion optimization recommendations"
    ],
    whatsIncluded: [
      "Website performance analysis",
      "Lead capture form design",
      "Form placement optimization",
      "Automation workflow setup",
      "Analytics and tracking setup",
      "A/B testing recommendations",
      "Conversion optimization report"
    ],
    process: [
      "Week 1: Audit - Analyze your website and visitor behavior",
      "Week 1-2: Optimize - Add forms, automation, and tracking",
      "Week 2: Launch - Deploy and monitor performance"
    ]
  },

  // New Ready-to-Go Products
  {
    id: "bi-dashboard",
    name: "Business Intelligence Dashboard",
    description: "Custom dashboards pulling data from multiple sources into one unified view",
    shortDescription: "Real-time decision-making with unified data view",
    price: 2200,
    currency: "AUD",
    timeline: "1-2 weeks",
    category: "Analytics",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business, All Industries",
    deliverables: [
      "Custom dashboard connecting CRM, accounting, sales data",
      "Real-time KPI tracking and alerts",
      "Automated report generation",
      "Mobile-friendly dashboard access",
      "Data visualization and charts",
      "User access management",
      "30 days of optimization"
    ],
    whatsIncluded: [
      "Data source integration (CRM, accounting, sales)",
      "Dashboard design and customization",
      "KPI selection and tracking setup",
      "Automated report scheduling",
      "Mobile optimization",
      "Team training on dashboard usage",
      "Documentation and best practices"
    ],
    process: [
      "Week 1: Discovery - Identify key metrics and data sources",
      "Week 1-2: Build - Create dashboard and integrate data",
      "Week 2: Launch - Deploy and train your team"
    ]
  },
  {
    id: "customer-journey",
    name: "Customer Journey Mapping & Optimization",
    description: "Analyze and improve how customers interact with your business",
    shortDescription: "Optimize every touchpoint in the customer experience",
    price: 2800,
    currency: "AUD",
    timeline: "2-3 weeks",
    category: "Strategy",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "E-commerce, SaaS, Service Providers",
    deliverables: [
      "Complete customer journey map",
      "Touchpoint analysis and optimization",
      "Pain point identification and solutions",
      "Automation recommendations",
      "Implementation roadmap",
      "Conversion optimization strategy",
      "60 days of support"
    ],
    whatsIncluded: [
      "Customer research and interviews",
      "Journey mapping workshop",
      "Touchpoint analysis across all channels",
      "Pain point documentation",
      "Optimization recommendations",
      "Implementation roadmap creation",
      "Quarterly review and optimization"
    ],
    process: [
      "Week 1: Research - Conduct customer interviews and analysis",
      "Week 2: Mapping - Create detailed journey maps",
      "Week 3: Optimization - Develop improvement strategy"
    ]
  },
  {
    id: "feedback-automation",
    name: "Feedback Automation System",
    description: "Automated surveys, NPS tracking, and sentiment analysis",
    shortDescription: "Understand customer satisfaction in real-time",
    price: 1900,
    currency: "AUD",
    timeline: "1-2 weeks",
    category: "Analytics",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business, All Industries",
    deliverables: [
      "Automated survey system setup",
      "NPS tracking and reporting",
      "Sentiment analysis integration",
      "Feedback collection across channels",
      "Automated alerts for critical feedback",
      "Analytics dashboard",
      "30 days of optimization"
    ],
    whatsIncluded: [
      "Survey platform setup (Typeform, SurveySparrow, etc.)",
      "NPS survey creation and automation",
      "Feedback collection workflow",
      "Sentiment analysis setup",
      "Integration with CRM",
      "Automated alert configuration",
      "Team training and documentation"
    ],
    process: [
      "Week 1: Setup - Configure survey platform and NPS tracking",
      "Week 1-2: Integration - Connect to CRM and automation",
      "Week 2: Launch - Deploy surveys and monitor feedback"
    ]
  },
  {
    id: "proposal-automation",
    name: "Proposal & Quote Automation",
    description: "Auto-generate professional proposals and quotes from customer data",
    shortDescription: "Reduce sales admin time and accelerate deals",
    price: 1600,
    currency: "AUD",
    timeline: "1-2 weeks",
    category: "Sales",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Consultants, Agencies, Service Providers",
    deliverables: [
      "Proposal template library (5-10 templates)",
      "Automated proposal generation from CRM data",
      "Quote calculation automation",
      "E-signature integration",
      "Automated follow-up reminders",
      "Proposal tracking and analytics",
      "30 days of optimization"
    ],
    whatsIncluded: [
      "Proposal template design and creation",
      "CRM integration for data auto-fill",
      "Quote calculation setup",
      "E-signature platform integration (DocuSign, HelloSign)",
      "Automated reminder workflows",
      "Tracking and analytics setup",
      "Team training and documentation"
    ],
    process: [
      "Week 1: Design - Create proposal templates",
      "Week 1-2: Integration - Connect to CRM and e-signature",
      "Week 2: Launch - Deploy and train sales team"
    ]
  },
  {
    id: "subscription-management",
    name: "Subscription Management System",
    description: "Set up recurring billing, payment automation, and customer lifecycle",
    shortDescription: "Automate recurring revenue and customer management",
    price: 2400,
    currency: "AUD",
    timeline: "2-3 weeks",
    category: "Systems",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "SaaS, Membership Sites, Service Subscriptions",
    deliverables: [
      "Subscription billing platform setup (Stripe, Chargebee)",
      "Recurring payment automation",
      "Customer lifecycle management",
      "Automated invoicing and receipts",
      "Churn prevention workflows",
      "Subscription analytics dashboard",
      "60 days of support"
    ],
    whatsIncluded: [
      "Billing platform selection and setup",
      "Payment gateway configuration",
      "Subscription tier creation",
      "Automated billing workflows",
      "Customer portal setup",
      "Churn prevention automation",
      "Integration with accounting software",
      "Team training and documentation"
    ],
    process: [
      "Week 1: Setup - Configure billing platform and payment gateway",
      "Week 2: Build - Create subscription tiers and workflows",
      "Week 3: Integration - Connect to accounting and CRM"
    ]
  },
  {
    id: "ai-content",
    name: "AI Content Generation Suite",
    description: "Automated blog posts, social media content, email copy using AI",
    shortDescription: "Generate on-brand content at scale with AI",
    price: 1700,
    currency: "AUD",
    timeline: "1-2 weeks",
    category: "Marketing",
    image: "https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "E-commerce, SaaS, Content Creators",
    deliverables: [
      "AI content generation system setup",
      "Brand voice training and guidelines",
      "Automated blog post generation",
      "Social media content calendar automation",
      "Email copy generation",
      "Content scheduling and publishing",
      "30 days of optimization"
    ],
    whatsIncluded: [
      "AI platform setup (ChatGPT, Copy.ai, etc.)",
      "Brand voice documentation and training",
      "Content template creation",
      "Automation workflow setup",
      "Social media integration",
      "Email platform integration",
      "Content calendar setup",
      "Team training and best practices"
    ],
    process: [
      "Week 1: Setup - Configure AI platform and brand training",
      "Week 1-2: Automation - Create content workflows",
      "Week 2: Launch - Deploy and monitor content quality"
    ]
  },
  {
    id: "seo-optimization",
    name: "SEO & Content Optimization",
    description: "AI-driven keyword research, content audits, and optimization",
    shortDescription: "Improve search rankings and organic traffic",
    price: 1800,
    currency: "AUD",
    timeline: "2-3 weeks",
    category: "Marketing",
    image: "https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business, All Industries",
    deliverables: [
      "Comprehensive SEO audit",
      "Keyword research and strategy",
      "Content audit and optimization plan",
      "On-page SEO implementation",
      "Technical SEO fixes",
      "Backlink strategy",
      "Monthly reporting and optimization"
    ],
    whatsIncluded: [
      "Website SEO audit",
      "Keyword research and competitive analysis",
      "Content gap analysis",
      "On-page optimization recommendations",
      "Technical SEO improvements",
      "Backlink strategy development",
      "Monthly performance reporting",
      "Quarterly strategy reviews"
    ],
    process: [
      "Week 1: Audit - Analyze current SEO performance",
      "Week 2: Strategy - Develop keyword and content strategy",
      "Week 3: Implementation - Optimize content and technical SEO"
    ]
  },
  {
    id: "data-cleanup",
    name: "Data Cleanup & Deduplication",
    description: "Audit and clean messy customer/product databases before automation",
    shortDescription: "Prepare your data for successful automation",
    price: 1400,
    currency: "AUD",
    timeline: "1-2 weeks",
    category: "Systems",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business with Legacy Data",
    deliverables: [
      "Complete data audit and analysis",
      "Duplicate record identification and removal",
      "Data standardization and formatting",
      "Missing data identification and resolution",
      "Data quality report",
      "Cleaned and validated dataset",
      "Documentation and best practices guide"
    ],
    whatsIncluded: [
      "Data source assessment",
      "Duplicate detection and removal",
      "Data standardization (formatting, naming conventions)",
      "Missing data analysis",
      "Data quality scoring",
      "Cleaned dataset delivery",
      "Data governance recommendations",
      "Team training on data maintenance"
    ],
    process: [
      "Week 1: Audit - Analyze data quality and issues",
      "Week 1-2: Cleanup - Remove duplicates and standardize",
      "Week 2: Validation - Verify cleaned data quality"
    ]
  }
];

const CATEGORIES = ["All", "Automation", "Marketing", "Systems", "Analytics", "Strategy", "Sales", "Complete Setup"];

interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    company: "",
    phone: ""
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const filteredProducts = selectedCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
        body: JSON.stringify({
          json: {
            ...formData,
          product: selectedProduct?.name || "",
          }
        })
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
    } catch (error) {
      setSubmitStatus("error");
    }
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
            Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Ready to Go</span> Products
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Off-the-shelf solutions ready to deploy. Choose what you need, get started immediately.
          </motion.p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-b border-purple-900/20">
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
                variants={itemVariants}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/10 text-foreground/70 hover:text-foreground hover:bg-white/20"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                onClick={() => {
                  setSelectedProduct(product);
                  setShowForm(false);
                }}
                className="glass-card rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group border border-purple-900/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-foreground">{product.name}</h3>
                  <p className="text-foreground/70 mb-4 line-clamp-2">{product.shortDescription}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-3xl font-bold text-foreground">
                        ${product.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-foreground/60">{product.currency}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-foreground/70 text-sm mb-1">
                        <Clock size={16} />
                        {product.timeline}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg inline-flex items-center justify-center gap-2">
                    View Details
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setSelectedProduct(null);
            setShowForm(false);
          }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-2xl max-w-3xl w-full my-8 border-2 border-purple-900/40"
          >
            <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-purple-900/20 p-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">{selectedProduct.name}</h2>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setShowForm(false);
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              {!showForm ? (
                <>
                  {/* Price and Timeline */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-white/5 border border-purple-900/20 rounded-lg">
                      <div className="text-sm text-foreground/60 mb-2">Investment</div>
                      <div className="text-3xl font-bold text-foreground">
                        ${selectedProduct.price.toLocaleString()} {selectedProduct.currency}
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 border border-purple-900/20 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-foreground/60 mb-2">
                        <Clock size={16} />
                        Timeline
                      </div>
                      <div className="text-2xl font-bold text-foreground">{selectedProduct.timeline}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">About This Product</h3>
                    <p className="text-foreground/70 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  {/* Best For */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Best For</h3>
                    <p className="text-foreground/70">{selectedProduct.bestFor}</p>
                  </div>

                  {/* Process */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">How It Works</h3>
                    <div className="space-y-3">
                      {selectedProduct.process.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div className="pt-1">
                            <p className="text-foreground/80">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Package size={20} />
                      Deliverables
                    </h3>
                    <div className="space-y-2">
                      {selectedProduct.deliverables.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">What's Included</h3>
                    <div className="space-y-2">
                      {selectedProduct.whatsIncluded.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3 pt-6 border-t border-purple-900/20">
                    <button
                      onClick={() => setShowForm(true)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all inline-flex items-center justify-center gap-2"
                    >
                      Get Started
                      <ArrowRight size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setShowForm(false);
                      }}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-foreground font-semibold py-3 rounded-lg transition-all"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                // Inquiry Form
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Get Started with {selectedProduct.name}</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-purple-900/40 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-purple-900/40 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white/10 border border-purple-900/40 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Your company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white/10 border border-purple-900/40 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="+61 2 XXXX XXXX"
                      />
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        type="submit"
                        disabled={submitStatus === "loading"}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {submitStatus === "loading" ? "Sending..." : submitStatus === "success" ? "Sent!" : "Send Inquiry"}
                        {submitStatus !== "loading" && <Send size={18} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-foreground font-semibold py-3 rounded-lg transition-all"
                      >
                        Back
                      </button>
                    </div>

                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200">
                        There was an error submitting your inquiry. Please try again.
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <motion.div
          className="container mx-auto px-4 text-center max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-4">
            Not Sure Which Product Is Right?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/90 mb-8">
            Book a free consultation with our team. We'll help you choose the perfect solution for your business.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a href="/contact">
              <Button className="bg-white hover:bg-white/90 text-purple-600 font-semibold px-8 py-3 rounded-lg inline-flex items-center gap-2">
                Book Free Consultation
                <ArrowRight size={20} />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

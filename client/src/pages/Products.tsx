import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, Check, Clock, Package, Send, Search, Filter } from "lucide-react";

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
  // Original Products
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
    tags: ["Marketing", "Automation"],
    businessTypes: ["Startups", "SME", "Corporate", "Agencies"],
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
    tags: ["Systems", "Sales"],
    businessTypes: ["SME", "Corporate", "Agencies", "Service Providers"],
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
    tags: ["Complete Setup", "Automation", "Systems"],
    businessTypes: ["Startups", "SME"],
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
    tags: ["Automation"],
    businessTypes: ["Startups", "SME", "Corporate", "Agencies", "Service Providers"],
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
    tags: ["Marketing", "Sales"],
    businessTypes: ["Startups", "SME", "Corporate", "Service Providers"],
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
    tags: ["Analytics", "Systems"],
    businessTypes: ["SME", "Corporate"],
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
    tags: ["Strategy", "Marketing"],
    businessTypes: ["Startups", "SME", "Corporate", "Service Providers"],
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
      "Touchpoint analysis",
      "Pain point documentation",
      "Optimization recommendations",
      "Implementation roadmap",
      "Team training"
    ],
    process: [
      "Week 1: Research - Interview customers and analyze behavior",
      "Week 2: Map - Create detailed journey map",
      "Week 3: Optimize - Develop improvement strategies"
    ]
  },
  {
    id: "feedback-automation",
    name: "Feedback Automation System",
    description: "Automated surveys, NPS tracking, and sentiment analysis",
    shortDescription: "Understand customer satisfaction and improve continuously",
    price: 1900,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Analytics", "Automation"],
    businessTypes: ["Startups", "SME", "Corporate"],
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business, All Industries",
    deliverables: [
      "NPS survey setup and automation",
      "Customer feedback collection system",
      "Sentiment analysis dashboard",
      "Automated follow-up workflows",
      "Feedback reporting and insights",
      "Integration with CRM",
      "30 days of optimization"
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
      "Week 1: Design - Create surveys and feedback flows",
      "Week 1-2: Build - Set up automation and analytics",
      "Week 2: Launch - Deploy and monitor feedback"
    ]
  },
  {
    id: "proposal-automation",
    name: "Proposal & Quote Automation",
    description: "Auto-generate professional proposals and quotes from customer data",
    shortDescription: "Create proposals in minutes, not hours",
    price: 2100,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Sales", "Automation"],
    businessTypes: ["Startups", "SME", "Corporate", "Agencies", "Service Providers"],
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
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
      "Week 1: Design - Create proposal templates",
      "Week 1-2: Build - Set up automation and integrations",
      "Week 2: Launch - Deploy and test"
    ]
  },
  {
    id: "subscription-management",
    name: "Subscription Management System",
    description: "Set up recurring billing, payment automation, and customer lifecycle management",
    shortDescription: "Automate recurring revenue and customer retention",
    price: 3200,
    currency: "AUD",
    timeline: "2-3 weeks",
    tags: ["Systems", "Sales"],
    businessTypes: ["Startups", "SME", "Corporate"],
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
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
      "Week 1: Setup - Configure subscription platform",
      "Week 2: Build - Create billing and automation workflows",
      "Week 3: Launch - Deploy and optimize"
    ]
  },
  {
    id: "ai-content-generation",
    name: "AI Content Generation Suite",
    description: "Automated blog posts, social media content, and email copy using AI",
    shortDescription: "Generate on-brand content at scale with AI",
    price: 2400,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Marketing", "Automation"],
    businessTypes: ["Startups", "SME", "Corporate", "Agencies"],
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Agencies, Content Creators, E-commerce",
    deliverables: [
      "AI content generation system setup",
      "Brand voice training and configuration",
      "Content calendar automation",
      "Social media content generation",
      "Email copy generation",
      "Blog post automation",
      "30 days of optimization"
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
      "Week 1: Setup - Configure AI tools and brand voice",
      "Week 1-2: Build - Create content templates and workflows",
      "Week 2: Launch - Deploy and optimize"
    ]
  },
  {
    id: "seo-optimization",
    name: "SEO & Content Optimization",
    description: "AI-driven keyword research, content audits, and optimization recommendations",
    shortDescription: "Improve search rankings and organic traffic",
    price: 2300,
    currency: "AUD",
    timeline: "2-3 weeks",
    tags: ["Marketing", "Strategy"],
    businessTypes: ["Startups", "SME", "Corporate"],
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "E-commerce, Blogs, Service Websites",
    deliverables: [
      "Comprehensive SEO audit",
      "Keyword research and strategy",
      "Content optimization recommendations",
      "Technical SEO fixes",
      "Backlink analysis and strategy",
      "Ranking tracking setup",
      "Monthly optimization recommendations"
    ],
    whatsIncluded: [
      "Website audit and analysis",
      "Keyword research",
      "Content gap analysis",
      "Technical SEO review",
      "Competitor analysis",
      "Optimization roadmap",
      "Team training"
    ],
    process: [
      "Week 1: Audit - Analyze your website and competition",
      "Week 2: Research - Conduct keyword and content research",
      "Week 3: Optimize - Implement recommendations"
    ]
  },
  {
    id: "data-cleanup",
    name: "Data Cleanup & Deduplication",
    description: "Audit and clean messy customer/product databases before automation",
    shortDescription: "Get clean data for better automation and insights",
    price: 1700,
    currency: "AUD",
    timeline: "1-2 weeks",
    tags: ["Systems", "Analytics"],
    businessTypes: ["SME", "Corporate"],
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    bestFor: "Any Business with Messy Data",
    deliverables: [
      "Data audit and quality report",
      "Duplicate record identification and removal",
      "Data standardization and normalization",
      "Missing data analysis and solutions",
      "Data validation rules setup",
      "Cleaned and organized database",
      "Documentation and best practices"
    ],
    whatsIncluded: [
      "Data assessment and analysis",
      "Duplicate detection and removal",
      "Data standardization",
      "Quality validation rules",
      "Documentation",
      "Team training on data maintenance",
      "Preventive measures setup"
    ],
    process: [
      "Week 1: Audit - Analyze data quality and issues",
      "Week 1-2: Clean - Remove duplicates and standardize",
      "Week 2: Validate - Set up quality controls"
    ]
  }
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedBusinessType, setSelectedBusinessType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    company: "",
    phone: ""
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Get all unique tags from products
  const allTags = Array.from(new Set(PRODUCTS.flatMap(p => p.tags)));

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Filter by business type
      if (selectedBusinessType !== "All" && !product.businessTypes.includes(selectedBusinessType)) {
        return false;
      }

      // Filter by tags
      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some(tag => product.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.shortDescription.toLowerCase().includes(query) ||
          product.bestFor.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [selectedTags, selectedBusinessType, searchQuery]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
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
      console.error("Submission error:", error);
      setSubmitStatus("error");
    }
  };

  const hasActiveFilters = selectedTags.length > 0 || searchQuery.trim() !== "" || selectedBusinessType !== "All";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Ready to Go</span> Products
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Off-the-shelf solutions ready to deploy. Choose what you need, get started immediately.
          </p>
        </motion.div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-72 flex-shrink-0"
            >
              <div className="bg-white/5 border border-purple-900/20 rounded-xl p-6 sticky top-24">
                {/* Mobile Toggle */}
                <div className="lg:hidden mb-4">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors"
                  >
                    <Filter size={18} />
                    {sidebarOpen ? "Hide Filters" : "Show Filters"}
                  </button>
                </div>

                {/* Sidebar Content */}
                {(sidebarOpen || window.innerWidth >= 1024) && (
                  <div className="space-y-6">
                    {/* All Products Button */}
                    <div>
                      <button
                        onClick={clearFilters}
                        className="w-full text-left px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all"
                      >
                        All Products
                      </button>
                    </div>

                    {/* Search */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground/80 mb-3">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" size={18} />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-purple-900/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
                        />
                      </div>
                    </div>

                    {/* Category Tags */}
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

                    {/* Business Type Filter */}
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

                    {/* Clear Filters */}
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
                )}
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
                  <button
                    onClick={clearFilters}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Clear filters and try again
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group bg-white/5 border border-purple-900/20 rounded-xl overflow-hidden hover:border-purple-600/50 transition-all hover:shadow-lg hover:shadow-purple-600/10"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-6">
                        <div className="mb-3 flex flex-wrap gap-2">
                          {product.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                        <p className="text-foreground/70 text-sm mb-4">{product.shortDescription}</p>

                        <div className="flex items-center gap-4 mb-6 text-sm">
                          <div className="flex items-center gap-2 text-foreground/60">
                            <Clock size={16} />
                            {product.timeline}
                          </div>
                          <div className="text-xl font-bold text-purple-600">
                            ${product.price.toLocaleString()} {product.currency}
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

              {/* Results Count */}
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
                onClick={() => {
                  setSelectedProduct(null);
                  setShowForm(false);
                }}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Overview */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Overview</h3>
                <p className="text-foreground/70 mb-4">{selectedProduct.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-purple-900/20 rounded-lg p-4">
                    <div className="text-sm text-foreground/60 mb-1">Price</div>
                    <div className="text-2xl font-bold text-purple-600">
                      ${selectedProduct.price.toLocaleString()}
                    </div>
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

              {/* Deliverables */}
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

              {/* Process */}
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

              {/* Inquiry Form */}
              {showForm ? (
                <div className="bg-white/5 border border-purple-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Get Started</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-2 bg-white/10 border border-purple-900/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-600"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-2 bg-white/10 border border-purple-900/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-600"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 bg-white/10 border border-purple-900/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-600"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 bg-white/10 border border-purple-900/20 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-purple-600"
                        placeholder="Your phone"
                      />
                    </div>

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

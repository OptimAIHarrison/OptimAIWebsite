
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
export const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450259077/HbZCzrQQJzoEYBqv.png";
export const LOGO_ICON_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663450259077/HbZCzrQQJzoEYBqv.png";

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "All Services", href: "/services" },
  { label: "Ready to Go Products", href: "/products" },
  { label: "Resources", href: "/resources" },
  { label: "Why OptimAI", href: "/why-optimai" },
];

export const CONTACT_NAV = { label: "Contact", href: "/contact" };

export const WHY_OPTIMAI_HREF = "/why-optimai";

export const SERVICES = [
  {
    id: "strategic-advisory",
    title: "Strategic Advisory & Consulting",
    description: "Expert guidance on automation and AI adoption tailored for your business",
    icon: "target",
    whatWeDo: "We analyze your business, identify where automation can save time and money, and create a clear roadmap for implementing AI and automation solutions that fit your goals.",
    options: [
      { name: "Readiness Assessment", description: "Evaluate your current processes and technology to see where automation fits best" },
      { name: "Strategy & Roadmap", description: "Create a step-by-step plan for implementing automation over time" },
      { name: "Technology Review", description: "Assess your current tools and recommend the best stack for your needs" },
    ],
    useCases: [
      "You're unsure where to start with automation",
      "You want a clear plan before investing in new tools",
      "You need expert advice on which solutions fit your business",
    ],
    process: [
      "We meet with your team to understand your business and goals",
      "We analyze your current workflows and identify automation opportunities",
      "We present findings and create a customized roadmap",
      "We recommend specific tools and next steps",
    ],
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
    icon: "trending-up",
    whatWeDo: "We set up automated systems that find potential customers, nurture them with personalized content, and turn them into paying clients—all while you sleep.",
    options: [
      { name: "Lead Generation Automation", description: "Set up systems to automatically find and capture leads from your target audience" },
      { name: "Email Marketing Sequences", description: "Create automated email campaigns that nurture leads and drive conversions" },
      { name: "AI Search Optimization", description: "Optimize your content so AI and search engines recommend you to customers" },
      { name: "Social Media Automation", description: "Schedule and automate your social media presence across platforms" },
    ],
    useCases: [
      "You spend too much time on manual marketing tasks",
      "You want more leads without hiring a full marketing team",
      "You need consistent customer engagement without the effort",
    ],
    process: [
      "We audit your current marketing channels and identify gaps",
      "We set up automated lead capture and nurturing systems",
      "We create email sequences and content calendars",
      "We monitor performance and optimize for better results",
    ],
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
    title: "Business Process Automation",
    description: "Streamline operational workflows and reduce manual effort",
    icon: "settings",
    whatWeDo: "We identify repetitive tasks in your business and automate them using AI and software robots, freeing up your team to focus on high-value work.",
    options: [
      { name: "Workflow Automation", description: "Automate routine tasks like data entry, approvals, and reporting" },
      { name: "AI Chatbots", description: "Deploy intelligent chatbots to handle customer inquiries 24/7" },
      { name: "Document Processing", description: "Automatically extract and process information from documents" },
      { name: "System Integration", description: "Connect your tools so data flows automatically between systems" },
    ],
    useCases: [
      "Your team spends hours on manual data entry",
      "You get repetitive customer questions that slow down support",
      "You need data to flow between multiple tools without manual work",
    ],
    process: [
      "We map out your current workflows and identify bottlenecks",
      "We design automation solutions tailored to your processes",
      "We implement and test the automation",
      "We train your team and provide ongoing support",
    ],
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
    title: "AI Integration & Analytics",
    description: "Seamless integration of advanced AI capabilities with existing systems",
    icon: "cpu",
    whatWeDo: "We integrate powerful AI tools into your existing systems so you can make smarter decisions, predict trends, and automate complex tasks.",
    options: [
      { name: "Predictive Analytics", description: "Use AI to forecast trends and make data-driven decisions" },
      { name: "Customer Intelligence", description: "Analyze customer behavior to personalize experiences and increase sales" },
      { name: "Content Generation", description: "Use AI to create marketing copy, reports, and content at scale" },
      { name: "System Integration", description: "Connect AI tools with your CRM, accounting, and other platforms" },
    ],
    useCases: [
      "You want to make decisions based on data, not guesses",
      "You need to process large amounts of data quickly",
      "You want to personalize customer experiences at scale",
    ],
    process: [
      "We assess your data and systems to identify AI opportunities",
      "We select and configure the right AI tools for your needs",
      "We integrate AI with your existing platforms",
      "We set up dashboards and reporting so you can see results",
    ],
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
    title: "Managed Services & Support",
    description: "Ongoing support, optimization, and team upskilling",
    icon: "shield",
    whatWeDo: "We don't just build and leave. We continuously monitor, optimize, and support your automation systems to ensure they keep delivering results.",
    options: [
      { name: "Ongoing Support", description: "Get help when you need it—technical support and troubleshooting" },
      { name: "Performance Optimization", description: "We monitor your systems and continuously improve performance" },
      { name: "Team Training", description: "Train your team to use and manage automation tools effectively" },
      { name: "System Updates", description: "Keep your automation systems current with the latest features" },
    ],
    useCases: [
      "You want peace of mind that your systems are running smoothly",
      "Your team needs training to manage new tools",
      "You want ongoing optimization to get better results",
    ],
    process: [
      "We set up monitoring to track system performance",
      "We provide regular reports on what's working and what can improve",
      "We make optimizations based on performance data",
      "We offer training and support to your team as needed",
    ],
    details: [
      "Ongoing Support & Maintenance",
      "Performance Monitoring & Optimization",
      "Team Training & Upskilling",
    ],
    technicalDetails: "Continuous monitoring and refinement of deployed solutions, regular performance reviews, and comprehensive training programs to empower your team to manage and optimize new technologies.",
  },
  {
    id: "ai-search-optimization",
    title: "AI Search & Answer Optimization",
    description: "Get found by AI tools and appear in AI-powered search results and recommendations",
    icon: "search",
    whatWeDo: "We optimize your content so AI tools like ChatGPT, Perplexity, and Google's AI Overview recommend your business as the answer to customer questions. We cover AI Answer Optimization (AEO), Generative Engine Optimization (GEO), and AI Search Optimization (AIO) in one comprehensive strategy.",
    options: [
      { name: "AI Answer Optimization (AEO)", description: "Get featured in AI chatbot responses and answers" },
      { name: "Generative Engine Optimization (GEO)", description: "Appear in generative AI outputs and recommendations" },
      { name: "AI Search Optimization (AIO)", description: "Rank in AI-powered search platforms and discovery tools" },
      { name: "Full Strategy", description: "Complete optimization across all AI search and answer platforms" },
    ],
    useCases: [
      "You want to be found by AI search tools like ChatGPT and Perplexity",
      "You're losing leads to competitors who appear in AI results",
      "You need to adapt your visibility strategy for the AI-first future",
    ],
    process: [
      "We analyze how AI tools currently answer questions in your industry",
      "We audit your content and optimize it for AI discovery across all platforms",
      "We create new content specifically designed for AI recommendations",
      "We monitor performance across AI platforms and continuously optimize",
    ],
    details: [
      "AI Answer Optimization (AEO)",
      "Generative Engine Optimization (GEO)",
      "AI Search Optimization (AIO)",
      "Cross-Platform Monitoring",
    ],
    technicalDetails: "Comprehensive optimization strategy to maximize visibility across AI-powered search platforms, generative AI engines, and AI chatbots. Ensures your business is recommended to users across all major AI tools and discovery platforms.",
  },
];


export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    company: "Tech Startup",
    role: "Founder",
    text: "OptimAI helped us automate our entire customer support process. We went from 40 hours/week of manual work to fully automated responses. Game-changer!",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    name: "Michael Chen",
    company: "E-commerce Business",
    role: "Operations Manager",
    text: "The AI chatbot setup was seamless. Our conversion rate increased by 35% and customer satisfaction improved dramatically. Highly recommend!",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    name: "Emma Davis",
    company: "Professional Services",
    role: "CEO",
    text: "OptimAI's strategic advisory helped us identify automation opportunities we never knew existed. ROI exceeded expectations within 3 months.",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
];

export const CASE_STUDIES = [
  {
    title: "Reduced Manual Work by 80%",
    company: "Tech Startup",
    description: "Automated repetitive data entry and reporting tasks",
    result: "Saved 32 hours/week, allowing team to focus on growth",
  },
  {
    title: "Increased Lead Generation by 150%",
    company: "SaaS Company",
    description: "Implemented AI-powered lead capture and nurturing",
    result: "Generated 300+ qualified leads in first month",
  },
  {
    title: "Improved Customer Support Response Time",
    company: "E-commerce Business",
    description: "Deployed AI chatbot for 24/7 customer support",
    result: "Response time reduced from 24 hours to instant",
  },
];


export const PRICING_TIERS = [
  {
    name: "Starter",
    price: 99,
    description: "Perfect for small businesses getting started",
    features: [
      "Up to 1 automation workflow",
      "Email support",
      "Basic analytics",
      "30-day free trial",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: 299,
    description: "For growing businesses with multiple needs",
    features: [
      "Up to 5 automation workflows",
      "Priority email & chat support",
      "Advanced analytics",
      "Custom integrations",
      "Monthly strategy calls",
    ],
    popular: true,
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: null,
    description: "Custom solutions for large organizations",
    features: [
      "Unlimited automation workflows",
      "24/7 dedicated support",
      "Custom development",
      "API access",
      "Quarterly business reviews",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
  },
];


export const FAQ_ITEMS = [
  {
    question: "How long does implementation typically take?",
    answer: "Most projects take 2-6 weeks depending on complexity. We provide a detailed timeline during the discovery phase so you know exactly what to expect.",
  },
  {
    question: "Do I need technical expertise to use your solutions?",
    answer: "No! We handle all the technical setup and provide training for your team. Our solutions are designed to be user-friendly and require no coding knowledge.",
  },
  {
    question: "What if I need custom changes after implementation?",
    answer: "We offer ongoing support and optimization. Any custom changes can be discussed with our team, and we'll provide a quote based on the scope of work.",
  },
  {
    question: "Can you integrate with my existing tools?",
    answer: "Yes! We specialize in integrating with popular platforms like Zapier, Make, HubSpot, Salesforce, and many others. Let us know your tech stack during consultation.",
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer email support, documentation, video tutorials, and for premium clients, direct access to our team for strategy calls and optimization.",
  },
  {
    question: "Is there a contract or long-term commitment?",
    answer: "No long-term contracts required. We work on project basis or monthly retainers if you want ongoing support. You're free to adjust or cancel anytime.",
  },
];

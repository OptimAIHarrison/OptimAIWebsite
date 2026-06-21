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
    technicalDetails: "We begin with a structured discovery process - talking with key stakeholders, mapping your existing workflows in tools like Lucidchart or Miro, and scoring processes against an automation feasibility matrix (volume, rule-based complexity, error rate, and time cost). From this we produce a Technology Maturity Index specific to your business, identifying quick wins (typically 2-4 week implementations) versus strategic long-term plays. Our roadmap is delivered as a phased implementation plan with effort/impact scoring, recommended tooling (Zapier, Make, n8n, HubSpot, custom APIs), estimated ROI per initiative, and a risk register. We also benchmark your tech stack against industry peers to surface gaps and redundancies before you spend a cent.",
  },
  {
    id: "marketing-automation",
    title: "Marketing & Growth Automation",
    description: "Automated marketing systems to enhance visibility and lead generation",
    icon: "trending-up",
    whatWeDo: "We set up automated systems that find potential customers, nurture them with personalized content, and turn them into paying clients - all while you sleep.",
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
    technicalDetails: "Our marketing automation stack typically combines a CRM (HubSpot, ActiveCampaign, or GoHighLevel) with a workflow engine (Make or Zapier) and an AI content layer. Lead capture is handled via smart forms, chatbot funnels, and enrichment tools like Apollo or Clay that auto-populate contact records with firmographic data. Email sequences are built with behavioural triggers - open rates, link clicks, page visits - so each lead receives messaging based on their actual actions, not a fixed timer. For AI Search Optimization, we audit your content against how LLMs like ChatGPT and Perplexity currently answer questions in your category, then restructure your site content, FAQs, and schema markup to improve AI citation probability. Social scheduling is handled via Buffer or Later with AI-assisted caption generation trained on your brand voice. All campaigns feed into a unified attribution dashboard so you can see exactly which touchpoints are driving revenue.",
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
    technicalDetails: "We use a combination of native app integrations, iPaaS platforms (Make, Zapier, n8n), and where needed, custom API middleware to connect your systems. For rule-based, high-volume tasks - data entry, invoice processing, report generation - we deploy software bots that run on a schedule or trigger-based logic, with error handling and fallback notifications built in. Document processing uses OCR combined with LLM extraction (via tools like Mindee, Textract, or custom GPT-4 pipelines) to pull structured data from PDFs, emails, and forms directly into your CRM or ERP. AI chatbots are built on retrieval-augmented generation (RAG) - trained on your product docs, FAQs, and past support tickets - and deployed via website embed, WhatsApp, or Slack depending on where your customers are. Every automation includes logging, alerting, and a manual override path so your team is never left in the dark if something breaks.",
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
    technicalDetails: "AI integration starts with a data audit - assessing the quality, structure, and accessibility of your existing data sources (CRM records, transaction history, support tickets, website events). From there we identify which AI use cases are viable: predictive churn models require at least 12 months of customer data; recommendation engines need transaction history; sentiment analysis can work from as few as 500 tagged records. We connect AI models to your stack via API or direct database integration, with outputs surfaced in tools your team already uses (Salesforce, HubSpot dashboards, Notion, or custom React dashboards). For generative AI, we build prompt pipelines with guardrails - brand voice rules, output validation, and human-in-the-loop review steps for high-stakes content. Analytics dashboards are built in Metabase, Looker Studio, or custom-built depending on your existing infrastructure, with automated daily/weekly report distribution to stakeholders.",
  },
  {
    id: "managed-services",
    title: "Managed Services & Support",
    description: "Ongoing support, optimization, and team upskilling",
    icon: "shield",
    whatWeDo: "We don't just build and leave. We continuously monitor, optimize, and support your automation systems to ensure they keep delivering results.",
    options: [
      { name: "Ongoing Support", description: "Get help when you need it - technical support and troubleshooting" },
      { name: "Performance Optimisation", description: "We monitor your systems and continuously improve performance" },
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
    technicalDetails: "All managed service clients are onboarded into our monitoring infrastructure - every automation we've built is instrumented with execution logs, error alerting (via Slack or email), and uptime tracking. We conduct monthly performance reviews using a standardised scorecard: task success rate, error frequency, processing time, and business impact metrics like leads captured or hours saved. When performance dips or a tool's API changes (which happens regularly with platforms like Meta, Google, and HubSpot), we handle the fix proactively before it impacts your business. Team training is delivered as live sessions, recorded walkthroughs, and written SOPs stored in your preferred knowledge base (Notion, Confluence, Google Drive). For clients scaling rapidly, we also provide quarterly strategy reviews - reassessing your automation roadmap as your business evolves and identifying new opportunities to add.",
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
    technicalDetails: "AI Search Optimization operates across three distinct but overlapping disciplines. AEO (AI Answer Optimization) focuses on making your content the source LLMs cite when answering questions - this involves restructuring content into direct-answer formats, adding FAQ schema, building authoritative backlink profiles, and ensuring your brand entity is clearly defined across the web. GEO (Generative Engine Optimization) targets platforms like Perplexity, Gemini, and Claude - we analyse which sources these engines pull from, ensure your content appears on those reference sites, and structure your pages with clear entity relationships and factual density. AIO (AI Search Optimization) covers AI-powered discovery within Google's AI Overview and Bing Copilot - requiring technical SEO hygiene (Core Web Vitals, structured data, crawlability) combined with E-E-A-T signals (author credentials, original research, expert citations). We track AI citation frequency across platforms using a combination of manual sampling, rank-tracking tools, and custom monitoring scripts, with monthly reporting showing your share of AI-generated answers in your category.",
  },
];


export const TESTIMONIALS = [
  {
    name: "Aaron",
    company: "E-commerce Brand",
    role: "Founder",
    text: "We used to scramble every week to get content out the door. Now it's scheduled a month ahead and actually sounds like us. It's freed up time I didn't know I had.",
    image: "👨‍💼",
    content: "We used to scramble every week to get content out the door. Now it's scheduled a month ahead and actually sounds like us. It's freed up time I didn't know I had.",
  },
  {
    name: "Jasmine",
    company: "Full Service Agency",
    role: "Head of Growth",
    text: "Before this, leads were falling through the cracks because nobody had time to follow up properly. Now every touchpoint is tracked and nothing gets missed. Our team can finally see the full picture.",
    image: "👩‍💼",
    content: "Before this, leads were falling through the cracks because nobody had time to follow up properly. Now every touchpoint is tracked and nothing gets missed. Our team can finally see the full picture.",
  },
  {
    name: "Sarah Johnson",
    company: "Tech Startup",
    role: "Founder",
    text: "OptimAI automated a big chunk of our manual reporting work. It's not flashy, it just quietly saves us a day or two every week.",
    image: "👩‍💼",
    content: "OptimAI automated a big chunk of our manual reporting work. It's not flashy, it just quietly saves us a day or two every week.",
  },
  {
    name: "Michael Chen",
    company: "E-commerce Business",
    role: "Operations Manager",
    text: "The chatbot setup took the pressure off our support inbox. We still get plenty of questions, but the routine ones are handled before they ever reach a person.",
    image: "👨‍💼",
    content: "The chatbot setup took the pressure off our support inbox. We still get plenty of questions, but the routine ones are handled before they ever reach a person.",
  },
  {
    name: "Emma Davis",
    company: "Professional Services",
    role: "CEO",
    text: "OptimAI's advisory work helped us prioritise the automation projects that were actually worth doing, instead of chasing every shiny tool.",
    image: "👩‍💼",
    content: "OptimAI's advisory work helped us prioritise the automation projects that were actually worth doing, instead of chasing every shiny tool.",
  },
  {
    name: "Priya",
    company: "SaaS Company",
    role: "Sales Lead",
    text: "We were losing leads simply because nobody got to them fast enough. Now the first response goes out automatically and the sales team can focus on actually closing.",
    image: "👩‍💼",
    content: "We were losing leads simply because nobody got to them fast enough. Now the first response goes out automatically and the sales team can focus on actually closing.",
  },
];

export const CASE_STUDIES = [
  {
    title: "Plug-and-Play Content Engine for an E-commerce Brand",
    company: "E-commerce Brand",
    description: "Built a content engine that plans, drafts and schedules social and email content automatically",
    result: "Content now goes out on a consistent schedule without anyone manually building it each week",
    client: "E-commerce Brand",
    testimonialName: "Aaron",
    testimonialRole: "Founder",
    testimonialQuote: "We used to scramble every week to get content out the door. Now it's scheduled a month ahead and actually sounds like us. It's freed up time I didn't know I had.",
    challenge: "Content was inconsistent because it depended on whoever had a spare hour that week. Posts were often late, off-brand, or skipped entirely when things got busy.",
    solution: "We built a content engine that generates on-brand draft posts and email copy from a simple content calendar input, routes them through a quick approval step, and auto-schedules everything across the brand's channels.",
    metrics: [
      { label: "Content Published Per Month", before: "~6 posts", after: "20+ posts" },
      { label: "Time Spent Planning Content", before: "5 hrs/week", after: "1 hr/week" },
      { label: "Missed Posting Weeks", before: "Roughly monthly", after: "None since launch" },
    ],
    results: {
      timeSaved: "4 hrs/week",
      costSavings: "$1,600/month",
      productivityGain: "Content now ships on a fixed schedule",
    },
  },
  {
    title: "Full CRM Build for a Full-Service Agency",
    company: "Full Service Agency",
    description: "Built a CRM to manage nurture sequences, engagement tracking and BD touchpoints in one place",
    result: "The team can now see every lead's full history instead of piecing it together across inboxes and spreadsheets",
    client: "Full Service Agency",
    testimonialName: "Jasmine",
    testimonialRole: "Head of Growth",
    testimonialQuote: "Before this, leads were falling through the cracks because nobody had time to follow up properly. Now every touchpoint is tracked and nothing gets missed. Our team can finally see the full picture.",
    challenge: "Leads and client touchpoints were scattered across email, spreadsheets and individual team members' memory. Follow-ups were inconsistent and BD activity wasn't tracked anywhere central.",
    solution: "We designed and built a CRM tailored to the agency's BD process, with automated nurture sequences, engagement tracking per contact, and a shared view of every touchpoint across the team.",
    metrics: [
      { label: "Lead Follow-Up Within 48hrs", before: "~40%", after: "~90%" },
      { label: "BD Activity Visibility", before: "Scattered across team", after: "Centralised in one system" },
      { label: "Time Spent Compiling Pipeline Reports", before: "3 hrs/week", after: "Automatic" },
    ],
    results: {
      timeSaved: "6 hrs/week",
      costSavings: "$2,400/month",
      productivityGain: "Consistent follow-up across the whole pipeline",
    },
  },
  {
    title: "Reduced Manual Reporting Work",
    company: "Tech Startup",
    description: "Automated repetitive data entry and reporting tasks",
    result: "Freed up roughly a day a week that was previously lost to manual data entry",
    client: "Tech Startup",
    testimonialName: "Sarah Johnson",
    testimonialRole: "Founder",
    testimonialQuote: "OptimAI automated a big chunk of our manual reporting work. It's not flashy, it just quietly saves us a day or two every week.",
    challenge: "Manual data entry and report compilation was taking up a significant chunk of the team's week, with errors creeping in during busy periods.",
    solution: "We implemented automated workflows using Make and Zapier to pull data from source systems and assemble reports without manual intervention.",
    metrics: [
      { label: "Manual Work Hours/Week", before: "12 hours", after: "4 hours" },
      { label: "Reporting Error Rate", before: "~8%", after: "~1%" },
      { label: "Time to Produce Weekly Report", before: "Half a day", after: "Under an hour" },
    ],
    results: {
      timeSaved: "8 hrs/week",
      costSavings: "$3,200/month",
      productivityGain: "A full day a week back for higher-value work",
    },
  },
  {
    title: "More Consistent Lead Follow-Up",
    company: "SaaS Company",
    description: "Implemented automated lead capture and follow-up sequencing",
    result: "Leads now get a consistent first response instead of waiting on whoever was free",
    client: "SaaS Company",
    testimonialName: "Priya",
    testimonialRole: "Sales Lead",
    testimonialQuote: "We were losing leads simply because nobody got to them fast enough. Now the first response goes out automatically and the sales team can focus on actually closing.",
    challenge: "Inbound leads were inconsistently followed up — some were contacted within the hour, others sat for days depending on team workload.",
    solution: "We deployed an automated lead capture and scoring system with a structured follow-up sequence, so every lead gets a timely first touch regardless of team capacity.",
    metrics: [
      { label: "Leads Contacted Within 1 Hour", before: "~30%", after: "~85%" },
      { label: "Average First Response Time", before: "Several hours", after: "Under 10 minutes" },
      { label: "Lead Scoring Coverage", before: "Manual, inconsistent", after: "Automatic for every lead" },
    ],
    results: {
      timeSaved: "5 hrs/week",
      costSavings: "$1,900/month",
      productivityGain: "Faster, more consistent lead response",
    },
  },
  {
    title: "Faster Customer Support Response Time",
    company: "E-commerce Business",
    description: "Deployed an AI chatbot to handle routine customer support questions",
    result: "Routine questions are now answered instantly, leaving the support team to focus on the harder cases",
    client: "E-commerce Business",
    testimonialName: "Michael Chen",
    testimonialRole: "Operations Manager",
    testimonialQuote: "The chatbot setup took the pressure off our support inbox. We still get plenty of questions, but the routine ones are handled before they ever reach a person.",
    challenge: "The support team was handling a high volume of repetitive questions (order status, returns, shipping times), which slowed down responses to more complex issues.",
    solution: "We implemented an AI chatbot connected to the brand's knowledge base and order system to handle common queries instantly, with a clear handoff to a human for anything it can't resolve.",
    metrics: [
      { label: "First Response Time", before: "Several hours", after: "Instant for common queries" },
      { label: "Tickets Resolved Without Human Input", before: "0%", after: "~35%" },
      { label: "Customer Satisfaction Score", before: "72%", after: "88%" },
    ],
    results: {
      timeSaved: "10 hrs/week",
      costSavings: "$2,100/month",
      productivityGain: "More support capacity without adding headcount",
    },
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

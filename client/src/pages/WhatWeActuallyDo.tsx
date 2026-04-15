import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Search, ClipboardList, Eye, Hammer, CheckSquare, Rocket, TrendingUp, Zap } from "lucide-react";

export default function WhatWeActuallyDo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const phases = [
    {
      number: "1",
      title: "Look & Audit",
      description: "We take a close look at how your business actually works right now.",
      details: [
        "Meet with your team",
        "Understand your current processes",
        "Identify pain points and bottlenecks",
        "Document what's working and what's not",
      ],
      complexity: "Simple",
      icon: Search,
    },
    {
      number: "2",
      title: "Take a Brief",
      description: "We listen to what you need and what success looks like for you.",
      details: [
        "Understand your business goals",
        "Learn about your team's challenges",
        "Define what 'success' means",
        "Discuss budget and timeline",
      ],
      complexity: "Simple",
      icon: ClipboardList,
    },
    {
      number: "3",
      title: "See What You Already Do",
      description: "We map out your existing systems and tools to work with what you have.",
      details: [
        "Audit existing software and tools",
        "Understand your data flow",
        "Identify what can be improved",
        "Plan integration points",
      ],
      complexity: "Simple → Intermediate",
      icon: Eye,
    },
    {
      number: "4",
      title: "Build",
      description: "We create custom solutions that fit your business perfectly.",
      details: [
        "Design automation workflows",
        "Build custom integrations",
        "Set up AI tools and chatbots",
        "Create your personalized solution",
      ],
      complexity: "Intermediate",
      icon: Hammer,
    },
    {
      number: "5",
      title: "Test",
      description: "We make sure everything works smoothly before going live.",
      details: [
        "Test all workflows and integrations",
        "Check for errors and edge cases",
        "Verify data accuracy",
        "Get your approval before launch",
      ],
      complexity: "Intermediate",
      icon: CheckSquare,
    },
    {
      number: "6",
      title: "Implement",
      description: "We launch your solution with minimal disruption to your business.",
      details: [
        "Deploy to your live environment",
        "Monitor performance closely",
        "Train your team on new systems",
        "Provide hands-on support",
      ],
      complexity: "Intermediate → Advanced",
      icon: Rocket,
    },
    {
      number: "7",
      title: "Keep It Going & Evolve",
      description: "We continuously optimize and advance your automation as your business grows.",
      details: [
        "Monitor system performance",
        "Optimize based on real usage",
        "Add new features and capabilities",
        "Scale as your business grows",
      ],
      complexity: "Advanced",
      icon: TrendingUp,
    },
    {
      number: "8",
      title: "Full End-to-End AI & Automation",
      description: "Your business runs on intelligent, fully automated systems with AI management.",
      details: [
        "Complete process automation",
        "AI-powered decision making",
        "Predictive analytics and insights",
        "Continuous improvement engine",
      ],
      complexity: "Full Advanced",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-purple-100/40 via-transparent to-transparent">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            What We <span className="gradient-text">Actually Do</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-3xl mx-auto mb-4">
            No jargon. No fluff. Just a simple, step-by-step journey from where you are now to a fully automated, AI-powered business.
          </motion.p>
          <motion.p variants={itemVariants} className="text-lg text-foreground/60 max-w-3xl mx-auto italic">
            You can enter at any stage, go as simple or technical as you need, and stay for as long or short as works for you.
          </motion.p>
        </motion.div>
      </section>

      {/* Workflow Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Flexibility & Partnership Message */}
            <motion.div variants={itemVariants} className="mb-16 text-center">
              <div className="glass-card p-8 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-2 border-purple-300/50">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Your Journey, Your Way</h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-4">
                  This isn't a one-size-fits-all process. You can enter at any stage and exit whenever you're ready. Need just an audit? Perfect. Want a quick automation fix? We've got you. Ready for a full transformation? Let's go.
                </p>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-4">
                  Whether you need simple solutions or advanced AI integration, short-term projects or long-term partnerships, we adapt to what works for you.
                </p>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                  Throughout every step, we're here with you as your consultancy partner. We guide you, explain everything in simple terms, and make sure your team understands and owns the process.
                </p>
              </div>
            </motion.div>

            {/* Workflow Phases */}
            <div className="space-y-8">
              {phases.map((phase, idx) => {
                const IconComponent = phase.icon;
                return (
                  <motion.div key={idx} variants={itemVariants}>
                    <div className="glass-card p-8 rounded-2xl">
                      <div className="flex gap-6">
                        {/* Left: Number and Icon */}
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-2xl">
                              {phase.number}
                            </div>
                          </div>
                          <IconComponent size={40} className="text-purple-600" />
                          {idx < phases.length - 1 && (
                            <div className="hidden sm:block w-1 h-12 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full" />
                          )}
                        </div>

                        {/* Right: Content */}
                        <div className="flex-1 pt-2">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-foreground mb-2">{phase.title}</h3>
                              <p className="text-foreground/70 text-lg mb-4">{phase.description}</p>
                            </div>
                            <div className="flex-shrink-0">
                              <span className="inline-block px-4 py-2 bg-purple-100/50 text-purple-700 rounded-full text-sm font-semibold whitespace-nowrap">
                                {phase.complexity}
                              </span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {phase.details.map((detail, detailIdx) => (
                              <div key={detailIdx} className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                                <span className="text-foreground/80">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary Section */}
            <motion.div variants={itemVariants} className="mt-16 glass-card p-12 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-2 border-purple-300/50">
              <h2 className="text-3xl font-bold mb-6 text-center">The Journey in Simple Terms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">Phases 1-3: Understanding</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    We start by understanding your business, your challenges, and your goals. We listen more than we talk and make sure we truly understand what matters to you. Many clients stop here with just the audit and recommendations.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">Phases 4-6: Building & Launching</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    We design, build, test, and launch your custom solution. Every step is done with your input, and we make sure your team is trained and ready. You can go simple or technical, depending on your needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">Phases 7-8: Growing & Evolving</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    We don't just launch and leave. We continuously monitor, optimize, and evolve your systems as your business grows and your needs change. Stay with us for as long as it makes sense.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">Throughout: Your Way</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    You're in control. Enter at any stage. Exit whenever you're ready. Need just an audit? Perfect. Want a quick fix? We've got you. Ready for a full transformation? Let's go. We adapt to you.
                  </p>
                </div>
              </div>
              <div className="border-t border-purple-300/50 pt-8">
                <p className="text-center text-foreground/70 leading-relaxed">
                  We're your consultancy partner every step of the way. We explain everything in simple, human terms. No jargon. No confusion. Just clarity and results.
                </p>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="mt-16 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                Let's have a conversation about where you are now and where you want to go. No pressure, no sales pitch. Just honest, practical guidance.
              </p>
              <Link href="/free-audit">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-6 rounded-xl inline-flex items-center gap-2">
                  Get Your Free AI Audit
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

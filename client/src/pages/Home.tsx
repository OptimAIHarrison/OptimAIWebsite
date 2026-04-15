import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LOGO_URL, SERVICES, TESTIMONIALS, CASE_STUDIES } from "@/const";
import { ChevronRight, ArrowRight, Star, Search, ClipboardList, Hammer, Rocket, Target, TrendingUp, Settings, Cpu, Shield } from "lucide-react";

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-40 pb-20 overflow-hidden flex items-center justify-center" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663450259077/VZWvecVBL3bTuGctm3Rvj5/Screenshot2026-04-15at11.08.49am_b8405e5d.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 -z-10 bg-black/10" />

        <motion.div
          className="container mx-auto px-4 w-full flex justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Centered Content in Glass Container */}
          <motion.div variants={itemVariants} className="backdrop-blur-2xl bg-white/30 border border-white/40 rounded-3xl p-8 md:p-16 lg:p-20 space-y-6 md:space-y-8 text-center max-w-5xl shadow-2xl">
              <div className="space-y-3 md:space-y-4">
                <motion.div
                  className="inline-block"
                  variants={itemVariants}
                >
                  <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-purple-600/20 border border-purple-500/50 text-foreground text-xs md:text-sm font-medium whitespace-nowrap">
                    Your Growth Partner in AI & Automation
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">Scale Your Business</span>
                  <br />
                  <span className="text-foreground">with Practical AI and Automation</span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto"
                >
                  Understandable, scalable, and human-centered AI solutions that drive real results. We make automation practical and accessible, so your team can focus on what matters most.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="text-sm text-foreground/60 font-medium"
                >
                  Enough of the jargon and buzzwords.
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-purple-500/50 hover:bg-purple-600/10 text-lg px-8 py-6 rounded-xl"
                  >
                    Check out what we do
                    <ChevronRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link href="/free-audit">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-6 rounded-xl">
                    Get Your Free AI Audit
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={itemVariants}
                className="flex gap-8 pt-8 border-t border-white/10 justify-center flex-wrap"
              >
                <div>
                  <p className="text-2xl font-bold text-accent">150+</p>
                  <p className="text-foreground/70 text-sm">Projects Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">$50M+</p>
                  <p className="text-foreground/70 text-sm">Client Savings</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">98%</p>
                  <p className="text-foreground/70 text-sm">Client Satisfaction</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-background">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Core Services</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
              Comprehensive solutions across strategic advisory, marketing automation, process automation, AI integration, and managed services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => setActiveService(index)}
              >
                <div className="glass-card p-6 h-full hover:border-purple-500/50 transition-all duration-300 flex flex-col">
                  <div className="mb-4">
                    {service.icon === 'target' && <Target size={48} className="text-purple-600" />}
                    {service.icon === 'trending-up' && <TrendingUp size={48} className="text-purple-600" />}
                    {service.icon === 'settings' && <Settings size={48} className="text-purple-600" />}
                    {service.icon === 'cpu' && <Cpu size={48} className="text-purple-600" />}
                    {service.icon === 'shield' && <Shield size={48} className="text-purple-600" />}
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 text-sm flex-grow">{service.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = '/services';
                    }}
                    className="text-accent hover:text-accent/80 font-medium text-xs mt-4 inline-flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer"
                  >
                    More
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Service Details */}
          <motion.div
            variants={itemVariants}
            className="mt-12 glass-card p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {SERVICES[activeService].title}
                </h3>
                <ul className="space-y-3">
                  {SERVICES[activeService].details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ChevronRight className="text-accent mt-1 flex-shrink-0" size={20} />
                      <span className="text-foreground/80">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4 text-accent">Technical Details</h4>
                <p className="text-foreground/70 leading-relaxed">
                  {SERVICES[activeService].technicalDetails}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link href="/services">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-6 rounded-xl">
                View All Services
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* What We Actually Do Section */}
      <section className="py-20 bg-gradient-to-b from-purple-100/20 to-transparent">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              What We <span className="gradient-text">Actually Do</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg mb-4">
              No jargon. No fluff. Just a simple, step-by-step journey from where you are now to a fully automated, AI-powered business.
            </p>
            <p className="text-foreground/60 max-w-2xl mx-auto text-base italic">
              You can start anywhere, go as simple or technical as you like, and stay as long or short as you need. This is your journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl text-center">
              <Search size={48} className="text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Look & Audit</h3>
              <p className="text-foreground/70 text-sm">We understand how your business works right now and identify opportunities.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl text-center">
              <ClipboardList size={48} className="text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Take a Brief</h3>
              <p className="text-foreground/70 text-sm">We listen to your goals, challenges, and what success means for your team.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl text-center">
              <Hammer size={48} className="text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Build & Test</h3>
              <p className="text-foreground/70 text-sm">We design, build, and thoroughly test your custom automation solution.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl text-center">
              <Rocket size={48} className="text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Implement & Evolve</h3>
              <p className="text-foreground/70 text-sm">We launch and continuously optimize as your business grows and changes.</p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="glass-card p-12 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-2 border-purple-300/50 text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Your Way, Your Timeline, Your Complexity Level</h3>
            <p className="text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-6">
              You can enter at any stage and exit whenever you're ready. Need just an audit? Perfect. Want a quick fix? We've got you. Ready for a full transformation? Let's go. Whether you need simple solutions or advanced AI integration, short-term projects or long-term partnerships, we adapt to what works for you.
            </p>
            <p className="text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              We explain everything in simple, human terms. No jargon. No confusion. Just clarity, guidance, and results. Your team understands and owns the process every step of the way.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Link href="/what-we-actually-do">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-6 rounded-xl">
                See Our Full Process
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Client <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
              Real results from real clients. See how we've helped businesses achieve significant growth and efficiency gains.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.map((study, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-8 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">{study.client}</p>

                <div className="space-y-4 mb-6 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-foreground/70 text-sm">Challenge</p>
                    <p className="text-foreground font-medium">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-foreground/70 text-sm">Solution</p>
                    <p className="text-foreground font-medium">{study.solution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-accent font-bold text-lg">{study.results.timeSaved}</p>
                    <p className="text-foreground/70 text-xs">Time Saved</p>
                  </div>
                  <div>
                    <p className="text-accent font-bold text-lg">{study.results.costSavings}</p>
                    <p className="text-foreground/70 text-xs">Cost Savings</p>
                  </div>
                  <div>
                    <p className="text-accent font-bold text-lg">{study.results.productivityGain}</p>
                    <p className="text-foreground/70 text-xs">Productivity</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link href="/case-studies">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-6 rounded-xl">
                View All Case Studies
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-background">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              What Our Clients <span className="gradient-text">Say</span>
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto glass-card p-12 text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="fill-accent text-accent" />
              ))}
            </div>

            <motion.p
              key={testimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl font-bold mb-8 text-foreground"
            >
              "{TESTIMONIALS[testimonialIndex].content}"
            </motion.p>

            <motion.div
              key={`author-${testimonialIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-2xl">{TESTIMONIALS[testimonialIndex].image}</p>
              <p className="font-bold text-lg mt-4">
                {TESTIMONIALS[testimonialIndex].name}
              </p>
              <p className="text-foreground/70">
                {TESTIMONIALS[testimonialIndex].role}
              </p>
            </motion.div>

            {/* Carousel dots */}
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === testimonialIndex
                      ? "bg-accent w-8"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="glass-card p-12 lg:p-16 text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">Transform Your Business?</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              Get your free AI and automation readiness assessment today. Discover the specific opportunities to save time, reduce costs, and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-audit">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-6 rounded-xl">
                  Start Your Free Audit
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-purple-500/50 hover:bg-purple-600/10 text-lg px-8 py-6 rounded-xl"
                >
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

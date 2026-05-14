import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, ArrowRight, Clock, MessageCircle, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const QUICK_LINKS = [
  {
    icon: <Zap size={20} className="text-purple-500" />,
    label: "Want a free audit?",
    description: "Get a full breakdown of your automation opportunities — free.",
    href: "/free-audit",
    cta: "Book Free Audit",
  },
  {
    icon: <MessageCircle size={20} className="text-purple-500" />,
    label: "Not sure where to start?",
    description: "Browse our services or ready-to-go products.",
    href: "/products",
    cta: "See How It Works",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitContact = trpc.forms.submitContact.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await submitContact.mutateAsync(formData);
      if (result.success) {
        toast.success(result.message);
        setSubmitted(true);
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-purple-600/10 border border-purple-400/30 rounded-full text-sm font-semibold text-purple-700">
              We reply within 24 hours
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Let's have a{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                conversation
              </span>
            </h1>
            <p className="text-xl text-foreground/70">
              No sales pressure. No jargon. Just an honest chat about what you're trying to solve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact details */}
              <div className="p-6 rounded-2xl bg-white/5 border-2 border-purple-900/20 space-y-5">
                <h2 className="text-lg font-bold text-foreground">Contact Details</h2>

                <a
                  href="mailto:hello@optimai.com.au"
                  className="flex items-center gap-4 group"
                >
                  <div className="p-2.5 rounded-lg bg-purple-600/10 group-hover:bg-purple-600/20 transition-colors">
                    <Mail size={18} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-foreground font-medium group-hover:text-purple-600 transition-colors">
                      hello@optimai.com.au
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-purple-600/10">
                    <MapPin size={18} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-foreground font-medium">Melbourne, Victoria</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-purple-600/10">
                    <Clock size={18} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-0.5">Response Time</p>
                    <p className="text-foreground font-medium">Within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="flex flex-col gap-4 mt-8">
                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest px-1">
                  Looking for something specific?
                </p>
                {QUICK_LINKS.map((item, idx) => (
                  <Link key={idx} href={item.href}>
                    <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 border-2 border-purple-900/20 hover:border-purple-500/40 transition-all cursor-pointer">
                      <div className="p-2 rounded-lg bg-purple-600/10 flex-shrink-0 group-hover:bg-purple-600/20 transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-foreground mb-0.5">{item.label}</p>
                        <p className="text-xs text-foreground/60 leading-snug">{item.description}</p>
                      </div>
                      <ArrowRight size={16} className="text-foreground/30 group-hover:text-purple-500 flex-shrink-0 mt-1 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="p-8 rounded-2xl bg-white/5 border-2 border-purple-900/20">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
                      <ArrowRight size={28} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Message sent!</h3>
                    <p className="text-foreground/60 mb-6">
                      We'll be in touch within 24 hours. In the meantime, feel free to explore our services.
                    </p>
                    <Link href="/services">
                      <Button variant="outline" className="border-purple-400/50 hover:bg-purple-500/10">
                        Browse Services
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Send us a message</h2>
                    <p className="text-foreground/60 text-sm mb-8">Tell us what's on your mind and we'll get back to you.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 text-foreground placeholder-foreground/40 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all shadow-sm"
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 text-foreground placeholder-foreground/40 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all shadow-sm"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">Company</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 text-foreground placeholder-foreground/40 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all shadow-sm"
                          placeholder="Your company (optional)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
                        <textarea
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 text-foreground placeholder-foreground/40 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all shadow-sm resize-none"
                          placeholder="Tell us what you're working on, what's slowing you down, or just say hi..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={submitContact.isPending}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg py-6 rounded-xl disabled:opacity-50"
                      >
                        {submitContact.isPending ? "Sending..." : "Send Message"}
                        <ArrowRight className="ml-2" size={20} />
                      </Button>


                    </form>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

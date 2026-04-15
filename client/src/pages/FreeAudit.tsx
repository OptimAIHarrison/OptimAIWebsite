import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function FreeAudit() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "1-10",
    challenge: "",
  });
  const submitAudit = trpc.forms.submitAudit.useMutation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await submitAudit.mutateAsync(formData);
      if (result.success) {
        toast.success(result.message);
        setStep(3);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit audit request");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            Get Your <span className="gradient-text">Free Audit</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover where your business can optimize with AI and automation. Our experts will analyze your operations and provide actionable insights.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20">
        <motion.div
          className="container mx-auto px-4 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {step === 1 || step === 2 ? (
            <motion.div variants={itemVariants} className="glass-card p-8">
              <div className="flex justify-between mb-8">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        s <= step
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-white/10 text-foreground/50"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 2 && <div className={`h-1 flex-1 mx-4 ${s < step ? "bg-accent" : "bg-white/10"}`} />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent"
                        placeholder="Your Company"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Team Size</label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent"
                      >
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="200+">200+ employees</option>
                      </select>
                    </div>
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg py-6 rounded-xl"
                    >
                      Next
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-2xl font-bold mb-6">What's your main challenge?</h2>
                    <div>
                      <label className="block text-sm font-medium mb-2">Describe your biggest operational challenge</label>
                      <textarea
                        rows={6}
                        value={formData.challenge}
                        onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent"
                        placeholder="Tell us about the processes that are slowing you down, manual tasks, or areas where you think AI could help..."
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="flex-1 text-lg py-6 rounded-xl"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitAudit.isPending}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg py-6 rounded-xl disabled:opacity-50"
                      >
                        {submitAudit.isPending ? "Submitting..." : "Get My Audit"}
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="glass-card p-12 text-center">
              <CheckCircle size={64} className="mx-auto mb-6 text-accent" />
              <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
              <p className="text-foreground/70 mb-8">
                Your audit request has been received. Our team will analyze your business and contact you within 24 hours with personalized recommendations.
              </p>
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg py-6 rounded-xl"
              >
                Back to Home
              </Button>
            </motion.div>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

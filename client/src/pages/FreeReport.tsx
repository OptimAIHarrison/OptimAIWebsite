import { SEO } from "@/components/SEO";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Calculator, Rocket } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const AUDIT_AREAS = [
  { id: "operations", label: "Operations & Workflows", description: "Streamline processes and reduce manual tasks" },
  { id: "marketing", label: "Marketing & Lead Generation", description: "Automate campaigns and improve conversions" },
  { id: "customer-support", label: "Customer Support", description: "Enhance response times and satisfaction" },
  { id: "data-analytics", label: "Data & Analytics", description: "Make data-driven decisions with AI" },
  { id: "sales", label: "Sales & CRM", description: "Accelerate pipeline and close rates" },
  { id: "finance", label: "Finance & Accounting", description: "Automate financial processes" },
];

export default function FreeReport() {
  const [step, setStep] = useState(1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "1-10",
    challenge: "",
    auditAreas: [] as string[],
    currentChallenges: "",
    automationGoals: "",
    timeline: "3-6",
    budget: "moderate",
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

  const handleAreaToggle = (areaId: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaId) ? prev.filter((id) => id !== areaId) : [...prev, areaId]
    );
    setFormData((prev) => ({
      ...prev,
      auditAreas: prev.auditAreas.includes(areaId)
        ? prev.auditAreas.filter((id) => id !== areaId)
        : [...prev.auditAreas, areaId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.auditAreas.length === 0) {
      toast.error("Please pick at least one area");
      return;
    }
    try {
      const result = await submitAudit.mutateAsync({
          ...formData,
          challenge: formData.currentChallenges || formData.automationGoals || "Not specified",
        });
      if (result.success) {
        toast.success(result.message);
        setStep(4);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong sending your request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Get Your Free AI and Automation Report | OptimAI"
        description="Tell us how your business runs and get a free report showing where AI and automation can save you time, what it's worth, and how fast it can go live."
        canonical="/free-report"
      />
      <Navigation />

      <section className="pt-40 pb-16 bg-gradient-to-b from-[#F3EDFF] via-[#F8F5FF] to-white">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            Get Your Free AI and Automation Report
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            See where AI and automation could save your business time. Tell us how you work and we'll send a free report with practical recommendations and what they're worth.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-12 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto text-left">
            {[
              { icon: Clock, title: "Where you can save time", text: "The jobs in your business that AI and automation can take off your plate." },
              { icon: Calculator, title: "What it costs and what it's worth", text: "Plain numbers for each fix, so you can decide with confidence." },
              { icon: Rocket, title: "How to get it live", text: "A simple plan and timeline. Most projects go live in weeks, not months." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white border border-[#1E1038]/10 p-5 shadow-sm">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#7C3AED]/10 text-[#7C3AED]"><item.icon size={20} /></span>
                <h3 className="mt-3 font-semibold text-[#1E1038]">{item.title}</h3>
                <p className="mt-1 text-sm text-[#1E1038]/65 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </motion.div>
          <motion.p variants={itemVariants} className="mt-6 text-sm text-[#1E1038]/60">
            Three short steps. No obligation, no lock-in contract.
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
          {step < 4 ? (
            <motion.div variants={itemVariants} className="rounded-3xl bg-white border border-[#1E1038]/10 shadow-xl shadow-purple-900/5 p-8">
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        s <= step
                          ? "bg-[#7C3AED] text-white"
                          : "bg-[#1E1038]/8 text-[#1E1038]/40"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && <div className={`h-1 flex-1 mx-4 ${s < step ? "bg-[#7C3AED]" : "bg-[#1E1038]/10"}`} />}
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
                        className="w-full bg-white border border-[#1E1038]/20 rounded-lg px-4 py-3 shadow-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
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
                        className="w-full bg-white border border-[#1E1038]/20 rounded-lg px-4 py-3 shadow-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
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
                        className="w-full bg-white border border-[#1E1038]/20 rounded-lg px-4 py-3 shadow-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="Your Company"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Team Size</label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full bg-white border border-[#1E1038]/20 rounded-lg px-4 py-3 shadow-sm text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
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
                      className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-0 text-lg py-6 rounded-xl"
                    >
                      Next
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Which areas should we look at?</h2>
                    <p className="text-foreground/70 mb-4">Select all areas relevant to your business:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {AUDIT_AREAS.map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => handleAreaToggle(area.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedAreas.includes(area.id)
                              ? "border-[#7C3AED] bg-[#7C3AED]/8 shadow-sm"
                              : "border-[#1E1038]/15 bg-white hover:border-[#7C3AED]/60 hover:bg-purple-50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 ${
                                selectedAreas.includes(area.id)
                                  ? "border-purple-600 bg-purple-600"
                                  : "border-purple-300/60"
                              }`}
                            >
                              {selectedAreas.includes(area.id) && (
                                <svg className="w-full h-full text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{area.label}</div>
                              <div className="text-sm text-foreground/60">{area.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-8">
                      <Button
                        type="button"
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="flex-1 text-lg py-6 rounded-xl"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={selectedAreas.length === 0}
                        className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-0 text-lg py-6 rounded-xl disabled:opacity-50"
                      >
                        Next
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Tell us more about your goals</h2>
                    <div>
                      <label className="block text-sm font-medium mb-2">What are your current challenges?</label>
                      <textarea
                        rows={4}
                        value={formData.currentChallenges}
                        onChange={(e) => setFormData({ ...formData, currentChallenges: e.target.value })}
                        className="w-full bg-white border border-[#1E1038]/20 rounded-lg px-4 py-3 shadow-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="Describe the processes that are slowing you down..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">What do you hope to achieve?</label>
                      <textarea
                        rows={4}
                        value={formData.automationGoals}
                        onChange={(e) => setFormData({ ...formData, automationGoals: e.target.value })}
                        className="w-full bg-white border border-[#1E1038]/20 rounded-lg px-4 py-3 shadow-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="What would success look like for your business?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Implementation Timeline</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-white border border-[#1E1038]/20 rounded-lg px-4 py-3 shadow-sm text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      >
                        <option value="1-3">Quick wins (1-3 months)</option>
                        <option value="3-6">Medium-term (3-6 months)</option>
                        <option value="6+">Long-term (6+ months)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-white border border-[#1E1038]/20 rounded-lg px-4 py-3 shadow-sm text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      >
                        <option value="tight">Tight budget (looking for ROI quickly)</option>
                        <option value="moderate">Moderate budget (willing to invest)</option>
                        <option value="flexible">Flexible budget (want the best solution)</option>
                      </select>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="flex-1 text-lg py-6 rounded-xl"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitAudit.isPending}
                        className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-0 text-lg py-6 rounded-xl disabled:opacity-50"
                      >
                        {submitAudit.isPending ? "Submitting..." : "Get My Free Report"}
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
                Your report request is in. We'll review how your business runs and get back to you within 24 hours with practical recommendations for the areas you picked.
              </p>
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-0 text-lg py-6 rounded-xl"
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

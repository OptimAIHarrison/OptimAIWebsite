import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
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

export default function FreeAudit() {
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
      toast.error("Please select at least one audit area");
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
      toast.error(error.message || "Failed to submit audit request");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-40 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            Get Your <span className="gradient-text">Free AI and Automation Audit</span>
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
          {step < 4 ? (
            <motion.div variants={itemVariants} className="glass-card p-8">
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((s) => (
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
                    {s < 3 && <div className={`h-1 flex-1 mx-4 ${s < step ? "bg-accent" : "bg-white/10"}`} />}
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
                        className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 shadow-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
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
                        className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 shadow-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
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
                        className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 shadow-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="Your Company"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Team Size</label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 shadow-sm text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
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
                    <h2 className="text-2xl font-bold mb-6">Which areas would you like audited?</h2>
                    <p className="text-foreground/70 mb-4">Select all areas relevant to your business:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {AUDIT_AREAS.map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => handleAreaToggle(area.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedAreas.includes(area.id)
                              ? "border-purple-600 bg-purple-600/15 shadow-md shadow-purple-600/20"
                              : "border-purple-300/50 bg-white/5 hover:border-purple-500/80 hover:bg-white/10"
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
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg py-6 rounded-xl disabled:opacity-50"
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
                        className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 shadow-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
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
                        className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 shadow-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="What would success look like for your business?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Implementation Timeline</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 shadow-sm text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
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
                        className="w-full bg-white/80 border-2 border-purple-300/60 rounded-lg px-4 py-3 shadow-sm text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
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
                Your audit request has been received. Our team will analyze your business and contact you within 24 hours with personalized recommendations for the areas you selected.
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

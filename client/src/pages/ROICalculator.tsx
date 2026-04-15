import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SERVICES_ROI = [
  { id: "strategic", name: "Strategic Advisory", baseSavings: 0.15, costPerMonth: 5000 },
  { id: "marketing", name: "Marketing Automation", baseSavings: 0.25, costPerMonth: 8000 },
  { id: "bpa", name: "Business Process Automation", baseSavings: 0.35, costPerMonth: 12000 },
  { id: "ai", name: "AI Integration", baseSavings: 0.40, costPerMonth: 15000 },
  { id: "managed", name: "Managed Services", baseSavings: 0.20, costPerMonth: 3000 },
];

const BUSINESS_SIZES = [
  { id: "startup", name: "Startup (1-20 employees)", teamSize: 10, avgSalary: 60000 },
  { id: "small", name: "Small Business (20-100)", teamSize: 50, avgSalary: 65000 },
  { id: "medium", name: "Medium Business (100-500)", teamSize: 250, avgSalary: 75000 },
];

export default function ROICalculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["bpa"]);
  const [businessSize, setBusinessSize] = useState("small");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);

  const business = BUSINESS_SIZES.find((b) => b.id === businessSize)!;
  const services = SERVICES_ROI.filter((s) => selectedServices.includes(s.id));

  // Calculate metrics
  const avgTimeSaved = services.length > 0 
    ? services.reduce((sum, s) => sum + s.baseSavings, 0) / services.length 
    : 0;
  
  const totalMonthlyCost = services.reduce((sum, s) => sum + s.costPerMonth, 0);
  const hoursPerMonth = hoursPerWeek * 4.33;
  const hourlyRate = (business.avgSalary / 12) / 160;
  const timeSavedMonthly = hoursPerMonth * avgTimeSaved;
  const monthlySavings = timeSavedMonthly * hourlyRate;
  const annualSavings = monthlySavings * 12;
  const netAnnualSavings = annualSavings - (totalMonthlyCost * 12);
  const roi = totalMonthlyCost > 0 ? ((netAnnualSavings / (totalMonthlyCost * 12)) * 100).toFixed(0) : 0;
  const productivityGain = (avgTimeSaved * 100).toFixed(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold mb-6">
            Calculate Your <span className="gradient-text">ROI</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover how much time, money, and productivity you can gain with Optimai's solutions.
          </motion.p>
        </motion.div>
      </section>

      {/* Calculator */}
      <section className="py-20">
        <motion.div
          className="container mx-auto px-4 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Configure Your Scenario</h3>

                {/* Business Size */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-4">Business Size</label>
                  <div className="space-y-3">
                    {BUSINESS_SIZES.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setBusinessSize(size.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          businessSize === size.id
                            ? "border-accent bg-accent/10"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <p className="font-semibold">{size.name}</p>
                        <p className="text-sm text-foreground/70">Avg salary: ${size.avgSalary.toLocaleString()}/year</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-4">Select Services</label>
                  <div className="space-y-2">
                    {SERVICES_ROI.map((service) => (
                      <label key={service.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedServices([...selectedServices, service.id]);
                            } else {
                              setSelectedServices(selectedServices.filter((s) => s !== service.id));
                            }
                          }}
                          className="w-5 h-5 rounded accent-accent"
                        />
                        <span className="font-medium">{service.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Hours Per Week */}
                <div>
                  <label className="block text-lg font-semibold mb-4">
                    Hours Spent on Manual Tasks/Week: {hoursPerWeek}h
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-sm text-foreground/70 mt-2">
                    <span>5h</span>
                    <span>100h</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-8 h-fit sticky top-24"
            >
              <h3 className="text-2xl font-bold mb-8">Your Potential ROI</h3>

              <div className="space-y-6">
                {/* Time Saved */}
                <div className="bg-purple-600/20 border border-purple-500/50 rounded-lg p-6">
                  <p className="text-foreground/70 text-sm mb-2">Time Saved Per Month</p>
                  <p className="text-4xl font-bold gradient-text">
                    {timeSavedMonthly.toFixed(0)}
                  </p>
                  <p className="text-foreground/70 text-sm mt-2">hours freed up</p>
                </div>

                {/* Cost Savings */}
                <div className="bg-pink-600/20 border border-pink-500/50 rounded-lg p-6">
                  <p className="text-foreground/70 text-sm mb-2">Annual Cost Savings</p>
                  <p className="text-4xl font-bold gradient-text">
                    ${(annualSavings / 1000).toFixed(1)}k
                  </p>
                  <p className="text-foreground/70 text-sm mt-2">after implementation costs</p>
                </div>

                {/* Productivity Gain */}
                <div className="bg-blue-600/20 border border-blue-500/50 rounded-lg p-6">
                  <p className="text-foreground/70 text-sm mb-2">Productivity Gain</p>
                  <p className="text-4xl font-bold gradient-text">
                    {productivityGain}%
                  </p>
                  <p className="text-foreground/70 text-sm mt-2">team efficiency increase</p>
                </div>

                {/* ROI */}
                <div className="bg-accent/20 border border-accent/50 rounded-lg p-6">
                  <p className="text-foreground/70 text-sm mb-2">Return on Investment</p>
                  <p className="text-4xl font-bold text-accent">
                    {roi}%
                  </p>
                  <p className="text-foreground/70 text-sm mt-2">first year ROI</p>
                </div>

                {/* CTA */}
                <Link href="/free-audit">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg py-6 rounded-xl">
                    Get Your Free Audit
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

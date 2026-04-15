import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import { Link } from "wouter";

const SERVICES_ROI = [
  { id: "strategic", name: "Strategic Advisory", timeSavingPercent: 15 },
  { id: "marketing", name: "Marketing Automation", timeSavingPercent: 25 },
  { id: "bpa", name: "Business Process Automation", timeSavingPercent: 35 },
  { id: "ai", name: "AI Integration", timeSavingPercent: 40 },
  { id: "managed", name: "Managed Services", timeSavingPercent: 20 },
];

export default function ROICalculator() {
  const [employees, setEmployees] = useState(50);
  const [automationPercent, setAutomationPercent] = useState(30);
  const [revenue, setRevenue] = useState(500000);
  const [manualHours, setManualHours] = useState(40);
  const [selectedServices, setSelectedServices] = useState<string[]>(["bpa"]);

  // Calculate metrics
  const avgTimeSavingPercent = selectedServices.length > 0
    ? selectedServices.reduce((sum, id) => {
        const service = SERVICES_ROI.find(s => s.id === id);
        return sum + (service?.timeSavingPercent || 0);
      }, 0) / selectedServices.length
    : 0;

  const totalTimeSavingPercent = Math.min(automationPercent + avgTimeSavingPercent, 95);
  const hoursPerWeekPerEmployee = manualHours;
  const totalWeeklyHours = employees * hoursPerWeekPerEmployee;
  const hoursAutomate = (totalWeeklyHours * totalTimeSavingPercent) / 100;
  const hoursAutomatePerMonth = hoursAutomate * 4.33;
  const hoursAutomatePerYear = hoursAutomatePerMonth * 12;

  const costPerHour = revenue / (employees * 2080); // 2080 hours per year
  const yearlySavings = hoursAutomatePerYear * costPerHour;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navigation />
      <main className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Calculate Your ROI
              </h1>
              <p className="text-xl text-foreground/70 mb-4">
                Discover how much time and money you could save with OptimAI
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-foreground/60 bg-purple-100/50 rounded-lg p-3 w-fit mx-auto">
                <Info size={16} />
                <span>No data is captured or stored here. All calculations are done locally.</span>
              </div>
            </motion.div>

            {/* Top Row: Business Details (Left) and Services (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left: Business Details */}
              <motion.div variants={itemVariants}>
                <motion.div className="glass-card p-8 rounded-2xl h-full" variants={itemVariants}>
                  <h2 className="text-2xl font-bold mb-8">Your Business Details</h2>

                  {/* Employees Slider */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-lg font-semibold">Number of Employees</label>
                      <span className="text-2xl font-bold text-purple-600">{employees}+</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-foreground/50 mt-2">
                      <span>1</span>
                      <span>100+</span>
                    </div>
                  </div>

                  {/* Automation % Slider */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-lg font-semibold">Current Automation Level</label>
                      <span className="text-2xl font-bold text-purple-600">{automationPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={automationPercent}
                      onChange={(e) => setAutomationPercent(Number(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-foreground/50 mt-2">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Revenue Slider */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-lg font-semibold">Average Annual Revenue</label>
                      <span className="text-2xl font-bold text-purple-600">${(revenue / 1000).toFixed(0)}k</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={revenue}
                      onChange={(e) => setRevenue(Number(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-foreground/50 mt-2">
                      <span>$10k</span>
                      <span>$1m+</span>
                    </div>
                  </div>

                  {/* Manual Hours Slider */}
                  <div className="mb-0">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-lg font-semibold">Manual Hours Per Week (per employee)</label>
                      <span className="text-2xl font-bold text-purple-600">{manualHours}h</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={manualHours}
                      onChange={(e) => setManualHours(Number(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-foreground/50 mt-2">
                      <span>5h</span>
                      <span>40h</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Services Selection */}
              <motion.div variants={itemVariants}>
                <motion.div className="glass-card p-8 rounded-2xl h-full" variants={itemVariants}>
                  <h2 className="text-2xl font-bold mb-6">Select Services</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {SERVICES_ROI.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-4 rounded-lg border-2 font-semibold transition-all text-left ${
                          selectedServices.includes(service.id)
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-600"
                            : "bg-white text-foreground border-purple-300/50 hover:border-purple-500 hover:bg-purple-50"
                        }`}
                      >
                        <div className="font-bold">{service.name}</div>
                        <div className="text-sm opacity-80">+{service.timeSavingPercent}% time savings</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Results Row */}
            <motion.div variants={itemVariants} className="mb-8">
              <motion.div
                className="glass-card p-8 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-2 border-purple-300/50"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold mb-6 text-center">Your Potential Savings</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center pb-6 md:pb-0 md:border-r border-purple-200/50">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {hoursAutomatePerYear.toFixed(0)}
                    </div>
                    <div className="text-foreground/70 text-sm">Hours Automated Per Year</div>
                  </div>
                  <div className="text-center pb-6 md:pb-0 md:border-r border-purple-200/50">
                    <div className="text-4xl font-bold text-pink-600 mb-2">
                      ${(yearlySavings / 1000).toFixed(0)}k
                    </div>
                    <div className="text-foreground/70 text-sm">Annual Cost Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {totalTimeSavingPercent.toFixed(0)}%
                    </div>
                    <div className="text-foreground/70 text-sm">Total Automation Potential</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom Row: Calculation Logic (Left) and CTA (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Calculation Logic */}
              <motion.div variants={itemVariants}>
                <motion.div className="glass-card p-8 rounded-2xl bg-purple-50/50 h-full" variants={itemVariants}>
                  <h3 className="font-bold text-lg mb-4 text-foreground">How We Calculate</h3>
                  <div className="space-y-2 text-sm text-foreground/80">
                    <p><span className="font-semibold">Step 1:</span> Current automation ({automationPercent}%) + service savings (+{avgTimeSavingPercent.toFixed(0)}%)</p>
                    <p><span className="font-semibold">Step 2:</span> Total potential: {totalTimeSavingPercent.toFixed(0)}% of {employees} employees</p>
                    <p><span className="font-semibold">Step 3:</span> {hoursAutomatePerYear.toFixed(0)} hours/year × ${costPerHour.toFixed(2)}/hour</p>
                    <p><span className="font-semibold">Result:</span> ${yearlySavings.toFixed(0)} annual savings</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: CTA */}
              <motion.div variants={itemVariants} className="flex flex-col justify-center">
                <motion.div className="glass-card p-12 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-2 border-purple-300/50 text-center h-full flex flex-col justify-center gap-6" variants={itemVariants}>
                  <p className="text-foreground/70 text-lg font-semibold">
                    Ready to unlock these savings?
                  </p>
                  <Link href="/free-audit">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-xl font-semibold inline-flex items-center gap-2 w-full justify-center text-lg">
                      Get Your Free AI & Automation Audit
                      <ArrowRight size={24} />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-purple-500/50 hover:bg-purple-600/10 px-8 py-6 rounded-xl font-semibold w-full text-lg">
                      Contact Us
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

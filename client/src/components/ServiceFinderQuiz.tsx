import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  answers: {
    text: string;
    services: string[];
  }[];
}

interface ServiceRecommendation {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "challenge",
    question: "What's your biggest business challenge right now?",
    answers: [
      {
        text: "We're unsure where to start with automation",
        services: ["strategic-advisory"],
      },
      {
        text: "We spend too much time on manual, repetitive tasks",
        services: ["business-automation"],
      },
      {
        text: "We need more leads and better customer engagement",
        services: ["marketing-automation"],
      },
      {
        text: "We want to make smarter decisions with our data",
        services: ["ai-integration"],
      },
    ],
  },
  {
    id: "team-size",
    question: "How large is your team?",
    answers: [
      {
        text: "1-10 people (Startup/Small business)",
        services: ["strategic-advisory", "marketing-automation"],
      },
      {
        text: "11-50 people (Growing business)",
        services: ["business-automation", "marketing-automation"],
      },
      {
        text: "50+ people (Established business)",
        services: ["ai-integration", "managed-services"],
      },
    ],
  },
  {
    id: "timeline",
    question: "What's your timeline for implementation?",
    answers: [
      {
        text: "Quick wins (1-3 months)",
        services: ["business-automation", "marketing-automation"],
      },
      {
        text: "Medium-term (3-6 months)",
        services: ["strategic-advisory", "ai-integration"],
      },
      {
        text: "Long-term transformation (6+ months)",
        services: ["strategic-advisory", "managed-services"],
      },
    ],
  },
  {
    id: "budget",
    question: "What's your budget range?",
    answers: [
      {
        text: "Tight budget (looking for ROI quickly)",
        services: ["business-automation"],
      },
      {
        text: "Moderate budget (willing to invest)",
        services: ["marketing-automation", "ai-integration"],
      },
      {
        text: "Flexible budget (want the best solution)",
        services: ["strategic-advisory", "managed-services"],
      },
    ],
  },
];

const SERVICE_RECOMMENDATIONS: Record<string, ServiceRecommendation> = {
  "strategic-advisory": {
    id: "strategic-advisory",
    name: "Strategic Advisory & Consulting",
    description:
      "Perfect for understanding your automation potential. We'll audit your processes and create a roadmap tailored to your goals.",
    icon: "target",
  },
  "marketing-automation": {
    id: "marketing-automation",
    name: "Marketing & Growth Automation",
    description:
      "Ideal for generating more leads and automating customer engagement. Set up systems that work 24/7 to grow your business.",
    icon: "trending-up",
  },
  "business-automation": {
    id: "business-automation",
    name: "Business Process Automation",
    description:
      "Best for eliminating manual work and improving efficiency. Automate repetitive tasks so your team focuses on high-value work.",
    icon: "settings",
  },
  "ai-integration": {
    id: "ai-integration",
    name: "AI Integration & Analytics",
    description:
      "Great for data-driven decisions and advanced capabilities. Integrate AI into your existing systems for smarter operations.",
    icon: "cpu",
  },
  "managed-services": {
    id: "managed-services",
    name: "Managed Services & Support",
    description:
      "Perfect for ongoing optimization and peace of mind. We monitor and continuously improve your automation systems.",
    icon: "shield",
  },
};

export function ServiceFinderQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers, answerIndex];
    setSelectedAnswers(newAnswers);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRecommendations = () => {
    const serviceCounts: Record<string, number> = {};

    selectedAnswers.forEach((answerIndex, questionIndex) => {
      const services =
        QUIZ_QUESTIONS[questionIndex].answers[answerIndex].services;
      services.forEach((service) => {
        serviceCounts[service] = (serviceCounts[service] || 0) + 1;
      });
    });

    return Object.entries(serviceCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([serviceId]) => SERVICE_RECOMMENDATIONS[serviceId]);
  };

  const handleLeadCapture = async () => {
    if (!email || !name) return;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          recommendedServices: getRecommendations().map((s) => s.id),
          source: "service-finder-quiz",
        }),
      });

      if (response.ok) {
        // Show success message
        alert(
          "Thanks! We'll be in touch soon with more details about your recommended services."
        );
        // Reset quiz
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setShowResults(false);
        setShowLeadForm(false);
        setEmail("");
        setName("");
      }
    } catch (error) {
      console.error("Error capturing lead:", error);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setShowLeadForm(false);
    setEmail("");
    setName("");
  };

  const recommendations = getRecommendations();

  return (
    <section className="py-20 bg-gradient-to-b from-purple-600/5 to-purple-900/10 border-y border-purple-300/20">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {!showResults ? (
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Find Your <span className="gradient-text">Perfect Service</span>
              </h2>
              <p className="text-foreground/70 text-lg">
                Not sure which OptimAI service is right for you? Answer a few
                quick questions and we'll recommend the best solution for your
                business.
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground/70">
                  Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-sm font-medium text-accent">
                  {Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <motion.div
              key={currentQuestion}
              className="glass-card p-8 rounded-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">
                {QUIZ_QUESTIONS[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {QUIZ_QUESTIONS[currentQuestion].answers.map(
                  (answer, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className="w-full p-4 text-left rounded-lg border-2 border-purple-300/50 bg-white/5 hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-purple-300/50 group-hover:border-purple-500 group-hover:bg-purple-500/20 transition-all" />
                        <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                          {answer.text}
                        </span>
                      </div>
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1);
                    setSelectedAnswers(selectedAnswers.slice(0, -1));
                  }
                }}
                disabled={currentQuestion === 0}
                className="px-6 py-2 rounded-lg border-2 border-purple-300/50 text-foreground hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Back
              </button>
              <span className="text-sm text-foreground/70 self-center">
                {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {!showLeadForm ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    <CheckCircle
                      size={64}
                      className="text-green-500 mx-auto"
                    />
                  </motion.div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                    We Found Your <span className="gradient-text">Perfect Match</span>
                  </h2>
                  <p className="text-foreground/70 text-lg">
                    Based on your answers, here are the services we recommend
                    for your business:
                  </p>
                </div>

                {/* Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {recommendations.map((service, index) => (
                    <motion.div
                      key={service.id}
                      className="glass-card p-6 rounded-2xl border-2 border-purple-300/50 hover:border-purple-500 transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="mb-4">
                        <AlertCircle
                          size={40}
                          className="text-purple-600"
                        />
                      </div>
                      <h3 className="text-lg font-bold mb-3">
                        {service.name}
                      </h3>
                      <p className="text-foreground/70 text-sm">
                        {service.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button
                    onClick={() => setShowLeadForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-6 rounded-xl text-lg"
                  >
                    Get Started
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button
                    onClick={resetQuiz}
                    className="bg-purple-900/40 hover:bg-purple-900/60 text-white border-2 border-purple-700/50 px-8 py-6 rounded-xl text-lg"
                  >
                    Retake Quiz
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className="max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">
                    Let's Get Started
                  </h2>
                  <p className="text-foreground/70">
                    Tell us a bit about yourself and we'll be in touch with
                    personalized recommendations.
                  </p>
                </div>

                <div className="glass-card p-8 rounded-2xl space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-purple-300/50 focus:border-purple-500 focus:outline-none text-white placeholder-foreground/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-purple-300/50 focus:border-purple-500 focus:outline-none text-white placeholder-foreground/50 transition-all"
                    />
                  </div>

                  <div className="bg-purple-500/10 border-2 border-purple-300/50 rounded-lg p-4 mt-6">
                    <h4 className="font-medium mb-2">Your Recommendations:</h4>
                    <ul className="space-y-1 text-sm text-foreground/80">
                      {recommendations.map((service) => (
                        <li key={service.id} className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {service.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={handleLeadCapture}
                    disabled={!email || !name}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
                  >
                    Send My Recommendations
                    <ArrowRight className="ml-2" size={18} />
                  </Button>

                  <button
                    onClick={() => setShowLeadForm(false)}
                    className="w-full text-foreground/70 hover:text-foreground transition-colors py-2"
                  >
                    Back
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}

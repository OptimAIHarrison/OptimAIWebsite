import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-40 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div className="container mx-auto px-4">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Terms & Conditions</h1>
        </motion.div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl prose prose-invert">
          <div className="glass-card p-12 space-y-8 text-foreground/80">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Terms & Conditions</h2>
              <p>Last updated: April 2026</p>
              <p className="mt-4">
                Please read these terms and conditions carefully before using OptimAI's website and services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Use License</h3>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on OptimAI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Disclaimer</h3>
              <p>
                The materials on OptimAI's website are provided on an 'as is' basis. OptimAI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Limitations</h3>
              <p>
                In no event shall OptimAI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on OptimAI's website.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Contact Us</h3>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at: legal@optimai.com
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

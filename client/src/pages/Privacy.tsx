import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20 bg-gradient-to-b from-purple-100 via-purple-50 to-transparent">
        <motion.div className="container mx-auto px-4">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Privacy Policy</h1>
        </motion.div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl prose prose-invert">
          <div className="glass-card p-12 space-y-8 text-foreground/80">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Privacy Policy</h2>
              <p>Last updated: April 2026</p>
              <p className="mt-4">
                At OptimAI, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Information We Collect</h3>
              <p>
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Personal Data: name, email address, company name, phone number</li>
                <li>Usage Data: pages visited, time spent on pages, links clicked</li>
                <li>Device Data: browser type, IP address, operating system</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">How We Use Your Information</h3>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Generate leads and conduct business</li>
                <li>Email you regarding an order/request</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Contact Us</h3>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at: privacy@optimai.com
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

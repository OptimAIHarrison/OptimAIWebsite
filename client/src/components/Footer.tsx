import { Link } from "wouter";
import { LOGO_URL, NAVIGATION } from "@/const";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-foreground/10 backdrop-blur-md">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <img src={LOGO_URL} alt="Optimai" className="h-12 w-auto mb-4" />
            <p className="text-foreground/70 text-sm">
              Your growth partner in AI & automation for SMEs and startups.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services">
                  <a className="text-foreground/70 hover:text-accent transition-colors text-sm">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="text-foreground/70 hover:text-accent transition-colors text-sm">
                    Pricing
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/roi-calculator">
                  <a className="text-foreground/70 hover:text-accent transition-colors text-sm">
                    ROI Calculator
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-foreground/70 hover:text-accent transition-colors text-sm">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/case-studies">
                  <a className="text-foreground/70 hover:text-accent transition-colors text-sm">
                    Case Studies
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a className="text-foreground/70 hover:text-accent transition-colors text-sm">
                    Resources
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">
                  <a className="text-foreground/70 hover:text-accent transition-colors text-sm">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-foreground/70 hover:text-accent transition-colors text-sm">
                    Terms & Conditions
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-foreground/70 hover:text-accent transition-colors text-sm">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm">
            © {currentYear} Optimai. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-foreground/50 hover:text-accent transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-foreground/50 hover:text-accent transition-colors">
              Twitter
            </a>
            <a href="#" className="text-foreground/50 hover:text-accent transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

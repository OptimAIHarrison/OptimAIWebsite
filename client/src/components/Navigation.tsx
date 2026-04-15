import { useState } from "react";
import { Link } from "wouter";
import { LOGO_URL, NAVIGATION } from "@/const";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-xl border-b border-foreground/15">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={LOGO_URL} alt="OptimAI" className="h-20 w-auto" />
              <span className="text-lg font-light text-foreground hidden sm:inline">OptimAI</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Main Navigation Items - excluding Why OptimAI */}
            {NAVIGATION.filter((item) => item.label !== "Why OptimAI").map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
                  {item.label}
                </a>
              </Link>
            ))}

            {/* Why OptimAI Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors flex items-center gap-1">
                Why OptimAI
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-0 w-48 bg-background border border-foreground/15 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/why-optimai">
                  <a className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-secondary rounded-t-lg transition-colors">
                    Why Choose OptimAI
                  </a>
                </Link>
                <Link href="/about">
                  <a className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-secondary transition-colors">
                    About OptimAI
                  </a>
                </Link>
                <Link href="/case-studies">
                  <a className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-secondary transition-colors">
                    Case Studies
                  </a>
                </Link>
                <Link href="/faq">
                  <a className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-secondary transition-colors">
                    FAQ
                  </a>
                </Link>
                <Link href="/what-we-actually-do">
                  <a className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-secondary rounded-b-lg transition-colors">
                    What We Actually Do
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Buttons + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link href="/roi-calculator">
              <Button className="hidden sm:inline-flex bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-600/10">
                ROI Calculator
              </Button>
            </Link>
            <Link href="/free-audit">
              <Button className="hidden sm:inline-flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                Get Free AI Audit
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-2">
            {/* Main Navigation Items */}
            {NAVIGATION.filter((item) => item.label !== "Why OptimAI").map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            
            {/* Why OptimAI Dropdown for Mobile */}
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between">
                Why OptimAI
                <ChevronDown size={16} />
              </button>
              <div className="pl-4 space-y-1">
                <Link href="/why-optimai">
                  <a className="block px-3 py-2 text-sm font-medium text-foreground/70 hover:text-accent hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                    Why Choose OptimAI
                  </a>
                </Link>
                <Link href="/about">
                  <a className="block px-3 py-2 text-sm font-medium text-foreground/70 hover:text-accent hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                    About OptimAI
                  </a>
                </Link>
                <Link href="/case-studies">
                  <a className="block px-3 py-2 text-sm font-medium text-foreground/70 hover:text-accent hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                    Case Studies
                  </a>
                </Link>
                <Link href="/faq">
                  <a className="block px-3 py-2 text-sm font-medium text-foreground/70 hover:text-accent hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                    FAQ
                  </a>
                </Link>
                <Link href="/what-we-actually-do">
                  <a className="block px-3 py-2 text-sm font-medium text-foreground/70 hover:text-accent hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                    What We Actually Do
                  </a>
                </Link>
              </div>
            </div>
            
            <Link href="/roi-calculator">
              <Button className="w-full mt-2 bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-600/10">
                ROI Calculator
              </Button>
            </Link>
            <Link href="/free-audit">
              <Button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                Get Free AI Audit
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

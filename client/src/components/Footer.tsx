import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { LOGO_URL } from "@/const";

const COLUMNS = [
  {
    title: "What we do",
    links: [
      { label: "Services", href: "/services" },
      { label: "Ready-to-go products", href: "/products" },
      { label: "Pricing", href: "/pricing" },
      { label: "ROI calculator", href: "/roi-calculator" },
    ],
  },
  {
    title: "Learn more",
    links: [
      { label: "Case studies", href: "/case-studies" },
      { label: "Why OptimAI", href: "/why-optimai" },
      { label: "Resources", href: "/resources" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms & conditions", href: "/terms" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#1E1038]/10">
      <div className="page-gutter pt-14 sm:pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_repeat(3,1fr)] gap-10 lg:gap-12 mb-12 sm:mb-14 text-center lg:text-left">
          {/* Brand + CTA */}
          <div>
            <img src={LOGO_URL} alt="OptimAI" className="h-12 w-auto mb-5 mx-auto lg:mx-0" />
            <p className="text-[#1E1038] font-semibold text-lg leading-snug max-w-xs mx-auto lg:mx-0">
              AI and automation for real businesses.
            </p>
            <p className="mt-2 text-sm text-[#1E1038]/60 max-w-xs mx-auto lg:mx-0">
              Practical systems, no jargon, no lock-in contracts. Based in Melbourne, working with businesses across Australia.
            </p>
            <Link href="/free-report">
              <a className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient hover:brightness-110 text-white text-sm font-semibold px-5 py-3 transition-colors">
                Get your free report
                <ArrowRight size={16} />
              </a>
            </Link>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-semibold text-[#1E1038] mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      <a className="text-sm text-[#1E1038]/65 hover:text-[#7C3AED] transition-colors">{l.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-[#1E1038]/10 pt-6 text-sm text-[#1E1038]/50 text-center lg:text-left">
          © {currentYear} OptimAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

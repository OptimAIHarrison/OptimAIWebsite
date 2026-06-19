import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { StickyProductsLabel } from "./components/StickyProductsLabel";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import WhyOptimAI from "./pages/WhyOptimAI";
import WhatWeActuallyDo from "./pages/WhatWeActuallyDo";
import CaseStudies from "./pages/CaseStudies";
import ROICalculator from "./pages/ROICalculator";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import FreeAudit from "./pages/FreeAudit";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ArticleEditor from "./pages/ArticleEditor";
import ArticleDetail from "./pages/ArticleDetail";
import Products from "./pages/Products";

// GA4's gtag.js attaches `gtag` to the global window object via the
// inline script in index.html. TypeScript doesn't know about it by
// default, so this declares it for type-checking purposes only.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function Router() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Manually fire a GA4 pageview on every route change. This is a
  // client-side-routed SPA (wouter), so the browser never does a real
  // navigation — GA4's automatic pageview tracking only fires once on
  // initial script load and would never see subsequent route changes
  // without this. send_page_view is set to false in index.html for
  // exactly this reason, so this is the only place pageviews are sent.
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: location,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);
  
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/about"} component={About} />
      <Route path={"/why-optimai"} component={WhyOptimAI} />
      <Route path={"/what-we-actually-do"} component={WhatWeActuallyDo} />
      <Route path={"/case-studies"} component={CaseStudies} />
      <Route path={"/roi-calculator"} component={ROICalculator} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/articles/:slug"} component={ArticleDetail} />
      <Route path={"/products"} component={Products} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/free-audit"} component={FreeAudit} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/login"} component={Login} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/admin/editor"} component={ArticleEditor} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <ChatbotWidget />
          <StickyProductsLabel />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

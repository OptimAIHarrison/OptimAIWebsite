import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Mail, Lock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Client-side validation against admin config
      if (email === "harrison@optimai.com.au" && password === "optimai") {
        // Store auth token in localStorage
        const token = btoa(`${email}:${Date.now()}`);
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminEmail", email);
        
        toast.success("Login successful!");
        setLocation("/admin/articles");
      } else {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-20 pt-32">
        <div className="w-full max-w-md">
          <div className="bg-white/5 border-2 border-white/50 rounded-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Login</h1>
              <p className="text-foreground/60">Access the OptimAI admin dashboard</p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="harrison@optimai.com.au"
                    className="w-full bg-white/5 border-2 border-white/50 rounded-lg pl-10 pr-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-white/5 border-2 border-white/50 rounded-lg pl-10 pr-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 rounded-lg transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-white/5 border border-white/20 rounded-lg">
              <p className="text-xs text-foreground/60">
                <span className="font-semibold text-foreground">Demo Credentials:</span>
                <br />
                Email: harrison@optimai.com.au
                <br />
                Password: optimai
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <nav className="fixed w-full bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold gradient-text">AVENIX.PRO</span>
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white">
              <Link to="/dashboard">Access Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in gradient-text">
              Your Legal Practice,{" "}
              <span className="text-primary">Simplified</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto animate-fade-in">
              Streamline your legal practice with our comprehensive case management
              system. Track cases, set reminders, and leverage AI-powered legal
              research.
            </p>
            <Button size="lg" asChild className="animate-fade-in glass-card neon-glow">
              <Link to="/dashboard" className="flex items-center gap-2">
                Get Started <Sparkles className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl glass-card hover-scale">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Case Tracking</h3>
                <p className="text-neutral-600">
                  Efficiently manage and track all your legal cases in one place.
                </p>
              </div>
              <div className="p-6 rounded-xl glass-card hover-scale">
                <h3 className="text-xl font-semibold mb-4 gradient-text">AI Legal Search</h3>
                <p className="text-neutral-600">
                  Powerful AI-powered legal research with 3 searches per month.
                </p>
              </div>
              <div className="p-6 rounded-xl glass-card hover-scale">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Document Storage</h3>
                <p className="text-neutral-600">
                  Secure document storage with up to 5GB of space.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;

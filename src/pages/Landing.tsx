
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Check } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <nav className="fixed w-full glass-morphism z-50">
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
            <div className="mb-8 flex justify-center">
              <span className="glass-card px-4 py-2 rounded-full text-sm text-primary animate-fade-in">
                Revolutionizing Legal Practice
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in gradient-text leading-tight">
              Your Legal Practice,{" "}
              <span className="text-primary">Reimagined</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto animate-fade-in">
              Experience the future of legal practice management with AI-powered tools
              and seamless workflow automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Button size="lg" asChild className="glass-card neon-glow w-full sm:w-auto">
                <Link to="/dashboard" className="flex items-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="glass-card w-full sm:w-auto">
                <Link to="/chatbot">Try AI Assistant</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
              Next-Generation Legal Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 gradient-text">AI-Powered Research</h3>
                <p className="text-neutral-600">
                  Leverage advanced AI to streamline your legal research and documentation.
                </p>
                <ul className="mt-4 space-y-2">
                  {["Smart Search", "Precedent Analysis", "Citation Checker"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 gradient-text">Workflow Automation</h3>
                <p className="text-neutral-600">
                  Automate repetitive tasks and focus on what matters most - your clients.
                </p>
                <ul className="mt-4 space-y-2">
                  {["Document Generation", "Task Automation", "Calendar Integration"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 gradient-text">Client Portal</h3>
                <p className="text-neutral-600">
                  Provide a seamless experience for your clients with our modern portal.
                </p>
                <ul className="mt-4 space-y-2">
                  {["Secure Messaging", "File Sharing", "Progress Tracking"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;

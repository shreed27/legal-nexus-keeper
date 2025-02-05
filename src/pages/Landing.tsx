import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-accent/10">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-primary">AVENIX.PRO</span>
            <Button asChild>
              <Link to="/dashboard">Access Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-neutral-dark mb-6 animate-fade-in">
              Your Legal Practice,{" "}
              <span className="text-primary">Simplified</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto animate-fade-in">
              Streamline your legal practice with our comprehensive case management
              system. Track cases, set reminders, and leverage AI-powered legal
              research.
            </p>
            <Button size="lg" asChild className="animate-fade-in">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-neutral-light hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Case Tracking</h3>
                <p className="text-neutral-600">
                  Efficiently manage and track all your legal cases in one place.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-neutral-light hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">AI Legal Search</h3>
                <p className="text-neutral-600">
                  Powerful AI-powered legal research with 3 searches per month.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-neutral-light hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Document Storage</h3>
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
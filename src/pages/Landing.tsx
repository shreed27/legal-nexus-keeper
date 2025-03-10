import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, LineChart, Star, Users, ExternalLink } from "lucide-react";

const Navbar = () => (
  <nav className="fixed w-full bg-white/80 backdrop-blur-sm border-b border-gray-200/80 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/e9bf099f-9fa9-4c93-963c-44cd8f6fd504.png" alt="Logo" className="h-8" />
          <span className="text-xl font-bold gradient-text">AVENIX.PRO</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button className="text-gray-600 hover:text-gray-900">Product</button>
          <button className="text-gray-600 hover:text-gray-900">Resources</button>
          <button className="text-gray-600 hover:text-gray-900">Pricing</button>
          <button className="text-gray-600 hover:text-gray-900">Integrations</button>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white" asChild>
            <Link to="/dashboard">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </nav>
);

const Stats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    {[
      { number: "32", label: "hours saved per month per team" },
      { number: "44%", label: "costs saved automating tasks" },
      { number: "+2.4", label: "NPS improvement" },
      { number: "100k+", label: "unique insights generated" },
    ].map((stat, i) => (
      <div key={i} className="neo-glass p-6 hover:shadow-neon transition-all duration-300 group hover:scale-105">
        <div className="text-4xl font-bold mb-2 gradient-text">{stat.number}</div>
        <p className="text-gray-600">{stat.label}</p>
      </div>
    ))}
  </div>
);

const Testimonials = () => (
  <div className="bg-gradient-to-br from-neutral-50 to-blue-50 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Trusted by Legal Teams Worldwide</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            name: "Sarah Johnson",
            role: "Legal Director @ LexCorp",
            content: "Avenix has transformed how we handle legal documentation. The AI-powered insights are invaluable."
          },
          {
            name: "Michael Chen",
            role: "Senior Partner @ Law Associates",
            content: "The automation capabilities have saved us countless hours. It's like having an extra team member."
          },
          {
            name: "Emma Williams",
            role: "Legal Tech Lead @ Justice Firm",
            content: "The integration was seamless, and the results were immediate. Highly recommend for any legal team."
          }
        ].map((testimonial, i) => (
          <div key={i} className="neo-glass p-6 hover:shadow-neon-accent transition-all duration-300">
            <p className="text-gray-600 mb-4">{testimonial.content}</p>
            <div>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Features = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Key Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          icon: LineChart,
          title: "AI-Powered Analytics",
          description: "Get deep insights into your legal cases with advanced analytics"
        },
        {
          icon: Users,
          title: "Team Collaboration",
          description: "Work seamlessly with your team on cases and documents"
        },
        {
          icon: Star,
          title: "Smart Automation",
          description: "Automate repetitive tasks and focus on what matters"
        }
      ].map((feature, i) => (
        <div key={i} className="p-6 neo-glass hover:shadow-neon transition-all duration-300 group">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <div className="pt-32 pb-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary rounded-full px-4 py-1 inline-flex items-center text-sm mb-8 animate-pulse">
              New: AI-Powered Legal Analytics
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-fade-in">
              Transform Your Legal Practice
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Streamline your legal workflow with AI-powered tools and insights. Save time, reduce errors, and focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white w-full sm:w-auto" asChild>
                <Link to="/dashboard">
                  <span>Start for free</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group w-full sm:w-auto" asChild>
                <Link to="/demo">
                  <span>Book a demo</span>
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:animate-pulse" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Features />
        <Stats />
        <Testimonials />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-white to-blue-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Integrations</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">API</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-600 text-center">© 2024 AVENIX.PRO. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="text-primary hover:text-primary-dark">Twitter</a>
                <a href="#" className="text-primary hover:text-primary-dark">LinkedIn</a>
                <a href="#" className="text-primary hover:text-primary-dark">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

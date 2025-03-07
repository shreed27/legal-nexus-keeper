
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const isMobile = useIsMobile();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // Simulate a page transition effect
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <Sidebar />
      <Header />
      <main 
        className={`transition-all duration-300 ${
          isMobile ? 'ml-0' : 'ml-64'
        } pt-20 px-4 md:px-8`}
      >
        <div className={`max-w-7xl mx-auto transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;


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
        <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

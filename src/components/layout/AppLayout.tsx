
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const isMobile = useIsMobile();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Create page transition effect on route change
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    
    // Add artificial loading time for smoother transitions
    setIsLoading(true);
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  // Initialize app with example data if not already present
  useEffect(() => {
    const initializeAppData = async () => {
      // Import the utility functions
      const { generateExampleCases, generateExampleDocuments } = await import("@/lib/utils");
      
      // Check if cases exist, if not create example data
      const existingCases = localStorage.getItem('cases');
      if (!existingCases || JSON.parse(existingCases).length === 0) {
        const exampleCases = generateExampleCases(15);
        localStorage.setItem('cases', JSON.stringify(exampleCases));
      }
      
      // Check if documents exist, if not create example data
      const existingFiles = localStorage.getItem('storedFiles');
      if (!existingFiles || JSON.parse(existingFiles).length === 0) {
        const exampleDocs = generateExampleDocuments(20);
        localStorage.setItem('storedFiles', JSON.stringify(exampleDocs));
      }
    };
    
    initializeAppData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="mt-4 text-lg font-medium text-primary animate-pulse">Loading...</div>
          </div>
        </div>
      ) : (
        <>
          <Sidebar />
          <Header />
          <main 
            className={`transition-all duration-500 ${
              isMobile ? 'ml-0' : 'ml-64'
            } pt-20 px-4 md:px-8`}
          >
            <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
              <Outlet />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default AppLayout;

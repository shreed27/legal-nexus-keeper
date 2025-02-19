
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <Sidebar />
      <Header />
      <main 
        className={`transition-all duration-300 ${
          isMobile ? 'ml-0' : 'ml-64'
        } pt-20 px-4 md:px-8`}
      >
        <div className="max-w-7xl mx-auto fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

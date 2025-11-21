
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Layout, 
  FileText, 
  Search, 
  FolderOpen, 
  Shield, 
  Bot, 
  FileEdit,
  ChevronLeft, 
  ChevronRight,
  X,
  LayoutGrid
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
      setCollapsed(true);
    } else {
      setIsOpen(true);
      setCollapsed(false);
    }
  }, [isMobile]);

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Cases', path: '/cases' },
    { icon: Search, label: 'Legal Search', path: '/search' },
    { icon: FolderOpen, label: 'Documents', path: '/documents' },
    { icon: FileEdit, label: 'Document Drafting', path: '/document-drafting' },
    { icon: Shield, label: 'Compliance Checker', path: '/compliance' },
    { icon: Bot, label: 'Legal Assistant', path: '/chatbot' },
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 neo-glass rounded-full hover:shadow-neon transition-all duration-300"
        aria-label="Open sidebar"
      >
        <ChevronRight size={20} className="text-primary" />
      </button>
    );
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full neo-glass border-r border-white/30 text-neutral-600 transition-all duration-300 
          ${collapsed ? 'w-20' : 'w-64'} z-50 ${isMobile ? 'transform' : ''}`}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/30">
          {!collapsed && (
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold gradient-text">LawGPT</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={toggleSidebar}
              className="rounded-full p-2 hover:bg-white/30 transition-colors"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 hover:bg-white/30 transition-colors"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <nav className="mt-6 flex flex-col h-[calc(100%-5rem)] overflow-y-auto">
          <div className="flex-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center ${collapsed ? 'justify-center' : 'px-6'} py-4 transition-all hover:bg-white/20 
                    ${isActive ? 'bg-gradient-to-r from-primary/20 to-accent/20 border-r-4 border-primary' : ''}`}
                >
                  <div className={`${isActive ? 'animate-pulse' : ''} relative`}>
                    <item.icon 
                      size={24} 
                      className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'text-neutral-600'}`} 
                    />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                    )}
                  </div>
                  {!collapsed && (
                    <span className={`ml-4 font-medium ${isActive ? 'text-primary' : ''} whitespace-nowrap`}>
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          
          {/* Bottom section with version and status */}
          <div className={`mt-auto mb-6 ${collapsed ? 'px-2 text-center' : 'px-6'}`}>
            <div className="text-xs text-neutral-400 mt-2">
              {!collapsed && <span>Version 2.4.0</span>}
              <div className="flex items-center gap-2 mt-2 justify-center">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {!collapsed && <span>Online</span>}
              </div>
            </div>
          </div>
        </nav>
      </aside>
      
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  );
};

export default Sidebar;

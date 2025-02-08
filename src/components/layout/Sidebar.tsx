
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  Search, 
  Layout, 
  ChevronLeft, 
  ChevronRight, 
  FolderOpen,
  Shield,
  Bot,
  FileEdit,
  X
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
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  const menuItems = [
    { icon: Layout, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Cases', path: '/cases' },
    { icon: Search, label: 'Legal Search', path: '/search' },
    { icon: FolderOpen, label: 'Documents', path: '/documents' },
    { icon: FileEdit, label: 'Document Drafting', path: '/document-drafting' },
    { icon: Shield, label: 'Compliance Checker', path: '/compliance' },
    { icon: Bot, label: 'Legal Assistant', path: '/chatbot' },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 glass-card rounded-lg hover:bg-white/80 transition-all duration-300"
      >
        <ChevronRight size={20} />
      </button>
    );
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white/90 backdrop-blur-xl border-r border-neutral-200/50 text-neutral-600 transition-all duration-300 
        ${collapsed ? 'w-20' : 'w-64'} z-50`}
    >
      <div className="flex h-20 items-center justify-between px-6 border-b border-neutral-200/50">
        {!collapsed && (
          <span 
            onClick={() => navigate('/')} 
            className="text-xl font-bold cursor-pointer gradient-text hover:opacity-80 transition-opacity"
          >
            AVENIX.PRO
          </span>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full p-2 hover:bg-neutral-100 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 hover:bg-neutral-100 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsOpen(false)}
            className={`flex items-center px-6 py-4 transition-colors hover:bg-neutral-100 ${
              location.pathname === item.path ? 'bg-primary/10 border-r-4 border-primary' : ''
            }`}
          >
            <item.icon size={24} className={location.pathname === item.path ? 'text-primary' : ''} />
            {!collapsed && <span className="ml-4">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;


import { useState } from 'react';
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
  FileEdit
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Layout, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Cases', path: '/cases' },
    { icon: Search, label: 'Legal Search', path: '/search' },
    { icon: FolderOpen, label: 'Documents', path: '/documents' },
    { icon: FileEdit, label: 'Document Drafting', path: '/document-drafting' },
    { icon: Shield, label: 'Compliance Checker', path: '/compliance' },
    { icon: Bot, label: 'Legal Assistant', path: '/chatbot' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-neutral-dark text-white transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex h-20 items-center justify-between px-6">
        {!collapsed && (
          <span 
            onClick={() => navigate('/')} 
            className="text-xl font-bold cursor-pointer hover:text-primary transition-colors"
          >
            AVENIX.PRO
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full p-2 hover:bg-neutral-800 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-4 transition-colors hover:bg-neutral-800 ${
              location.pathname === item.path ? 'bg-primary/20 border-r-4 border-primary' : ''
            }`}
          >
            <item.icon size={24} />
            {!collapsed && <span className="ml-4">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

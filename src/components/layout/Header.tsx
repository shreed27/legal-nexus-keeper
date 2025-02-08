
import { Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 h-20 flex items-center justify-end px-8 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 z-10 animate-fade-in ml-0 md:ml-64 w-full md:w-[calc(100%-16rem)]">
      <div className="flex items-center space-x-6">
        <button className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors">
          <Bell size={20} className="text-neutral-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <button className="flex items-center space-x-3 p-2 rounded-full hover:bg-neutral-100 transition-colors">
          <User size={20} className="text-neutral-600" />
          <span className="font-medium text-neutral-600">John Doe</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

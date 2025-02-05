import { Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 h-20 flex items-center justify-end px-8 bg-white/80 backdrop-blur-md border-b border-neutral-200 z-10 animate-fade-in">
      <div className="flex items-center space-x-6">
        <button className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <button className="flex items-center space-x-3 p-2 rounded-full hover:bg-neutral-100 transition-colors">
          <User size={20} />
          <span className="font-medium">John Doe</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
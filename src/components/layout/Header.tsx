
import { Bell, User } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const Header = () => {
  const [notifications] = useState<Notification[]>([]);
  const [unreadCount] = useState(0);

  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Attorney',
    joinedDate: 'January 2024'
  };

  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <header className="fixed top-0 right-0 h-20 flex items-center justify-end px-8 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 z-40 animate-fade-in ml-0 md:ml-64 w-full md:w-[calc(100%-16rem)]">
      <div className="flex items-center space-x-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full bg-white/80 hover:bg-neutral-100 transition-colors shadow-sm">
              <Bell size={20} className="text-neutral-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white/95 backdrop-blur-md border border-white/60">
            <DropdownMenuLabel className="text-primary">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 && (
              <div className="text-center p-6 text-neutral-600">
                <Bell className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
                <p className="font-medium">No new notifications</p>
                <p className="text-sm text-neutral-500">You're all caught up!</p>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 p-2 rounded-full bg-white/80 hover:bg-neutral-100 transition-colors shadow-sm">
              <User size={20} className="text-neutral-600" />
              <span className="font-medium text-neutral-700">{userData.name}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-white/95 backdrop-blur-md border border-white/60">
            <DropdownMenuLabel className="text-primary">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-4 py-3">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{userData.name}</p>
                    <p className="text-sm text-neutral-600">{userData.email}</p>
                  </div>
                </div>
                <div className="space-y-1 pt-2 border-t border-neutral-100">
                  <p className="text-xs text-neutral-500">Role</p>
                  <p className="text-sm text-neutral-700 font-medium">{userData.role}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-neutral-500">Member since</p>
                  <p className="text-sm text-neutral-700 font-medium">{userData.joinedDate}</p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500 font-medium">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

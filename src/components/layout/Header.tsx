
import { Bell, User, LogOut } from 'lucide-react';
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
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: 'New Case Assigned',
      message: 'You have been assigned a new case #123',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Upcoming Hearing',
      message: 'Reminder: Hearing scheduled for tomorrow',
      time: '5 hours ago'
    },
    {
      id: 3,
      title: 'Document Update',
      message: 'New document uploaded to case #456',
      time: '1 day ago'
    }
  ]);

  // Mock user data - in a real app, this would come from your auth context or API
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Attorney',
    joinedDate: 'January 2024'
  };

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
  };

  return (
    <header className="fixed top-0 right-0 h-20 flex items-center justify-end px-8 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 z-10 animate-fade-in ml-0 md:ml-64 w-full md:w-[calc(100%-16rem)]">
      <div className="flex items-center space-x-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors">
              <Bell size={20} className="text-neutral-600" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="cursor-pointer p-4">
                <div>
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-neutral-600">{notification.message}</div>
                  <div className="text-xs text-neutral-500 mt-1">{notification.time}</div>
                </div>
              </DropdownMenuItem>
            ))}
            {notifications.length === 0 && (
              <DropdownMenuItem className="text-center p-4 text-neutral-600">
                No new notifications
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 p-2 rounded-full hover:bg-neutral-100 transition-colors">
              <User size={20} className="text-neutral-600" />
              <span className="font-medium text-neutral-600">{userData.name}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-4 py-3">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-neutral-900">{userData.name}</p>
                  <p className="text-sm text-neutral-600">{userData.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-neutral-500">Role</p>
                  <p className="text-sm text-neutral-700">{userData.role}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-neutral-500">Member since</p>
                  <p className="text-sm text-neutral-700">{userData.joinedDate}</p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

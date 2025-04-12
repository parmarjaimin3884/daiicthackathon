import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  Users, 
  Calendar, 
  Settings,
  Bell,
  LogOut,
  Plus
} from 'lucide-react';
import { authService } from '../services/authService';
import { useUser } from '../context/UserContext';

interface LayoutProps {
  userRole: 'student' | 'mentor';
}

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  path: string;
  description?: string;
  roleSpecific?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ userRole }) => {
  const location = useLocation();
  const { user } = useUser();
  const firstName = user?.firstName || 'Student';

  const getNavigationItems = (role: 'student' | 'mentor'): NavigationItem[] => {
    const baseNavigation: NavigationItem[] = [
      { 
        icon: LayoutDashboard, 
        label: `Hello, ${firstName}`, 
        path: '/dashboard',
        description: role === 'mentor' ? '+ Upcoming Webinar Management' : undefined
      },
      { 
        icon: FileText, 
        label: 'Resume Builder', 
        path: '/dashboard/resume' 
      },
      { 
        icon: Video, 
        label: 'Interview Prep', 
        path: '/dashboard/interview' 
      },
      { 
        icon: Users, 
        label: 'Mentors', 
        path: '/dashboard/mentors',
        description: role === 'mentor' ? '+ Post/Edit mentor profile' : 'View mentors'
      },
      { 
        icon: Calendar, 
        label: 'Webinars', 
        path: '/dashboard/webinars',
        description: role === 'mentor' ? '+ Create/Edit webinar events' : 'Register'
      },
      { 
        icon: Settings, 
        label: 'Settings', 
        path: '/dashboard/settings' 
      },
    ];

    return baseNavigation;
  };

  const navigation = getNavigationItems(userRole);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-600">Grow More</h1>
          <p className="mt-2 text-sm text-gray-600">
            {userRole === 'mentor' ? 'Mentor Portal' : `${firstName}'s Portal`}
          </p>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
                location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
            >
              <div className="flex items-center">
                <item.icon className="h-5 w-5" />
                <span className="ml-3">{item.label}</span>
              </div>
              {item.description && (
                <span className="ml-8 text-xs text-gray-500 mt-1">{item.description}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {location.pathname === '/dashboard' ? `Hello, ${firstName}` : navigation.find(item => location.pathname === item.path)?.label}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Bell className="h-5 w-5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
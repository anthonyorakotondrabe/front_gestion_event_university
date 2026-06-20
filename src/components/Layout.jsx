import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useUser } from '../features/auth/hooks/useAuth';

const Layout = ({ children }) => {
  const { data: user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-[#050510] flex transition-colors duration-300 overflow-hidden text-[#e2e8f0]">
      {/* Sidebar - Handles its own mobile state */}
      {user && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

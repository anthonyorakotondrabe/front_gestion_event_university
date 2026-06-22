import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './api/queryClient';
import Layout from './components/Layout';
import AuthLayout from './features/auth/components/AuthLayout';
import { Toaster } from 'react-hot-toast';
import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';
import Dashboard from './features/dashboard/components/Dashboard';
import UserManagement from './features/users/components/UserManagement';
import EventManagement from './features/events/components/EventManagement';
import EventCatalog from './features/events/components/EventCatalog';
import RegistrationManagement from './features/inscriptions/components/RegistrationManagement';
import MyInscriptions from './features/inscriptions/components/MyInscriptions';
import ModerationDashboard from './features/moderation/components/ModerationDashboard';
import FiliereManagement from './features/catalog/components/filieres/FiliereManagement';
import CategoryManagement from './features/catalog/components/categories/CategoryManagement';
import LieuManagement from './features/catalog/components/lieux/LieuManagement';
import { SearchProvider } from './context/SearchContext';
import { ModalProvider } from './context/ModalContext';
import './App.css';

// Placeholder components for empty menus
const PlaceholderPage = ({ title }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
    <p className="text-gray-600 italic">Cette fonctionnalité est en cours de développement...</p>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <SearchProvider>
          <Router>
            <Routes>
            {/* Main App Routes with Layout & Sidebar (conditional) */}
            <Route path="/" element={<Layout><Dashboard /></Layout>} />

            {/* Admin Routes */}
            <Route path="/admin/users" element={<Layout><UserManagement /></Layout>} />
            <Route path="/admin/filieres" element={<Layout><FiliereManagement /></Layout>} />
            <Route path="/admin/categories" element={<Layout><CategoryManagement /></Layout>} />
            <Route path="/admin/lieux" element={<Layout><LieuManagement /></Layout>} />
            <Route path="/admin/moderation" element={<Layout><ModerationDashboard /></Layout>} />

            {/* Organisateur Routes */}
            <Route path="/events/manage" element={<Layout><EventManagement /></Layout>} />
            <Route path="/events/registrations" element={<Layout><RegistrationManagement /></Layout>} />

            {/* Etudiant Routes */}
            <Route path="/my-inscriptions" element={<Layout><MyInscriptions /></Layout>} />

            {/* Common Private Routes */}
            <Route path="/profile" element={<Layout><PlaceholderPage title="Mon Profil Utilisateur" /></Layout>} />

            {/* Public Routes */}
            <Route path="/events" element={<Layout><EventCatalog /></Layout>} />

            {/* Auth Routes with Tech/Innovation Layout */}
            <Route path="/login" element={<AuthLayout><LoginForm /></AuthLayout>} />
            <Route path="/register" element={<AuthLayout><RegisterForm /></AuthLayout>} />
          </Routes>
        </Router>
      </SearchProvider>
      </ModalProvider>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;

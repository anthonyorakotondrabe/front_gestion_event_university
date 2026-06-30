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
import UserProfile from './features/profile/components/UserProfile';
import About from './features/about/components/About';
import FiliereManagement from './features/catalog/components/filieres/FiliereManagement';
import CategoryManagement from './features/catalog/components/categories/CategoryManagement';
import LieuManagement from './features/catalog/components/lieux/LieuManagement';
import { SearchProvider } from './context/SearchContext';
import { ModalProvider } from './context/ModalContext';
import './App.css';

/**
 * Composant de remplacement pour les routes en cours de développement.
 */
const PlaceholderPage = ({ title }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
    <p className="text-gray-600 italic">Cette fonctionnalité est actuellement en cours de développement...</p>
  </div>
);

/**
 * Point d'entrée principal de l'application définissant le routage et les fournisseurs globaux.
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <SearchProvider>
          <Router>
            <Routes>
              {/* Routes principales de l'application */}
              <Route path="/" element={<Layout><Dashboard /></Layout>} />

              {/* Routes administratives */}
              <Route path="/admin/users" element={<Layout><UserManagement /></Layout>} />
              <Route path="/admin/filieres" element={<Layout><FiliereManagement /></Layout>} />
              <Route path="/admin/categories" element={<Layout><CategoryManagement /></Layout>} />
              <Route path="/admin/lieux" element={<Layout><LieuManagement /></Layout>} />
              <Route path="/admin/moderation" element={<Layout><ModerationDashboard /></Layout>} />

              {/* Routes spécifiques à l'organisateur */}
              <Route path="/events/manage" element={<Layout><EventManagement /></Layout>} />
              <Route path="/events/registrations" element={<Layout><RegistrationManagement /></Layout>} />

              {/* Routes spécifiques à l'étudiant */}
              <Route path="/my-inscriptions" element={<Layout><MyInscriptions /></Layout>} />

              {/* Routes privées partagées */}
              <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />

              {/* Routes accessibles publiquement */}
              <Route path="/events" element={<Layout><EventCatalog /></Layout>} />

              {/* Authentification et Inscription */}
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

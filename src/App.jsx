import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './api/queryClient';
import Layout from './components/Layout';
import AuthLayout from './features/auth/components/AuthLayout';
import { Toaster } from 'react-hot-toast';
import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';
import './App.css';

// Feature components (Placeholders for now)
const Home = () => <div>Bienvenue sur l'application de gestion d'événements.</div>;
const EventList = () => <div>Liste des événements (Feature Events)</div>;
const Profile = () => <div>Profil utilisateur (Feature Auth)</div>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Main App Routes with Navbar/Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/events" element={<Layout><EventList /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />

          {/* Auth Routes with Tech/Innovation Layout */}
          <Route path="/login" element={<AuthLayout><LoginForm /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><RegisterForm /></AuthLayout>} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;

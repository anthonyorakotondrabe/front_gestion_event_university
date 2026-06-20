import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './api/queryClient';
import Layout from './components/Layout';
import './App.css';

// Feature components (Placeholders for now)
const Home = () => <div>Bienvenue sur l'application de gestion d'événements.</div>;
const EventList = () => <div>Liste des événements (Feature Events)</div>;
const Profile = () => <div>Profil utilisateur (Feature Auth)</div>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

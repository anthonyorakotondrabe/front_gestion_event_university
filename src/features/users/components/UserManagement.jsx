import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

const UserManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Gestion des Utilisateurs</h1>
          <p className="mt-2 text-[#94a3b8] font-medium">Contrôlez les accès et les rôles des membres de la plateforme.</p>
        </div>
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
          {/* Barre de recherche */}
          <div className="relative group flex-1 sm:w-80">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#4f46e5] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Rechercher un membre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[#111128] border border-[#1e1e3a] rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition-all placeholder:text-[#64748b]"
            />
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-[#4f46e5] text-white rounded-2xl font-black text-sm hover:bg-[#4338ca] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#4f46e5]/20 shrink-0"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Nouvel Utilisateur
          </button>
        </div>
      </div>

      <div className="bg-[#0a0a1a] rounded-3xl shadow-sm border border-[#1e1e3a] overflow-hidden transition-colors duration-300">
        <UserList onEdit={handleEdit} searchQuery={searchQuery} />
      </div>

      {isFormOpen && (
        <UserForm
          key={editingUser?.id_utilisateur || 'new'}
          user={editingUser}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default UserManagement;

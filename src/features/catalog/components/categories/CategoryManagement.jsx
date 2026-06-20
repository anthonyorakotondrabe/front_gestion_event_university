import { useState } from 'react';
import { useCategories } from '../../hooks/useCatalog';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import { useSearch } from '../../../../context/SearchContext';

/**
 * Page de gestion des catégories pour l'administration.
 */
const CategoryManagement = () => {
  const { data: categories, isLoading, error } = useCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { searchQuery } = useSearch();

  const filteredCategories = categories?.filter(c => {
    if (!c) return false;
    const name = typeof c === 'string' ? c : (c.libelle || c.nom_categorie || c.nom || '');
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  if (error) return (
    <div className="p-8 bg-red-50 dark:bg-red-500/10 rounded-3xl border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 font-bold">
      Erreur lors du chargement des catégories.
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Gestion des <span className="text-indigo-600">Catégories</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Configurez et gérez les différentes catégories d'événements.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-500/25"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle Catégorie
        </button>
      </div>

      {/* Stats Bar */}
      <div className="flex justify-end bg-white dark:bg-[#1f2028] p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="px-6 py-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
          <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
            {filteredCategories?.length || 0} CATÉGORIES TROUVÉES
          </span>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <CategoryList
          categories={filteredCategories}
          onEdit={handleEdit}
        />
      )}

      {/* Modal Form */}
      {isFormOpen && (
        <CategoryForm
          category={editingCategory}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default CategoryManagement;

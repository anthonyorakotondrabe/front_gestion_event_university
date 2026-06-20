import { useState, useEffect } from 'react';
import { useCreateCategory, useUpdateCategory } from '../../hooks/useCatalog';

/**
 * Formulaire modal pour la création et l'édition de catégories.
 */
const CategoryForm = ({ category, onClose }) => {
  const [formData, setFormData] = useState({ libelle: '' });
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const isEditing = !!category;

  useEffect(() => {
    if (category) {
      const name = typeof category === 'string' ? category : (category.libelle || category.nom_categorie || category.nom || '');
      setFormData({ libelle: name });
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const id = typeof category === 'string' ? category : (category.id_categorie || category.id);
      updateCategory.mutate(
        { id, data: formData },
        { onSuccess: onClose }
      );
    } else {
      createCategory.mutate(formData, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1f2028] rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-gray-100 dark:border-white/5">
        <form onSubmit={handleSubmit} className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl text-indigo-600 dark:text-indigo-400 mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {isEditing ? 'Modifier la' : 'Nouvelle'} <span className="text-indigo-600">Catégorie</span>
            </h2>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                Libellé de la catégorie
              </label>
              <input
                type="text"
                required
                value={formData.libelle}
                onChange={(e) => setFormData({ ...formData, libelle: e.target.value })}
                placeholder="Ex: Conférence, Atelier, Sport..."
                className="w-full bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/50 rounded-2xl py-4 px-6 text-gray-900 dark:text-white font-bold placeholder-gray-400 transition-all outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            <button
              type="button"
              onClick={onClose}
              className="py-4 px-6 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-2xl font-black hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={createCategory.isPending || updateCategory.isPending}
              className="py-4 px-6 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditing ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;

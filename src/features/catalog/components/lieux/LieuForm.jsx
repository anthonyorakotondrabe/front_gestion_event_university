import { useState, useEffect } from 'react';
import { useCreateLieu, useUpdateLieu } from '../../hooks/useCatalog';

/**
 * Formulaire modal pour la création et l'édition de lieux.
 */
const LieuForm = ({ lieu, onClose }) => {
  const [formData, setFormData] = useState({
    nom_lieu: '',
    adresse: '',
    ville: '',
    code_postal: ''
  });
  const createLieu = useCreateLieu();
  const updateLieu = useUpdateLieu();

  const isEditing = !!lieu;

  useEffect(() => {
    if (lieu) {
      setFormData({
        nom_lieu: lieu.nom_lieu || '',
        adresse: lieu.adresse || '',
        ville: lieu.ville || '',
        code_postal: lieu.code_postal || ''
      });
    }
  }, [lieu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateLieu.mutate(
        { id: lieu.id_lieu, data: formData },
        { onSuccess: onClose }
      );
    } else {
      createLieu.mutate(formData, { onSuccess: onClose });
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
      <div className="relative w-full max-w-xl bg-white dark:bg-[#1f2028] rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-gray-100 dark:border-white/5">
        <form onSubmit={handleSubmit} className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl text-indigo-600 dark:text-indigo-400 mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {isEditing ? 'Modifier le' : 'Nouveau'} <span className="text-indigo-600">Lieu</span>
            </h2>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                Nom du lieu
              </label>
              <input
                type="text"
                required
                value={formData.nom_lieu}
                onChange={(e) => setFormData({ ...formData, nom_lieu: e.target.value })}
                placeholder="Ex: Amphithéâtre A, Salle de sport..."
                className="w-full bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/50 rounded-2xl py-4 px-6 text-gray-900 dark:text-white font-bold placeholder:text-gray-400 transition-all outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                Adresse
              </label>
              <input
                type="text"
                required
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                placeholder="123 rue de l'Université"
                className="w-full bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/50 rounded-2xl py-4 px-6 text-gray-900 dark:text-white font-bold placeholder:text-gray-400 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                Ville
              </label>
              <input
                type="text"
                required
                value={formData.ville}
                onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                placeholder="Abidjan"
                className="w-full bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/50 rounded-2xl py-4 px-6 text-gray-900 dark:text-white font-bold placeholder:text-gray-400 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
                Code Postal
              </label>
              <input
                type="text"
                required
                value={formData.code_postal}
                onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })}
                placeholder="00225"
                className="w-full bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/50 rounded-2xl py-4 px-6 text-gray-900 dark:text-white font-bold placeholder:text-gray-400 transition-all outline-none"
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
              disabled={createLieu.isPending || updateLieu.isPending}
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

export default LieuForm;

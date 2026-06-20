import { useForm } from 'react-hook-form';
import { useCreateFiliere, useUpdateFiliere } from '../../hooks/useCatalog';

/**
 * Formulaire modal pour la création et l'édition de filières.
 */
const FiliereForm = ({ filiere, onClose }) => {
  const isEdit = !!filiere;
  const createFiliere = useCreateFiliere();
  const updateFiliere = useUpdateFiliere();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nom_filiere: filiere?.nom_filiere || ''
    }
  });

  const onSubmit = (data) => {
    if (isEdit) {
      updateFiliere.mutate({ id: filiere.id_filiere, data }, {
        onSuccess: () => onClose()
      });
    } else {
      createFiliere.mutate(data, {
        onSuccess: () => onClose()
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#1f2028] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all border border-gray-100 dark:border-white/10 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/2">
          <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            {isEdit ? 'Modifier la filière' : 'Nouvelle filière'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-white/5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          {/* Nom Filière */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Nom de la filière</label>
            <input
              type="text"
              {...register('nom_filiere', { required: 'Le nom est requis' })}
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              placeholder="Ex: Génie Logiciel"
            />
            {errors.nom_filiere && <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1">{errors.nom_filiere.message}</p>}
          </div>

          {/* Actions */}
          <div className="pt-6 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white rounded-2xl text-sm font-black hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={createFiliere.isPending || updateFiliere.isPending}
              className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-70"
            >
              {(createFiliere.isPending || updateFiliere.isPending) ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                isEdit ? 'Enregistrer' : 'Créer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FiliereForm;

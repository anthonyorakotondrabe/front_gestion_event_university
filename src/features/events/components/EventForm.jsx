import { useForm } from 'react-hook-form';
import { useCreateEvent, useUpdateEvent } from '../hooks/useEvents';
import { useCategories, useLieux } from '../../catalog/hooks/useCatalog';
import toast from 'react-hot-toast';

const EventForm = ({ event, onClose }) => {
  const isEdit = !!event;
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const { data: categories } = useCategories();
  const { data: lieux } = useLieux();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      titre: event?.titre || '',
      description: event?.description || '',
      date_evenement: event?.date_evenement ? new Date(event.date_evenement).toISOString().slice(0, 16) : '',
      prix: event?.prix || 0,
      capacite_max: event?.capacite_max || 10,
      id_categorie: event?.id_categorie || '',
      id_lieu: event?.id_lieu || '',
      statut_evenement: event?.statut_evenement || 'Brouillon'
    }
  });

  const onSubmit = (data) => {
    // Convert prix and capacite_max to numbers
    const payload = {
      ...data,
      prix: parseFloat(data.prix),
      capacite_max: parseInt(data.capacite_max),
      date_evenement: new Date(data.date_evenement).toISOString()
    };

    if (isEdit) {
      updateEvent.mutate({ id: event.id_evenement, data: payload }, {
        onSuccess: () => {
          toast.success('Événement mis à jour avec succès');
          onClose();
        },
        onError: () => toast.error('Erreur lors de la mise à jour')
      });
    } else {
      createEvent.mutate(payload, {
        onSuccess: () => {
          toast.success('Événement créé avec succès');
          onClose();
        },
        onError: () => toast.error('Erreur lors de la création')
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#1f2028] rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all border border-gray-100 dark:border-white/10 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/2">
          <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            {isEdit ? 'Modifier l\'événement' : 'Nouvel événement'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-white/5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Titre */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Titre de l'événement</label>
              <input
                type="text"
                {...register('titre', { required: 'Le titre est requis' })}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Ex: Conférence Tech 2024"
              />
              {errors.titre && <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1">{errors.titre.message}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Description</label>
              <textarea
                {...register('description')}
                rows="3"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Décrivez votre événement..."
              ></textarea>
            </div>

            {/* Date */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Date et Heure</label>
              <input
                type="datetime-local"
                {...register('date_evenement', { required: 'La date est requise' })}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              {errors.date_evenement && <p className="text-red-500 text-[10px] font-bold mt-1.5 ml-1">{errors.date_evenement.message}</p>}
            </div>

            {/* Prix */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Prix (Ariary)</label>
              <input
                type="number"
                step="500"
                {...register('prix', { required: 'Le prix est requis', min: 0 })}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Capacité */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Capacité Max</label>
              <input
                type="number"
                {...register('capacite_max', { required: 'La capacité est requise', min: 1 })}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Catégorie</label>
              <select
                {...register('id_categorie', { required: 'La catégorie est requise' })}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories?.map(cat => (
                  <option key={cat.id_categorie} value={cat.id_categorie}>{cat.libelle}</option>
                ))}
              </select>
            </div>

            {/* Lieu */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Lieu</label>
              <select
                {...register('id_lieu', { required: 'Le lieu est requis' })}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option value="">Sélectionner un lieu</option>
                {lieux?.map(l => (
                  <option key={l.id_lieu} value={l.id_lieu}>{l.nom_lieu} ({l.ville})</option>
                ))}
              </select>
            </div>
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
              disabled={createEvent.isPending || updateEvent.isPending}
              className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-70"
            >
              {(createEvent.isPending || updateEvent.isPending) ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                isEdit ? 'Enregistrer' : 'Créer l\'événement'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;

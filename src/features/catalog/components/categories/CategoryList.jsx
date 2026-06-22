import { useDeleteCategory } from '../../hooks/useCatalog';
import { useConfirm } from '../../../../context/ModalContext';

/**
 * Composant pour afficher la liste des catégories avec le même design que la gestion utilisateur.
 */
const CategoryList = ({ categories, onEdit }) => {
  const deleteCategory = useDeleteCategory();
  const confirm = useConfirm();

  const handleDelete = async (id) => {
    if (await confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action pourrait affecter les événements associés.', {
      title: 'Suppression de catégorie',
      confirmLabel: 'Supprimer',
      type: 'danger'
    })) {
      deleteCategory.mutate(id);
    }
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-[#111128] border border-[#1e1e3a] rounded-[32px] p-12 text-center">
        <div className="w-20 h-20 bg-[#4f46e512] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#4f46e5] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-white mb-2">Aucune catégorie</h3>
        <p className="text-[#64748b] font-medium">Commencez par ajouter votre première catégorie d'événement.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* --- DESKTOP TABLE VIEW --- */}
      <div className="hidden md:block overflow-x-auto scrollbar-hide bg-[#111128] border border-[#1e1e3a] rounded-[32px] p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#1e1e3a]">
              <th className="px-6 py-4 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Libellé</th>
              <th className="px-6 py-4 text-right text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e3a]">
            {categories.map((category, index) => {
              const isString = typeof category === 'string';
              const name = isString ? category : (category.libelle || category.nom_categorie || category.nom || 'Sans nom');
              const id = isString ? category : (category.id_categorie || category.id || index);

              return (
                <tr key={id} className="group hover:bg-[#161630] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-[#e2e8f0]">{name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(category)}
                        className="p-2 text-[#818cf8] hover:bg-[#4f46e51f] rounded-lg transition-all"
                        title="Modifier"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="p-2 text-[#f87171] hover:bg-red-500/10 rounded-lg transition-all"
                        title="Supprimer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE CARD VIEW --- */}
      <div className="md:hidden space-y-4">
        {categories.map((category, index) => {
          const isString = typeof category === 'string';
          const name = isString ? category : (category.libelle || category.nom_categorie || category.nom || 'Sans nom');
          const id = isString ? category : (category.id_categorie || category.id || index);

          return (
            <div key={id} className="bg-[#111128] border border-[#1e1e3a] rounded-2xl p-5 relative group active:bg-[#161630] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#22d3ee] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#4f46e522]">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold text-white truncate">{name}</div>
                </div>
              </div>

              <div className="absolute top-4 right-4 flex gap-1">
                <button
                  onClick={() => onEdit(category)}
                  className="p-2.5 text-[#818cf8] bg-[#4f46e512] rounded-xl"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="p-2.5 text-[#f87171] bg-red-500/10 rounded-xl"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;

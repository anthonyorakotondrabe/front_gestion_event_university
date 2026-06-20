import { useDeleteFiliere } from '../../hooks/useCatalog';

/**
 * Composant pour afficher la liste des filières avec le même design que la gestion utilisateur.
 */
const FiliereList = ({ filieres, onEdit }) => {
  const deleteFiliere = useDeleteFiliere();

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette filière ?')) {
      deleteFiliere.mutate(id);
    }
  };

  if (!filieres || filieres.length === 0) {
    return (
      <div className="bg-[#111128] border border-[#1e1e3a] rounded-[32px] p-12 text-center">
        <div className="w-20 h-20 bg-[#4f46e512] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#4f46e5] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-white mb-2">Aucune filière</h3>
        <p className="text-[#64748b] font-medium">Commencez par ajouter votre première filière d'étude.</p>
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
              <th className="px-6 py-4 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Nom de la filière</th>
              <th className="px-6 py-4 text-right text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e3a]">
            {filieres.map((filiere) => (
              <tr key={filiere.id_filiere} className="group hover:bg-[#161630] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#e2e8f0]">{filiere.nom_filiere}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(filiere)}
                      className="p-2 text-[#818cf8] hover:bg-[#4f46e51f] rounded-lg transition-all"
                      title="Modifier"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(filiere.id_filiere)}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE CARD VIEW --- */}
      <div className="md:hidden space-y-4">
        {filieres.map((filiere) => (
          <div key={filiere.id_filiere} className="bg-[#111128] border border-[#1e1e3a] rounded-2xl p-5 relative group active:bg-[#161630] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#22d3ee] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#4f46e522]">
                {filiere.nom_filiere.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-bold text-white truncate">{filiere.nom_filiere}</div>
              </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-1">
              <button
                onClick={() => onEdit(filiere)}
                className="p-2.5 text-[#818cf8] bg-[#4f46e512] rounded-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(filiere.id_filiere)}
                className="p-2.5 text-[#f87171] bg-red-500/10 rounded-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiliereList;

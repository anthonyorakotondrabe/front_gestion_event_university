import { useUsersList, useDeleteUser } from '../hooks/useUsers';
import { useFilieres } from '../../catalog/hooks/useCatalog';
import { useConfirm } from '../../../context/ModalContext';

/**
 * Composant UserList pour l'affichage et la gestion des membres de la plateforme.
 * @param {Object} props - Propriétés du composant.
 * @param {Function} props.onEdit - Callback lors du clic sur le bouton d'édition.
 * @param {string} props.searchQuery - Terme de recherche actuel pour le filtrage.
 */
const UserList = ({ onEdit, searchQuery }) => {
  const { data: users, isLoading, isError } = useUsersList();
  const { data: filieres } = useFilieres();
  const deleteUser = useDeleteUser();
  const confirm = useConfirm();

  /**
   * Résout le nom de la filière à partir de son ID.
   * @param {number} id - ID de la filière.
   * @returns {string} Nom de la filière ou 'N/A'.
   */
  const getFiliereName = (id) => {
    return filieres?.find(f => f.id_filiere === id)?.nom_filiere || 'N/A';
  };

  /**
   * Gère la suppression d'un utilisateur avec confirmation.
   * @param {number} id - ID de l'utilisateur à supprimer.
   */
  const handleDelete = async (id) => {
    const isConfirmed = await confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.', {
      title: 'Supprimer l\'utilisateur',
      confirmLabel: 'Supprimer',
      type: 'danger'
    });

    if (isConfirmed) {
      deleteUser.mutate(id);
    }
  };

  // Filtrage des utilisateurs en fonction de la recherche (nom, email ou rôle)
  const filteredUsers = users?.filter(user => {
    const query = searchQuery?.toLowerCase() || '';
    return (
      user.nom?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query)
    );
  });

  /**
   * Récupère les classes CSS pour le badge de rôle.
   * @param {string} role - Rôle de l'utilisateur.
   * @returns {string} Classes CSS Tailwind.
   */
  const getRoleBadgeClass = (role) => {
    const r = role?.toLowerCase();
    if (r === 'admin') return 'bg-red-500/10 text-red-400 border-red-500/20';
    if (r === 'organisateur') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-10 h-10 border-4 border-[#4f46e5] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#94a3b8] font-medium text-sm">Chargement des membres...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center">
        <p className="text-red-400 font-medium">Une erreur est survenue lors du chargement des utilisateurs.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Vue Bureau : Tableau */}
      <div className="hidden md:block overflow-x-auto scrollbar-hide">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#1e1e3a]">
              <th className="px-6 py-4 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Membre</th>
              <th className="px-6 py-4 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Rôle</th>
              <th className="px-6 py-4 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Filière</th>
              <th className="px-6 py-4 text-right text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e3a]">
            {filteredUsers?.map((user) => (
              <tr key={user.id_utilisateur} className="group hover:bg-[#161630] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#22d3ee] flex items-center justify-center text-white font-bold text-xs">
                      {user.nom?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#e2e8f0] truncate">{user.nom}</div>
                      <div className="text-[11px] text-[#64748b] truncate">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs font-medium text-[#94a3b8]">
                    {getFiliereName(user.id_filiere)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 text-[#818cf8] hover:bg-[#4f46e51f] rounded-lg transition-all"
                      title="Modifier"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(user.id_utilisateur)}
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

      {/* Vue Mobile : Cartes */}
      <div className="md:hidden space-y-4 px-2 py-4">
        {filteredUsers?.map((user) => (
          <div key={user.id_utilisateur} className="bg-[#111128] border border-[#1e1e3a] rounded-2xl p-5 relative overflow-hidden group active:bg-[#161630] transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#22d3ee] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#4f46e522]">
                {user.nom?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-bold text-white truncate">{user.nom}</div>
                <div className="text-xs text-[#64748b] truncate">{user.email}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1e1e3a]">
              <div>
                <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mb-1.5">Rôle</div>
                <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg border ${getRoleBadgeClass(user.role)}`}>
                  {user.role}
                </span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mb-1.5">Filière</div>
                <div className="text-xs font-semibold text-[#e2e8f0] truncate">
                  {getFiliereName(user.id_filiere)}
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-1">
              <button
                onClick={() => onEdit(user)}
                className="p-2.5 text-[#818cf8] bg-[#4f46e512] rounded-xl active:scale-90 transition-transform"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(user.id_utilisateur)}
                className="p-2.5 text-[#f87171] bg-red-500/10 rounded-xl active:scale-90 transition-transform"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers?.length === 0 && (
        <div className="py-20 text-center text-[#64748b] font-medium italic">
          {searchQuery ? `Aucun membre trouvé pour "${searchQuery}"` : "Aucun membre trouvé."}
        </div>
      )}
    </div>
  );
};

export default UserList;

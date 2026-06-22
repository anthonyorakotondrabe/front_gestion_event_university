import React, { useState, useEffect } from 'react';
import { useUser } from '../../auth/hooks/useAuth';
import { useUpdateUser } from '../../users/hooks/useUsers';
import { useFilieres } from '../../catalog/hooks/useCatalog';
import toast from 'react-hot-toast';

const ProfileField = ({ label, icon, children }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 ml-1 text-gray-400 dark:text-gray-500">
      {icon}
      <label className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</label>
    </div>
    {children}
  </div>
);

const UserProfile = () => {
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: filieres } = useFilieres();
  const updateUser = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: ''
  });

  const role = user?.role?.toLowerCase().trim() || '';
  const isAdmin = role === 'admin';

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    updateUser.mutate({
      id: user.id_utilisateur,
      data: {
        ...formData,
        role: user.role, // Keep existing role
        id_filiere: user.id_filiere // Keep existing filiere
      }
    }, {
      onSuccess: () => {
        setIsEditing(false);
        toast.success('Profil mis à jour avec succès');
      }
    });
  };

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const userFiliere = filieres?.find(f => f.id_filiere === user.id_filiere)?.libelle || 'N/A';

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 px-4 md:px-0 py-4">
      {/* Premium Header Section */}
      <div className="relative group overflow-hidden bg-white dark:bg-[#1f2028] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-white/40 dark:border-white/5 backdrop-blur-xl">
        {/* Animated background blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full -ml-20 -mb-20 blur-3xl animate-pulse delay-700"></div>

        <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 p-[3px] shadow-2xl shadow-indigo-500/40 transform transition-transform group-hover:scale-105 duration-500">
              <div className="w-full h-full rounded-[2.3rem] bg-white dark:bg-[#1f2028] flex items-center justify-center overflow-hidden">
                <span className="text-4xl md:text-5xl font-black bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {user.nom?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            {isAdmin && (
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl shadow-lg border-4 border-white dark:border-[#1f2028]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
              </div>
            )}
          </div>

          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 rounded-full border border-indigo-100 dark:border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Espace Personnel</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              {isEditing ? 'Éditer' : 'Mon'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Profil</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm">
              Personnalisez votre expérience UniEvent et gérez vos accès.
            </p>
          </div>
        </div>
      </div>

      {/* Main Info Card */}
      <div className="grid grid-cols-1 gap-6 md:gap-10">
        <div className="bg-white dark:bg-[#1f2028] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-indigo-500/[0.02] overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleUpdate} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Field Decorator Component */}
                <ProfileField
                  label="Nom complet"
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                >
                  {isAdmin && isEditing ? (
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                    />
                  ) : (
                    <div className="px-6 py-4 bg-gray-50/50 dark:bg-white/[0.01] border border-transparent rounded-2xl text-gray-900 dark:text-white font-black text-lg">
                      {user.nom}
                    </div>
                  )}
                </ProfileField>

                <ProfileField
                  label="Email professionnel"
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                >
                  {isAdmin && isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                    />
                  ) : (
                    <div className="px-6 py-4 bg-gray-50/50 dark:bg-white/[0.01] border border-transparent rounded-2xl text-gray-900 dark:text-white font-black text-lg break-words">
                      {user.email}
                    </div>
                  )}
                </ProfileField>

                <ProfileField
                  label="Rôle plateforme"
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                >
                  <div className="flex items-center gap-3 px-6 py-4 bg-indigo-50/30 dark:bg-indigo-500/[0.03] rounded-2xl border border-indigo-100/50 dark:border-indigo-500/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
                    <span className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest text-sm">
                      {user.role}
                    </span>
                  </div>
                </ProfileField>

                <ProfileField
                  label="Filière académique"
                  icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                >
                  <div className="px-6 py-4 bg-gray-50/50 dark:bg-white/[0.01] border border-transparent rounded-2xl text-gray-500 dark:text-gray-400 font-bold italic">
                    {userFiliere}
                  </div>
                </ProfileField>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-50 dark:border-white/5">
                {isAdmin ? (
                  <div className="flex flex-col md:flex-row justify-end gap-4">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({ nom: user.nom, email: user.email });
                          }}
                          className="w-full md:w-auto px-10 py-5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-[1.5rem] font-black hover:bg-gray-200 dark:hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          disabled={updateUser.isPending}
                          className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-[1.5rem] font-black hover:shadow-2xl hover:shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
                        >
                          {updateUser.isPending ? (
                            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                          )}
                          Sauvegarder
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="w-full md:w-auto px-10 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all active:scale-95 flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Modifier mon profil
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="p-8 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-500/[0.05] rounded-[2rem] border border-amber-100/50 dark:border-amber-500/10 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 bg-white dark:bg-[#2a2b35] rounded-3xl shadow-xl flex items-center justify-center text-amber-500 shrink-0">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="text-center md:text-left space-y-1">
                      <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Accès restreint</h4>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Pour garantir l'intégrité de la plateforme, les modifications de profil sont soumises à validation.
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold block mt-1 md:inline md:ml-1">Contactez l'administration pour toute mise à jour.</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

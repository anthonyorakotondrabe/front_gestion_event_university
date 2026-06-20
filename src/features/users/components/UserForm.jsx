import React from 'react';
import { useForm } from 'react-hook-form';
import { useFilieres } from '../../catalog/hooks/useCatalog';
import { useCreateUser, useUpdateUser } from '../hooks/useUsers';

/**
 * Formulaire modal pour la création et l'édition d'utilisateurs.
 */
const UserForm = ({ user, onClose }) => {
  const isEdit = !!user;
  const { data: filieres, isLoading: loadingFilieres } = useFilieres();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  /**
   * Normalise le rôle venant de l'API pour le sélecteur du formulaire.
   */
  const normalizeRole = (role) => {
    if (!role) return 'Etudiant';
    const r = role.toLowerCase().trim();
    if (r === 'admin') return 'Admin';
    if (r === 'organisateur') return 'Organisateur';
    return 'Etudiant';
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nom: user?.nom || '',
      email: user?.email || '',
      role: normalizeRole(user?.role),
      id_filiere: user?.id_filiere || ''
    }
  });

  const onSubmit = (data) => {
    if (isEdit) {
      updateUser.mutate({ id: user.id_utilisateur, data }, {
        onSuccess: () => onClose()
      });
    } else {
      createUser.mutate(data, {
        onSuccess: () => onClose()
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all border border-gray-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">
            {isEdit ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input
              type="text"
              {...register('nom', { required: 'Le nom est requis' })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.nom ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
              placeholder="Ex: John Doe"
            />
            {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'L\'email est requis',
                pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Mot de passe (Création uniquement) */}
          {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Requis pour la création',
                  minLength: { value: 6, message: 'Minimum 6 caractères' }
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
                placeholder="Minimum 6 caractères"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
          )}

          {/* Rôle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
            <select
              {...register('role', { required: 'Le rôle est requis' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
            >
              <option value="Etudiant">Étudiant</option>
              <option value="Organisateur">Organisateur</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Filière */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filière</label>
            <select
              {...register('id_filiere', { required: 'La filière est requise' })}
              disabled={loadingFilieres}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white disabled:bg-gray-50"
            >
              <option value="">Sélectionnez une filière</option>
              {filieres?.map(f => (
                <option key={f.id_filiere} value={f.id_filiere}>
                  {f.nom_filiere}
                </option>
              ))}
            </select>
            {errors.id_filiere && <p className="text-red-500 text-xs mt-1">{errors.id_filiere.message}</p>}
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={createUser.isPending || updateUser.isPending}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm flex items-center justify-center disabled:opacity-70"
            >
              {(createUser.isPending || updateUser.isPending) ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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

export default UserForm;

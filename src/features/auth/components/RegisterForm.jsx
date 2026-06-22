import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../api/authService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const registerMutation = useMutation({
    mutationFn: (data) => {
      const { confirmPassword, ...registerData } = data;
      return authService.register(registerData);
    },
    onSuccess: () => {
      toast.success('Compte créé avec succès !');
      navigate('/login');
    },
    onError: (error) => {
      console.error('Registration Error:', error);
      const detail = error.response?.data?.detail;
      const message = typeof detail === 'string' ? detail : 'Erreur lors de l\'inscription';
      toast.error(message);
    }
  });

  const createSubmitSparks = (target) => {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const colors = ['#4f46e5', '#818cf8', '#22d3ee', '#67e8f9', '#6366f1'];

    for (let i = 0; i < 25; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark-particle';
      const size = Math.random() * 4 + 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 70 + 35;

      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.borderRadius = '50%';
      spark.style.background = colors[Math.floor(Math.random() * colors.length)];
      spark.style.boxShadow = `0 0 8px ${colors[Math.floor(Math.random() * colors.length)]}`;
      spark.style.setProperty('--sx', `${Math.cos(angle) * distance}px`);
      spark.style.setProperty('--sy', `${Math.sin(angle) * distance - 20}px`);

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 900);
    }
  };

  const onSubmit = (data, e) => {
    if (e && e.target) {
        const submitBtn = e.target.querySelector('button[type="submit"]');
        createSubmitSparks(submitBtn);
    }
    registerMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <div className={`auth-field ${errors.nom ? 'error' : ''}`}>
        <div className="field-label">
          <label>Nom complet</label>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Rakotozaka Naivo"
            {...register('nom', { required: 'Le nom est requis' })}
          />
          <div className="input-progress"></div>
          <div className="status-dot"></div>
        </div>
        {errors.nom && <p className="auth-error-msg">{errors.nom.message}</p>}
      </div>

      <div className={`auth-field ${errors.email ? 'error' : ''}`}>
        <div className="field-label">
          <label>Email</label>
        </div>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="raketaka@university.edu"
            {...register('email', {
              required: 'L\'email est requis',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email invalide"
              }
            })}
          />
          <div className="input-progress"></div>
          <div className="status-dot"></div>
        </div>
        {errors.email && <p className="auth-error-msg">{errors.email.message}</p>}
      </div>

      <div className={`auth-field ${errors.password ? 'error' : ''}`}>
        <div className="field-label">
          <label>Mot de passe</label>
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Minimum 6 caractères"
            {...register('password', {
              required: 'Le mot de passe est requis',
              minLength: { value: 6, message: 'Minimum 6 caractères' }
            })}
          />
          <div className="input-progress"></div>
          <div className="status-dot"></div>
        </div>
        {errors.password && <p className="auth-error-msg">{errors.password.message}</p>}
      </div>

      <div className={`auth-field ${errors.confirmPassword ? 'error' : ''}`}>
        <div className="field-label">
          <label>Confirmer le mot de passe</label>
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Répétez votre mot de passe"
            {...register('confirmPassword', {
              required: 'La confirmation est requise',
              validate: (value) => value === password || "Les mots de passe ne correspondent pas"
            })}
          />
          <div className="input-progress"></div>
          <div className="status-dot"></div>
        </div>
        {errors.confirmPassword && <p className="auth-error-msg">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="auth-submit-btn"
      >
        {registerMutation.isPending ? (
          <div className="loader-dots">
            <span></span><span></span><span></span>
          </div>
        ) : (
          'Créer un compte'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;

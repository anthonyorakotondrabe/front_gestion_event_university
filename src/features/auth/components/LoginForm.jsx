import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const createSubmitSparks = (target) => {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const colors = ['#4f46e5', '#818cf8', '#22d3ee', '#67e8f9', '#6366f1'];

    for (let i = 0; i < 20; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark-particle';
      const size = Math.random() * 4 + 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 60 + 30;

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
    // e is the event passed by handleSubmit
    if (e && e.target) {
        // Find the submit button within the form to get its position
        const submitBtn = e.target.querySelector('button[type="submit"]');
        createSubmitSparks(submitBtn);
    }

    loginMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Accès autorisé — Redirection...');
        navigate('/');
      },
      onError: (error) => {
        console.error('Login Error:', error);
        const detail = error.response?.data?.detail;
        const message = typeof detail === 'string' ? detail : 'Erreur lors de la connexion';
        toast.error(message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <div className={`auth-field ${errors.email ? 'error' : ''}`}>
        <div className="field-label">
          <label>Email</label>
        </div>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="student@university.edu"
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
            placeholder="Entrez votre mot de passe"
            {...register('password', { required: 'Le mot de passe est requis' })}
          />
          <div className="input-progress"></div>
          <div className="status-dot"></div>
        </div>
        {errors.password && <p className="auth-error-msg">{errors.password.message}</p>}
      </div>

      <div className="auth-options">
        <label className="checkbox-wrap">
          <input type="checkbox" /> Se souvenir de moi
        </label>
        <button type="button" className="forgot-link bg-transparent border-none p-0 cursor-pointer">
          Mot de passe oublié ?
        </button>
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="auth-submit-btn"
      >
        {loginMutation.isPending ? (
          <div className="loader-dots">
            <span></span><span></span><span></span>
          </div>
        ) : (
          'Se connecter'
        )}
      </button>
    </form>
  );
};

export default LoginForm;

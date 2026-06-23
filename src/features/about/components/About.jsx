import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 h-10 bg-indigo-500 rounded-full"></div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
          À propos de <span className="text-indigo-600">UniEvent</span>
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-[#1f2028] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden p-8 md:p-12">
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              La Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              <span className="font-bold text-gray-900 dark:text-white">UniEvent</span> est une plateforme web innovante dédiée à la centralisation, l'organisation et la gestion des événements au sein de l'écosystème universitaire. Conçue pour répondre aux besoins spécifiques des administrateurs, des organisateurs et des étudiants, l'application fluidifie la communication et dynamise la vie de campus à travers une interface intuitive et des fonctionnalités en temps réel.
            </p>
          </div>

          <div className="pt-6">
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Une Architecture Performante et Sécurisée
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-medium">
              Pour garantir une réactivité maximale et une sécurité sans compromis, <span className="font-bold text-gray-900 dark:text-white">UniEvent</span> repose sur un choix technologique de pointe :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Frontend</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Propulsée par <span className="font-bold">React.js</span>, offrant une expérience utilisateur fluide et réactive.</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Backend</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Développé en <span className="font-bold">Rust</span> pour une vitesse d'exécution exceptionnelle et une sécurité mémoire maximale.</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Base de données</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Utilisation de <span className="font-bold">PostgreSQL</span>, garantissant la fiabilité et l'intégrité des données.</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Conception</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Modélisation rigoureuse via les méthodologies <span className="font-bold">MERISE</span> et <span className="font-bold">UML</span>.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['VSCode', 'Git', 'PostgreSQL', 'Rust', 'React', 'Tailwind'].map(tech => (
                <span key={tech} className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 uppercase tracking-widest">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <hr className="my-10 border-gray-100 dark:border-white/5" />

        <section className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shrink-0 shadow-lg shadow-indigo-500/20">
              RT
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                  Le Développeur
                </h2>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold">RAKOTONDRABE Tokiniaina Anthonyo Sarobidy et RAMBINIMBOLOLOKO Harvonjy</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Développeur Full-Stack & Concepteur Logiciel</p>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Passionné par l'ingénierie logicielle et la création de solutions applicatives robustes, j'ai conçu et développé <span className="font-bold text-gray-900 dark:text-white">UniEvent</span> dans sa globalité.
              </p>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Mon approche du développement repose sur deux piliers : la rigueur conceptuelle et l'exigence de performance. En combinant la puissance de modélisation de <span className="font-bold">MERISE</span> et de <span className="font-bold">UML</span> avec des technologies exigeantes et modernes comme <span className="font-bold">Rust</span> et <span className="font-bold">React.js</span>, j'ai pas hésité à repousser les standards de fluidité et de sécurité pour une application de gestion de données.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:anthonyorakotondrabe@gmail.com"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#0a0a1a] text-white hover:bg-indigo-600 transition-all group"
                >
                  <svg className="w-5 h-5 opacity-70 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-black uppercase tracking-widest">Me contacter</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

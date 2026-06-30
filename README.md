# Plateforme Digitale de Gestion d'Événements

Une application web moderne, performante et évolutive conçue pour la gestion complète d'événements (Universitaires, Professionnels, Sociaux). Ce projet met en œuvre une architecture logicielle robuste et les meilleures pratiques du développement React contemporain.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

## 🏗️ Architecture et Choix Techniques

Le projet est structuré selon une **Architecture Orientée Fonctionnalités (Feature-based Architecture)**, garantissant une séparation claire des responsabilités et une scalabilité optimale.

### Points Forts de l'Implémentation :

*   **Gestion d'État Asynchrone (React Query) :** Utilisation de `@tanstack/react-query` pour une gestion efficace du cache, de la synchronisation des données et des états de chargement/erreur, réduisant drastiquement la complexité du code.
*   **Architecture Modulaire :** Chaque module (`auth`, `events`, `users`, `inscriptions`) est autonome, regroupant ses propres hooks, composants, API et services.
*   **Performance Optimisée :** Configuration avec **Vite** et intégration du nouveau **React Compiler** pour des performances de rendu optimales et un Hot Module Replacement (HMR) ultra-rapide.
*   **Formulaires Robustes :** Utilisation de **React Hook Form** avec validation pour une expérience utilisateur fluide et une gestion de données sécurisée.
*   **Design Système Moderne :** Interface responsive construite avec **Tailwind CSS**, utilisant des variables CSS personnalisées et un mode sombre natif.

## 🚀 Fonctionnalités Principales

*   **Tableaux de Bord Multi-Rôles :** Vues spécialisées pour les Administrateurs (supervision), Organisateurs (gestion analytique) et Étudiants (exploration).
*   **Gestion Complète du Cycle de Vie :** Création, modération, publication et suivi des inscriptions aux événements.
*   **Système d'Authentification Sécurisé :** Gestion des sessions via JWT et intercepteurs Axios pour la sécurité des requêtes.
*   **Exploration Dynamique :** Catalogue d'événements avec filtrage en temps réel et recherche plein texte.
*   **Analytique Organisateur :** Vue synthétique des revenus potentiels et du taux de remplissage des événements.

## 🛠️ Stack Technique

*   **Frontend :** React 19, Vite, Tailwind CSS
*   **Data Fetching :** TanStack Query (React Query) v5, Axios
*   **Routing :** React Router v7
*   **Gestion de Formulaires :** React Hook Form
*   **UI/UX :** Lucide React, React Hot Toast, Chart.js, Lottie

## 📦 Installation et Lancement

1.  **Cloner le projet :**
    ```bash
    git clone https://github.com/votre-username/gestion_evenement.git
    cd gestion_evenement
    ```

2.  **Installer les dépendances :**
    ```bash
    npm install
    ```

3.  **Configurer l'environnement :**
    Créer un fichier `.env` à la racine et ajouter l'URL de l'API :
    ```env
    VITE_API_URL=https://votre-api-url.com
    ```

4.  **Lancer en mode développement :**
    ```bash
    npm run dev
    ```

---

*Développé avec un souci constant de qualité logicielle, de performance et d'expérience utilisateur.*

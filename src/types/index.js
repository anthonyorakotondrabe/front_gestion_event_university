/**
 * @typedef {('Etudiant'|'Organisateur'|'Admin')} RoleUtilisateur
 */

/**
 * @typedef {('Brouillon'|'Publié'|'Annulé'|'Passé')} StatutEvenement
 */

/**
 * @typedef {('En attente'|'Confirmé'|'Annulé')} StatutInscription
 */

/**
 * @typedef {Object} Filiere
 * @property {string} id_filiere - UUID
 * @property {string} nom_filiere
 */

/**
 * @typedef {Object} Categorie
 * @property {string} id_categorie - UUID
 * @property {string} libelle
 */

/**
 * @typedef {Object} Lieu
 * @property {string} id_lieu - UUID
 * @property {string} nom_lieu
 * @property {string} [adresse]
 * @property {string} [ville]
 * @property {string} [code_postal]
 */

/**
 * @typedef {Object} Utilisateur
 * @property {string} id_utilisateur - UUID
 * @property {string} nom
 * @property {string} email
 * @property {RoleUtilisateur} role
 * @property {string} [id_filiere] - UUID
 */

/**
 * @typedef {Object} Evenement
 * @property {string} id_evenement - UUID
 * @property {string} titre
 * @property {string} [description]
 * @property {string} date_evenement - ISO Date string
 * @property {string} date_creation - ISO Date string
 * @property {number} prix
 * @property {number} capacite_max
 * @property {StatutEvenement} statut_evenement
 * @property {string} createur_id - UUID
 * @property {string} id_categorie - UUID
 * @property {string} id_lieu - UUID
 */

/**
 * @typedef {Object} Inscription
 * @property {string} id_inscription - UUID
 * @property {string} date_inscription - ISO Date string
 * @property {StatutInscription} statut_inscription
 * @property {string} id_utilisateur - UUID
 * @property {string} id_evenement - UUID
 */

export const EMPTY_OBJECT = Object.freeze({});

/**
 * Formate une chaîne de date en un format lisible local.
 * @param {string} dateString - La chaîne de date ISO à formater.
 * @returns {string} Date formatée (ex: "12 oct. 2023").
 */
export const formatToLocalTime = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Formate une chaîne de date en un temps relatif lisible (ex: "il y a 2 jours").
 * @param {string} dateString - La chaîne de date ISO à formater.
 * @returns {string} Chaîne de temps relatif.
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 0) return formatToLocalTime(date); // Repli pour les dates futures
  if (diffInSeconds < 60) return "à l'instant";
  if (diffInSeconds < 3600) return `il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `il y a ${Math.floor(diffInSeconds / 3600)} h`;
  if (diffInSeconds < 2592000) return `il y a ${Math.floor(diffInSeconds / 86400)} j`;

  return formatToLocalTime(dateString);
};

/**
 * Valide si une date est dans le futur.
 * @param {string} dateString - La chaîne de date à valider.
 * @returns {boolean} True si la date est dans le futur.
 */
export const isFutureDate = (dateString) => {
  if (!dateString) return false;
  return new Date(dateString) > new Date();
};
